import express, { Request, Response } from "express";
import PostController from "../controllers/Post.controller";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const postList = await PostController.getPostsList();
    res.status(200).send(postList);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/posts/:user", async (req: Request, res: Response) => {
  try {
    if (!req.params.user) {
      throw new Error("비정상적인 접근입니다.");
    }
    const Post = new PostController({
      author: req.params.user,
    });
    const userPostList = await Post.getUserPostList();
    res.status(200).send({
      userPostList,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
/* GET home page. */

export default router;
