import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Likes from "./Likes.model";
import Tags from "./Tags.model";
import IPostsDto from "../dto/models/PostsDto";
class Posts extends Model<IPostsDto> {
  public id: string;

  public author: string;

  public title: string;

  public contents: string;

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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.ENUM,
      values: ["기술", "직장", "잡담"],
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

const PostsTags = sequelize.define(
  "PostsTags",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    tagId: DataTypes.STRING,
    postId: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

Posts.hasMany(Likes, {
  as: "postsLikes",
  foreignKey: "postId",
  sourceKey: "id",
});
Posts.belongsToMany(Tags, {
  through: PostsTags,
});
Tags.belongsToMany(Posts, {
  through: PostsTags,
});
export default Posts;
