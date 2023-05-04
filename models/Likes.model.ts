import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";
import ILikesDto, { LIKETYPE } from "../dto/models/LikesDto";
class Likes extends Model<ILikesDto> {
  public id: string;

  public postId: string;

  public userId: string;

  public type: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public static POST_LIKES(postId: string, userId: string): Promise<void>;

  public static POST_UNLIKES(postId: string, userId: string): Promise<void>;

  public static POST_LIKES_CANCEL(
    postId: string,
    userId: string,
    likeId: string,
    type: LIKETYPE
  ): Promise<void>;
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
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["LIKE", "UNLIKE"],
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
Likes.POST_LIKES = async (postId: string, userId: string): Promise<void> => {
  await sequelize.query(`CALL POST_LIKES('${postId}', '${userId}')`);
};
Likes.POST_UNLIKES = async (postId: string, userId: string): Promise<void> => {
  await sequelize.query(`CALL POST_UNLIKES('${postId}', '${userId}')`);
};
Likes.POST_LIKES_CANCEL = async (
  postId: string,
  userId: string,
  likeId: string,
  type: LIKETYPE
): Promise<void> => {
  await sequelize.query(
    `CALL POST_LIKES_CANCEL('${postId}', '${userId}', '${likeId}', '${type}')`
  );
};
export default Likes;
