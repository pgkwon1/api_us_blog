import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Posts from "./Posts.model";
import { ITagsModelDto } from "../dto/models/TagsDto";

class Tags extends Model<ITagsModelDto> {
  public id: string;

  public tagName: string;

  public readonly createdAt;

  public readonly updateAt;

  public static associations: { postsTags: Association<Posts, Tags> };
}

Tags.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    tagName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    modelName: "Tags",
    tableName: "Tags",
    sequelize,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    timestamps: true,
  }
);

export default Tags;
