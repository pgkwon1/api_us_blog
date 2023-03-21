import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import indexRouter from "./routes/index";
import memberRouter from "./routes/member";
import postsRouter from "./routes/posts";
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
app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/post", postsRouter);

app.use(function (error, req, res, next) {
  console.log("error!!");
});
app.listen(3001, async () => {});
