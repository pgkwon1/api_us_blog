export interface ICommentsServiceDomain {
  getCommentsList(postId: string): Promise<object>;
  getComment(postId: string, userId: string): Promise<object>;
  writeComments(
    postId: string,
    userId: string,
    contents: string
  ): Promise<boolean>;
  deleteComments(
    postId: string,
    userId: string,
    commentId: string
  ): Promise<boolean>;
}
