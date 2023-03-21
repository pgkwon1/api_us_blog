import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Likes from "./Likes.model";
import Tags from "./Tags.model";

const category = ["기술", "직장", "잡담"] as const;
type Category = (typeof category)[keyof typeof category];

interface IPostsDto {
  id: string;
  author: string;
  title: string;
  contents: string;
  like: number;
  category: Category;
}
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

const PostsTags = sequelize.define("PostsTags", {
  tagId: DataTypes.STRING,
  postId: DataTypes.STRING,
});

Posts.hasMany(Likes, {
  as: "postsLikes",
  foreignKey: "postId",
  sourceKey: "id",
});
Posts.belongsToMany(Tags, {
  as: "postsTags",
  through: PostsTags,
});
Tags.belongsToMany(Posts, {
  as: "postsTags",

  through: PostsTags,
});
export default Posts;
