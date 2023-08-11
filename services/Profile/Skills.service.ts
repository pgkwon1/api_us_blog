/* eslint-disable class-methods-use-this */
import ISkillsServiceDomain from "../../domain/services/Profile/Skills";
import { ProfileSkills } from "../../models/Profile/Profile.model";
import Skills from "../../models/Profile/Skills.model";

class SkillsService implements ISkillsServiceDomain {
  async getAllSkillsList(): Promise<Skills[]> {
    const result = await Skills.findAll({
      order: [
        ["order", "ASC"],
        ["category", "ASC"],
        ["name", "ASC"],
      ],
    });
    return result;
  }

  async getSkill(name: string): Promise<Skills> {
    const result = await Skills.findOne({
      where: {
        name,
      },
    });

    if (result === null) {
      throw new Error("기술 정보가 없습니다.");
    }
    return result;
  }

  async getProfileSkills(id: string): Promise<boolean> {
    const result = await ProfileSkills.findOne({
      where: {
        id,
      },
    });

    if (result === null) {
      throw new Error("기술 정보가 존재하지 않습니다.");
    }
    return true;
  }

  async deleteSkill(id: string): Promise<boolean> {
    await this.getProfileSkills(id);

    const result = await ProfileSkills.destroy({
      where: {
        id,
      },
    });

    if (result === null) {
      throw new Error("삭제에 실패하였습니다.");
    }
    return true;
  }

  // 기술스택 추가.
  async addSkill(id: string, name: string, profileId: string): Promise<string> {
    // 기술정보가 있는지 체크
    await this.getSkill(name);

    const result = await ProfileSkills.create({
      profileId,
      skillsId: id,
    });
    if (!result) {
      throw new Error("기술 추가에 실패하였습니다.");
    }
    return result.id;
  }
}
export default SkillsService;
