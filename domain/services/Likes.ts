export interface ILikesServicesDomain {
  like(postId: string): boolean;
  unlike(postId: string, userId: string): Promise<boolean>;
  likeOrUnlikeCancel(
    postId: string,
    userId: string,
    type: string
  ): Promise<boolean>;
}
