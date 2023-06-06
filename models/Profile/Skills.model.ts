import { Association, DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "..";
import Profile from "./Profile.model";

interface ISkillsDto {
  id: string;
  name: string;
  category: string;
}
class Skills extends Model<ISkillsDto> {
  public id: string;

  public name: string;

  public category: string;

  public static associations: {
    profileSkills: Association<Skills, Profile>;
  };
}

Skills.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Skills",
    modelName: "Skills",
    sequelize,
    timestamps: false,
  }
);

export default Skills;
