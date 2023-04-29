import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import ILikesDto from "../dto/models/LikesDto";
class Likes extends Model<ILikesDto> {
  public id: string;

  public postId: string;

  public userId: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;
}

Likes.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "Likes",
    tableName: "Likes",
    sequelize,
    timestamps: true,
  }
);

export default Likes;
