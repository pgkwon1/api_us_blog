import express, { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import multer from "multer";
import path from "path";
import ProfileController from "../controllers/Profile/Profile.controller";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });
const profileUpload = multer({
  dest: "public/images/profile/",
  fileFilter: (req, file, callback): void => {
    const ext = path.extname(file.originalname);
    const allowExt = [".png", ".jpg", ".gif", ".jpeg"];
    if (!allowExt.includes(ext)) {
      callback(new Error("이미지만 업로드 가능합니다."));
    }
    callback(null, true);
  },
});
router.patch(
  "/edit",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.profileId === undefined) {
        throw new Error("비정상적인 접근입니다.");
      }
      const Profile = new ProfileController();
      const result = await Profile.editProfile(req.body);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/upload",
  csrfProtection,
  profileUpload.single("profilePicture"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new Error("업로드에 실패하였습니다.");
      }
      const { profileId } = req.body;
      const { filename } = req.file;
      const Profile = new ProfileController();
      const result = await Profile.uploadProfilePicture(profileId, filename);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);
export default router;
