import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";

export interface ICommentsDto {
  id: string;
  postId: string;
  userId: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
}
class Comments extends Model<ICommentsDto> {
  public id: string;

  public postId: string;

  public userId: string;

  public contents: string;

  public createdAt: Date;

  public updatedAt: Date;
}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    postId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    contents: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "Comments",
    tableName: "Comments",
    sequelize,
    timestamps: true,
  }
);

Comments.sync();

export default Comments;
