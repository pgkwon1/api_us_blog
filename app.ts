import "express-async-errors";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import indexRouter from "./routes/index";
import memberRouter from "./routes/member";
import postsRouter from "./routes/posts";
import csrf from "csurf";
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

app.use("/getCsrf", (req: Request, res: Response) => {
  res.send({
    CSRF_TOKEN: req.csrfToken(),
  });
});
app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/post", postsRouter);

app.listen(3001, async () => {});
