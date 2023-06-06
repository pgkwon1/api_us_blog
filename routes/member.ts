import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import csrf from "csurf";
import { isJWT } from "class-validator";
import UserController from "../controllers/Users.controller";
import UserMiddleWare from "../middleware/Users.middleware";
import ProfileController from "../controllers/Profile.controller";

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

router.get(
  "/:userId",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.userId === undefined) {
        throw new Error("비정상적인 접근입니다.");
      }

      const token =
        req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", "");
      if (isJWT(token)) {
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET_KEY,
          (err: { message: string }) => {
            if (err) {
              throw new Error(err.message);
            }
          }
        );
      } else {
        throw new Error("비정상적인 접근입니다.");
      }
      const { userId } = req.params;
      const Profile = new ProfileController();
      const profile = await Profile.getProfile(userId);
      res.send({
        profile,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/register",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 입력값 검사
      await UserMiddleWare.validateRegisterBody(req.body);
      const User = new UserController();

      await User.register(req.body);
      res.json("success");
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.log(err);
        err.message = "회원가입에 실패하였습니다 관리자에게 문의해주세요";
      }
      next(err.message);
    }
  }
);
router.post(
  "/login",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserMiddleWare.validateLoginBody(req.body);

      const User = new UserController();
      const token = await User.login(req.body);

      res.json({ token });
    } catch (err) {
      next(err.message);
    }
  }
);
export default router;
