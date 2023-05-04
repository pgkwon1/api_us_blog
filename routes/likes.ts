import express, { NextFunction, Request, Response } from "express";
import LikesController from "../controllers/Likes.controller";
const router = express.Router();

router.post(
  "/like",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId, userId } = req.body;
      if (typeof postId === "undefined" || typeof userId === "undefined") {
        throw new Error("비정상적인 접근입니다.");
      }

      const Like = new LikesController();
      await Like.like(postId, userId);
      res.send(200);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/unlike",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId, userId } = req.body;
      if (typeof postId === "undefined" || typeof userId === "undefined") {
        throw new Error("비정상적인 접근입니다.");
      }

      const Like = new LikesController();
      await Like.unlike(postId, userId);
      res.send(200);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/likeCancel",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId, userId, type } = req.body;
      if (
        typeof postId === "undefined" ||
        typeof userId === "undefined" ||
        typeof type === "undefined"
      ) {
        throw new Error("비정상적인 접근입니다.");
      }

      const Like = new LikesController();
      await Like.likeOrUnlikeCancel(postId, userId, type);
      res.send(200);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
