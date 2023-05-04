import { ILikesControllerDomain } from "../domain/controllers/Likes";
import LikesService from "../services/Likes.service";

class LikesController implements ILikesControllerDomain {
  public likesService;

  constructor() {
    this.likesService = new LikesService();
  }

  async like(postId: string, userId: string): Promise<boolean> {
    await this.likesService.like(postId, userId);
    return true;
  }

  async unlike(postId: string, userId: string): Promise<boolean> {
    await this.likesService.unlike(postId, userId);
    return true;
  }

  async likeOrUnlikeCancel(
    postId: string,
    userId: string,
    type: string
  ): Promise<boolean> {
    await this.likesService.likeOrUnlikeCancel(postId, userId, type);

    return true;
  }
}

export default LikesController;
