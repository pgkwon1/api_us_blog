import express, { Request, Response } from "express";
import UserController from "../controllers/Users.controller";
import UserMiddleWare from "../middleware/Users.middleware";
import csrf from "csurf";

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

router.post(
  "/register",
  csrfProtection,
  async (req: Request, res: Response) => {
    try {
      // 입력값 검사
      await UserMiddleWare.validateRegisterBody(req.body);
      const User = new UserController();

      await User.register(req.body);
      res.json("success");
    } catch (err) {
      if (err instanceof ReferenceError) {
        err.message = "회원가입에 실패하였습니다 관리자에게 문의해주세요";
      }
      res.json({
        message: err.message,
        error: true,
      });
    }
  }
);
router.post("/login", csrfProtection, async (req: Request, res: Response) => {
  try {
    await UserMiddleWare.validateLoginBody(req.body);

    const User = new UserController();
    const token = await User.login(req.body);

    res.json({ token });
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
    });
  }
});
export default router;
