import express, { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import csrf from "csurf";
import PostController from "../controllers/Posts.controller";
import PostMiddleware from "../middleware/Posts.middleware";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get("/:id", async (req: Request, res: Response) => {
  try {
    if (req.params.id === false) {
      throw new Error("비정상적인 접근입니다.");
    }
    const { id } = req.params;
    const Post = new PostController(id);
    const post = await Post.getPost();

    res.send({
      post,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

router.get("/tag/:tagName/:page", async (req: Request, res: Response) => {
  try {
    if (req.params.tagName === undefined) {
      throw new Error("비정상적인 접근입니다.");
    }
    const { tagName } = req.params;
    const page: number | string = req.params.page ?? 1;

    const Post = new PostController();
    const postList = await Post.getPostListByTag(tagName, page);

    res.send({
      postList,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

router.post(
  "/write",
  csrfProtection,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PostMiddleware.validateWriteBody(req.body);

      const Post = new PostController();
      const result = await Post.store(req.body);
      res.send(result);
    } catch (err) {
      console.log("!!!!!!!", err.stack);
      next(err.message);
    }
  })
);
export default router;
