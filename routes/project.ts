import express, { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import multer from "multer";
import path from "path";
import ProjectController from "../controllers/Profile/Project.controller";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const projectPhotoUpload = multer({
  dest: "public/images/tmp/projects/",
  fileFilter: (req, file, callback): void => {
    const ext = path.extname(file.originalname);
    const allowExt = [".png", ".jpg", ".gif", ".jpeg"];
    if (!allowExt.includes(ext)) {
      callback(new Error("이미지만 업로드 가능합니다."));
    }
    callback(null, true);
  },
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id === undefined) {
      throw new Error("비정상적인 접근입니다.");
    }
    const Project = new ProjectController();
    const result = await Project.getProject(req.params.id);
    res.send(result);
  } catch (e) {
    next(e);
  }
});
router.get(
  "/user/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.userId === undefined) {
        throw new Error("비정상적인 접근입니다.");
      }
      const Project = new ProjectController();
      const result = await Project.getProjectList(req.params.userId);

      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Project = new ProjectController();

      const result = await Project.createProject(req.body);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/edit/:id",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Project = new ProjectController();

      const result = await Project.editProject(req.body.projectInfo);
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
      if (!req.body.projectsId) {
        throw new Error("비정상적인 접근입니다.");
      }

      const Project = new ProjectController();
      const result = await Project.deleteProject(req.body.projectsId);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/skill/delete",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.id) {
        throw new Error("비정상적인 접근입니다.");
      }

      const Project = new ProjectController();
      const result = await Project.deleteProjectsSkills(req.body.id);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/upload/tmp",
  projectPhotoUpload.fields([
    { name: "projectThumb", maxCount: 1 },
    { name: "projectPhoto1", maxCount: 1 },
    { name: "projectPhoto2", maxCount: 1 },
    { name: "projectPhoto3", maxCount: 1 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const [file] = req.files[name];
      if (!file.filename) {
        throw new Error("업로드에 실패하였습니다.");
      } else {
        res.send({
          fileName: file.filename,
        });
      }
    } catch (e) {
      next(e);
    }
  }
);
export default router;
