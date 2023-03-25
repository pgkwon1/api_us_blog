import express, { Request, Response } from "express";
import UserController from "../controllers/Users.controller";
import UserMiddleWare from "../middleware/Users.middleware";
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    // 입력값 검사
    await UserMiddleWare.validateRegisterBody(req.body);
    const User = new UserController();

    await User.register(req.body);
  } catch (err) {
    if (err instanceof ReferenceError) {
      err.message = "회원가입에 실패하였습니다 관리자에게 문의해주세요";
    }
    res.send(
      JSON.stringify({
        message: err.message,
      })
    );
  }
});

export default router;
