import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { logger } from "./config/winston";

import csrf from "csurf";
import cookieParser from "cookie-parser";
import { accessTokenVerify } from "./util/jwt.util";
import router from "./routes/appRouter";
const app = express();

app.use(
  cors({
    origin: "https://front-us-blog.vercel.app/*",
    crendentials: true,
  })
);
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
app.use(express.static("public"));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") {
    accessTokenVerify(req);
  }

  next();
});

app.use("/getCsrf", (req: Request, res: Response) => {
  res.send({
    CSRF_TOKEN: req.csrfToken(),
  });
});
app.use("/", router);
app.use(async (err, req, res, next) => {
  if (err.message === 403) res.send("비정상적인 접근입니다.");
  if (err instanceof ReferenceError === true) {
    err = "오류가 발생하였습니다.";
    logger.error(`error : ${err.stack}`);
  }
  logger.error(`error : ${err.message}`);
  res.json({
    error: true,
    message: err.message,
  });
});
app.listen(3001, async () => {});
