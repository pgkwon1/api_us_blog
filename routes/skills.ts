import express, { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import SkillsController from "../controllers/Profile/Skills.controller";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Skill = new SkillsController();
    const allSkillsList = await Skill.getAllSkillsList();
    res.send(allSkillsList);
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, profileId } = req.body;
    const Skills = new SkillsController();
    const result = await Skills.addSkill(id, name, profileId);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/delete",
  csrfProtection,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id === undefined) {
        throw new Error("비정상적인 접근입니다.");
      }
      const { id } = req.body;
      const Skills = new SkillsController();
      const result = await Skills.deleteSkill(id);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
