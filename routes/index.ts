import express, { Request, Response } from "express";
import csrf from "csurf";
import PostController from "../controllers/Posts.controller";
import TokensController from "../controllers/Tokens.controller";
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

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
router.post("/retoken", csrfProtection, async (req: Request, res: Response) => {
  try {
    const Tokens = new TokensController();
    const newAccessToken = await Tokens.reissueToken(req.body.accessToken);
    res.json({
      newAccessToken,
    });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});
/* GET home page. */

export default router;
