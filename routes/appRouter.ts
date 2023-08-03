import express from "express";

import indexRouter from "./index";
import memberRouter from "./member";
import postsRouter from "./posts";
import likesRouter from "./likes";
import commentsRouter from "./comments";
import skillsRouter from "./skills";
import profileRouter from "./profile";
import projectRouter from "./project";

const router = express.Router();

router.use("/", indexRouter);
router.use("/member", memberRouter);
router.use("/post", postsRouter);
router.use("/like", likesRouter);
router.use("/comment", commentsRouter);
router.use("/skills", skillsRouter);
router.use("/profile", profileRouter);
router.use("/project", projectRouter);

export default router;
