import { Model, DataTypes, UUIDV4 } from "sequelize";
import IProjectDto from "../../dto/models/Profile/ProjectDto";
import { sequelize } from "..";
import Skills from "./Skills.model";

class Project extends Model<IProjectDto> {
  public id: string;

  public userId: string;

  public projectName: string;

  public projectOverView: string;

  public projectThumb: string;

  public projectPhoto1: string;

  public projectPhoto2: string;

  public projectPhoto3: string;

  public role: string;

  public personnel: number;

  public startDate: Date;

  public endDate: Date;

  public inPgoress: boolean;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
    },

    projectName: {
      type: DataTypes.STRING,
    },

    projectOverView: {
      type: DataTypes.TEXT,
    },

    projectThumb: {
      type: DataTypes.STRING,
    },

    projectPhoto1: {
      type: DataTypes.STRING,
    },

    projectPhoto2: {
      type: DataTypes.STRING,
    },

    projectPhoto3: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.STRING,
    },

    personnel: {
      type: DataTypes.STRING,
    },

    startDate: {
      type: DataTypes.DATE,
    },

    endDate: {
      type: DataTypes.DATE,
    },
    inProgress: {
      type: DataTypes.TINYINT,
    },
  },
  {
    tableName: "Projects",
    modelName: "Projects",
    sequelize,
    timestamps: true,
  }
);

export const ProjectsSkills = sequelize.define(
  "ProjectsSkills",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
    },

    skillsId: {
      type: DataTypes.UUID,
      unique: true,
    },

    projectsId: {
      type: DataTypes.UUID,
      unique: true,
    },
  },
  {
    tableName: "ProjectsSkills",
    modelName: "ProjectsSkills",
    sequelize,
    timestamps: false,
  }
);

Project.belongsToMany(Skills, {
  through: ProjectsSkills,
  foreignKey: "projectsId",
});
Skills.belongsToMany(Project, {
  through: ProjectsSkills,
  foreignKey: "skillsId",
});

export default Project;
