import express, { Request, Response } from "express";
import PostController from "../controllers/Posts.controller";
const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id === false) {
      throw new Error("비정상적인 접근입니다.");
    }
    const { id } = req.params;
    const Post = new PostController();
    const post = await Post.getPost(id);

    res.send({
      post,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

export default router;
