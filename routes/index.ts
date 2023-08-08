import express, { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import PostController from "../controllers/Posts.controller";
import TokensController from "../controllers/Tokens.controller";
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get(
  "/page/:page",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page: number = req.params.page ?? 1;
      const Post = new PostController();
      const { count, rows } = await Post.getPostsList(page);
      res.status(200).send({
        count,
        postList: rows,
      });
    } catch (err) {
      next(err.message);
    }
  }
);

router.get(
  "/posts/:user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.user) {
        throw new Error("비정상적인 접근입니다.");
      }
      const Post = new PostController();
      const userPostList = await Post.getUserPostList(req.body.user);
      res.status(200).send({
        userPostList,
      });
    } catch (err) {
      next(err.message);
    }
  }
);
router.post(
  "/retoken",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Tokens = new TokensController();
      const newAccessToken = await Tokens.reissueToken(req.body.accessToken);
      res.json({
        newAccessToken,
      });
    } catch (err) {
      next(err);
    }
  }
);
/* GET home page. */

export default router;
