/* eslint-disable no-param-reassign */
import fs from "fs";
import Project from "../../models/Profile/Project.model";
import ProjectService from "../../services/Profile/Project.service";
import IProjectDto from "../../dto/models/Profile/ProjectDto";
import { IProjectControllerDomain } from "../../domain/controllers/Project";

class ProjectController implements IProjectControllerDomain {
  public projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async createProject(projectInfo): Promise<string> {
    const isPhoto: boolean = ProjectController.getIsPhoto(projectInfo);
    if (isPhoto) {
      [
        projectInfo.projectThumb,
        projectInfo.projectPhoto1,
        projectInfo.projectPhoto2,
        projectInfo.projectPhoto3,
      ] = ProjectController.moveProjectPhoto({
        projectThumb: projectInfo.projectThumb,
        projectPhoto1: projectInfo.projectPhoto1,
        projectPhoto2: projectInfo.projectPhoto2,
        projectPhoto3: projectInfo.projectPhoto3,
      });
    }
    const { id } = await this.projectService.createProject(projectInfo);

    await this.projectService.createProjectsSkills(id, projectInfo.Skills);
    return id;
  }

  async getProject(id: string): Promise<Project> {
    const projectInfo = await this.projectService.getProject(id);
    return projectInfo;
  }

  async getProjectList(userId: string): Promise<Project[]> {
    const projectInfo = await this.projectService.getProjectList(userId);
    return projectInfo;
  }

  async editProject(projectInfo: IProjectDto): Promise<boolean> {
    const isPhoto = ProjectController.getIsPhoto(projectInfo);
    if (isPhoto) {
      [
        projectInfo.projectThumb,
        projectInfo.projectPhoto1,
        projectInfo.projectPhoto2,
        projectInfo.projectPhoto3,
      ] = ProjectController.moveProjectPhoto(projectInfo);
    }
    const result = await this.projectService.editProject(projectInfo);
    return result;
  }

  async deleteProject(projectsId: string): Promise<boolean> {
    const result = await this.projectService.deleteProject(projectsId);
    return result;
  }

  async deleteProjectsSkills(id: string): Promise<boolean> {
    const result = await this.projectService.deleteProjectsSkills(id);
    return result;
  }

  static getIsPhoto(projectInfo: IProjectDto) {
    const isPhoto =
      projectInfo.projectThumb !== "" ||
      projectInfo.projectPhoto1 !== "" ||
      projectInfo.projectPhoto2 !== "" ||
      projectInfo.projectPhoto3 !== "";
    return isPhoto;
  }

  static moveProjectPhoto({
    projectThumb,
    projectPhoto1,
    projectPhoto2,
    projectPhoto3,
  }): string[] {
    const renameArray = [
      projectThumb,
      projectPhoto1,
      projectPhoto2,
      projectPhoto3,
    ].map((photo) => {
      if (photo !== "") {
        fs.access(
          `public/images/tmp/projects/${photo}`,
          fs.constants.F_OK,
          (err) => {
            if (!err) {
              fs.rename(
                `public/images/tmp/projects/${photo}`,
                `public/images/projects/${photo}`,
                (err) => {
                  if (err) {
                    throw new Error("프로젝트 사진 경로 이동 실패.");
                  }
                }
              );
            }
          }
        );
        return photo?.replace("tmp/", "");
      }
      return "";
    });
    return renameArray;
  }
}

export default ProjectController;
