import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Users from "./Users.model";
import Posts from "./Posts.model";

interface LikesAttribute {
  id: string;
  postId: string;
  userId: string;
}

class Likes extends Model<LikesAttribute> {
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
