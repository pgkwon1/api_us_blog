import { ICommentUpdateData } from "../../dto/post/CommentDto";
import Comments from "../../models/Comments.model";

export interface ICommentsControllerDomain {
  getCommentsList(postId: string): Promise<Comments[]>;
  getComment(commentId: string, postId: string): Promise<Comments>;
  writeComments(
    postId: string,
    userId: string,
    contents: string
  ): Promise<boolean>;
  deleteComments(
    commentId: string,
    postId: string,
    userId: string
  ): Promise<boolean>;
  updateComments({
    commentId,
    postId,
    contents,
    userId,
  }: ICommentUpdateData): Promise<boolean>;
}
