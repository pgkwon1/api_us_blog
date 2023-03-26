import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import Posts from "./Posts.model";
import Likes from "./Likes.model";
import IUserDto from "../dto/UsersDto";

class Users extends Model<IUserDto> {
  public id: string;

  public userId: string;

  public password: string;

  public nickname: string;

  public salt: string;

  public readonly createdAt: Date;

  public readonly updateAt: Date;

  public static associations: {
    userPosts: Association<Users, Posts>;
    userLikes: Association<Users, Likes>;
  };
}
Users.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Users",
    tableName: "Users",
    sequelize,
    timestamps: true,
  }
);
Users.hasMany(Posts, {
  foreignKey: "author",
  sourceKey: "userId",
  as: "userPosts",
});

Users.hasMany(Likes, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "userLikes",
});

Users.sync();
export default Users;
