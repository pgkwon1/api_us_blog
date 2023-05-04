export interface ILikesControllerDomain {
  like(postId: string): boolean;
  unlike(postId: string): boolean;
  likeOrUnlikeCancel(
    postId: string,
    userId: string,
    type: string
  ): Promise<boolean>;
  getLike(postId: string, userId: string): Promise<void>;
  getUnlike(postId: string, userId: string): Promise<void>;
}
