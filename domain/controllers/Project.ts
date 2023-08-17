import IProjectDto from "../../dto/models/Profile/ProjectDto";
import Project from "../../models/Profile/Project.model";

export interface IProjectControllerDomain {
  createProject(projectInfo): Promise<string>;
  getProject(id: string): Promise<Project>;
  getProjectList(userId: string): Promise<Project[]>;
  editProject(projectInfo: IProjectDto): Promise<boolean>;
  deleteProject(projectsId: string): Promise<boolean>;
  deleteProjectsSkills(id: string): Promise<boolean>;
}
