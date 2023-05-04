import { ILikesServicesDomain } from "../domain/services/Likes";
import Likes from "../models/Likes.model";

class LikesService implements ILikesServicesDomain {
  constructor() {}

  async like(postId: string, userId: string): Promise<boolean> {
    const result = await this.getLike(postId, userId);

    if (result !== null) {
      throw new Error("이미 좋아요를 누르셨습니다.");
    }

    await Likes.POST_LIKES(postId, userId);
    return true;
  }

  async unlike(postId: string, userId: string): Promise<boolean> {
    const result = await this.getUnlike(postId, userId);

    if (result !== null) {
      throw new Error("이미 싫어요를 누르셨습니다.");
    }

    await Likes.POST_UNLIKES(postId, userId);
    return true;
  }

  async likeOrUnlikeCancel(
    postId: string,
    userId: string,
    type: string
  ): Promise<boolean> {
    const result =
      type === "LIKE"
        ? await this.getLike(postId, userId)
        : await this.getUnlike(postId, userId);

    if (result === null) {
      throw new Error("좋아요 또는 싫어요 정보가 존재하지 않습니다.");
    }
    await Likes.POST_LIKES_CANCEL(
      postId,
      userId,
      result.dataValues.likeId,
      type
    );
    return true;
  }

  async getLike(postId: string, userId: string): Promise<string> {
    const result = await Likes.findOne({
      where: {
        postId,
        userId,
        type: "LIKE",
      },
      attributes: [["id", "likeId"]],
    });

    return result;
  }

  async getUnlike(postId: string, userId: string): Promise<string> {
    const result = await Likes.findOne({
      where: {
        postId,
        userId,
        type: "UNLIKE",
      },
      attributes: [["id", "likeId"]],
    });
    return result;
  }
}

export default LikesService;
