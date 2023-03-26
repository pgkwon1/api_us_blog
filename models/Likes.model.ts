import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import ILikesDto from "../dto/LikesDto";
class Likes extends Model<ILikesDto> {
  public id: string;

  public postId: string;

  public userId: string;
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
  },
  {
    modelName: "Likes",
    tableName: "Likes",
    sequelize,
    timestamps: true,
  }
);

export default Likes;
