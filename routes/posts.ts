import express, { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import PostController from "../controllers/Posts.controller";
import PostMiddleware from "../middleware/Posts.middleware";
import { IPostListResult } from "../dto/post/PostDto";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get(
  "/tag/:tagName/:page",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err.message);
    }
  }
);

router.get(
  "/category/:category/:page",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.category === undefined) {
        throw new Error("비정상적인 접근입니다.");
      }
      const { category } = req.params;
      const page: number | string = req.params.page ?? 1;

      const Post = new PostController();
      const postList = await Post.getPostListByCategory(category, page);

      res.send({
        postList,
      });
    } catch (err) {
      next(err.message);
    }
  }
);

router.get(
  "/author/:author/:page",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.author) {
        throw new Error("비정상적인 접근입니다.");
      }
      const { author, page } = req.params;

      const Post = new PostController();
      const postList = await Post.getUserPostList(author, page);
      res.send({
        postList,
      });
    } catch (e) {
      next(e);
    }
  }
);
router.post(
  "/write",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PostMiddleware.validateWriteBody(req.body);

      const Post = new PostController();
      const result = await Post.store(req.body);
      res.send(result);
    } catch (err) {
      next(err.message);
    }
  }
);
router.patch(
  "/edit",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Post = new PostController();
      const editData = req.body;
      const result = await Post.editPost(editData);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/delete",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      if (id === undefined) {
        throw new Error("비정상적인 접근입니다.");
      }

      const Post = new PostController();
      const result = await Post.deletePost(id);
      res.send({
        result,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id === undefined) {
      throw new Error("비정상적인 접근입니다.");
    }
    const { id } = req.params;
    const Post = new PostController();
    const post = await Post.getPost(id);

    res.send({
      post,
    });
  } catch (err) {
    next(err.message);
  }
});
export default router;
