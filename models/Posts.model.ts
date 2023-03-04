import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Likes from "./Likes.model";
import Tags from "./Tags.model";
import Users from "./Users.model";

interface PostsAttribute {
  id: string;
  author: string;
  like: number;
}
class Posts extends Model<PostsAttribute> {
  public id: string;

  public author: string;

  public like: number;

  public readonly createdAt;

  public readonly updateAt;

  public static associations: {
    userLikes: Association<Posts, Likes>;
    postsTags: Association<Posts, Tags>;
  };
}

Posts.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    author: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "Posts",
    tableName: "Posts",
    sequelize,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    timestamps: true,
  }
);
Posts.hasMany(Likes, {
  as: "postsLikes",
  foreignKey: "postId",
  sourceKey: "id",
});
Posts.belongsToMany(Tags, {
  as: "postsTags",
  through: "PostsTags",
});
export default Posts;
