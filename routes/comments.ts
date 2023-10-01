import express, { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import CommentsController from "../controllers/Comments.controller";

const router = express.Router();

interface IWriteBody {
  postId: string;
  userId: string;
  contents?: string;
}
const csrfProtection = csrf({ cookie: true });

router.get(
  `/:postId`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.postId === undefined) {
        throw new Error("올바르지 않은 접근입니다.");
      }
      const { postId }: { postId: string } = req.params;
      const Comments = new CommentsController();
      const commentList = await Comments.getCommentsList(postId);
      res.send({
        commentList,
        count: commentList.length,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/write",
  async (
    req: Request<unknown, unknown, IWriteBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.body.postId === undefined && req.body.contents === undefined) {
        throw new Error("잘못된 접근입니다.");
      }
      const { postId, userId, contents } = req.body;
      const Comments = new CommentsController();
      const result = await Comments.writeComments(postId, userId, contents);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isWrongAccess = req.body.postId === null || req.body.commentsId;
      if (isWrongAccess) {
        throw new Error("비정상적인 접근입니다.");
      }
      const {
        id: commentId,
        postId,
        editContents: contents,
        userId,
      } = req.body;
      const Comment = new CommentsController();
      const result = await Comment.updateComments({
        commentId,
        postId,
        contents,
        userId,
      });
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/delete",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: commentId, postId, userId } = req.body;
      const isWrongAccess = !commentId || !postId;
      if (isWrongAccess) {
        throw new Error("비정상적인 접근입니다.");
      }

      const Comment = new CommentsController();
      const result = await Comment.deleteComments(commentId, postId, userId);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);
export default router;
