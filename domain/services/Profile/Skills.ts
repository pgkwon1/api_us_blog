import Skills from "../../../models/Profile/Skills.model";

export default interface ISkillsServiceDomain {
  getAllSkillsList(): Promise<Skills[]>;
  getSkill(name: string): Promise<Skills>;
  getProfileSkills(id: string): Promise<boolean>;
  deleteSkill(id: string): Promise<boolean>;
  addSkill(id: string, name: string, profileId: string): Promise<string>;
}
