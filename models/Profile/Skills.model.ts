import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "..";

interface ISkillsDto {
  id: string;
  name: string;
  category: string;
}
class Skills extends Model<ISkillsDto> {
  public id: string;

  public name: string;

  public category: string;

  constructor() {}
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
