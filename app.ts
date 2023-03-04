import express from "express";
import { sequelize } from "./models";
import indexRouter from "./routes/index";
import Users from "./models/Users.model";
import Likes from "./models/Likes.model";
import Posts from "./models/Posts.model";
import Tags from "./models/Tags.model";

const app = express();
app.listen(3001, async () => {});
app.use("/", indexRouter);
