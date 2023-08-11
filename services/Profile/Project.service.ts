/* eslint-disable class-methods-use-this */
import IProjectServiceDomain from "../../domain/services/Profile/Project";
import IProjectDto from "../../dto/models/Profile/ProjectDto";
import { sequelize } from "../../models";
import Project, { ProjectsSkills } from "../../models/Profile/Project.model";
import Skills from "../../models/Profile/Skills.model";

class ProjectService implements IProjectServiceDomain {
  constructor() {}

  async createProject(projectInfo: IProjectDto): Promise<Project> {
    const result = await Project.create(projectInfo);

    if (result === null) {
      throw new Error("프로젝트 생성에 실패하였습니다.");
    }

    return result;
  }

  async createProjectsSkills(
    projectsId: string,
    projectsSkills
  ): Promise<boolean> {
    const projectsSkillsPromise = projectsSkills.map(async (skill) => {
      return ProjectsSkills.findOrCreate({
        where: {
          projectsId,
          skillsId: skill.id,
        },
        defaults: {
          projectsId,
          skillsId: skill.id,
        },
      });
    });
    await Promise.all(projectsSkillsPromise);
    return true;
  }

  async deleteProjectsSkills(id: string): Promise<boolean> {
    const result = await ProjectsSkills.destroy({
      where: {
        id,
      },
    });

    if (result === null) {
      throw new Error("기술 스택 삭제에 실패하였습니다.");
    }
    return true;
  }

  async getProject(id: string): Promise<Project> {
    const result = await Project.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Skills,
          through: {
            attributes: ["id", "projectsId", "skillsId"],
          },
        },
      ],
    });
    if (result === null) {
      throw new Error("프로젝트가 존재하지 않습니다.");
    }
    return result;
  }

  async getProjectList(userId: string): Promise<Project[]> {
    const result = await Project.findAll({
      where: {
        userId,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Skills,
          through: {
            attributes: ["projectsId", "skillsId"],
          },
        },
      ],
    });

    if (result === null) {
      throw new Error("프로젝트가 존재하지 않습니다.");
    }
    return result;
  }

  async editProject(projectInfo: IProjectDto): Promise<boolean> {
    const projectInstance: Project = await this.getProject(projectInfo.id);
    const result = await projectInstance.update(projectInfo);

    if (result === null) {
      throw new Error("프로젝트 수정에 실패하였습니다.");
    }

    /**
     * n:m 관계 테이블 수정 처리.
     */
    await this.createProjectsSkills(projectInfo.id, projectInfo.Skills);
    return true;
  }

  async deleteProject(projectsId: string): Promise<boolean> {
    const projectInstance: Project = await this.getProject(projectsId);
    if (projectInstance === null) {
      throw new Error("비정상적인 접근입니다.");
    }

    const transaction = await sequelize.transaction();

    try {
      await ProjectsSkills.destroy({
        where: {
          projectsId,
        },
        transaction,
      });

      await Project.destroy({
        where: {
          id: projectsId,
        },
        transaction,
      });

      transaction.commit();
    } catch (e) {
      throw new Error("프로젝트 삭제에 실패하였습니다.");
    }
    return true;
  }
}
export default ProjectService;
