import Skills from "../../models/Profile/Skills.model";

export default interface ISkillsControllerDomain {
  getAllSkillsList(): Promise<Skills[]>;
  deleteSkill(id: string): Promise<boolean>;
  addSkill(id: string, name: string, profileId: string): Promise<string>;
}
