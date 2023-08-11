import IProjectDto from "../../../dto/models/Profile/ProjectDto";
import Project from "../../../models/Profile/Project.model";

export default interface IProjectServiceDomain {
  createProject(proejctInfo: IProjectDto): Promise<Project>;
  createProjectsSkills(projectsId: string, projectsSkills): Promise<boolean>;
  deleteProjectsSkills(id: string): Promise<boolean>;
  getProject(id: string): Promise<Project>;
  getProjectList(userId: string): Promise<Project[]>;
  editProject(projectInfo: IProjectDto): Promise<boolean>;
}
