import ISkillsControllerDomain from "../../domain/controllers/Skills";
import Skills from "../../models/Profile/Skills.model";
import SkillsService from "../../services/Profile/Skills.service";

class SkillsController implements ISkillsControllerDomain {
  private skillsService: SkillsService;

  constructor() {
    this.skillsService = new SkillsService();
  }

  async getAllSkillsList(): Promise<Skills[]> {
    const result = await this.skillsService.getAllSkillsList();
    return result;
  }

  async deleteSkill(id: string): Promise<boolean> {
    const result = await this.skillsService.deleteSkill(id);
    return result;
  }

  async addSkill(id: string, name: string, profileId: string): Promise<string> {
    const result = await this.skillsService.addSkill(id, name, profileId);
    return result;
  }
}

export default SkillsController;
