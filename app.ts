import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { logger } from "./config/winston";
import indexRouter from "./routes/index";
import memberRouter from "./routes/member";
import postsRouter from "./routes/posts";
import csrf from "csurf";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("combined"));
}
app.use(cookieParser());
app.use(bodyParser.json());
app.use(csrf({ cookie: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method !== "GET") {
      const token =
        req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", "");
      if (token && token !== "undefined") {
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET_KEY,
          function (err, decoded) {
            if (err) {
              throw new Error(err.message);
            }
          }
        );
      }
    }

    next();
  } catch (err) {
    if (err?.message === "jwt expired") {
      res.send({
        error: true,
        expired: true,
        message: "Token expired",
      });
    } else if (err?.message === "refresh token expired") {
      res.send({
        error: true,
        refreshToken: true,
        message: "refresh token expired",
      });
    } else {
      res.send({
        error: true,
        message: err?.message,
      });
    }
  }
});

app.use("/getCsrf", (req: Request, res: Response) => {
  res.send({
    CSRF_TOKEN: req.csrfToken(),
  });
});
app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/post", postsRouter);
app.use(async (err, req, res, next) => {
  if (err.message === 403) res.send("비정상적인 접근입니다.");
  if (err instanceof ReferenceError === true) {
    err = "오류가 발생하였습니다.";
    logger.error(`error : ${err.stack}`);
  }
  logger.error(`error : ${err.message}`);
  res.json({
    err,
  });
});
app.listen(3001, async () => {});
