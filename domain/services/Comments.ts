import { ICommentUpdateData } from "../../dto/post/CommentDto";
import Comments from "../../models/Comments.model";

export interface ICommentsServiceDomain {
  getCommentsList(postId: string): Promise<object>;
  getComment(postId: string, userId: string): Promise<object>;
  writeComments(
    postId: string,
    userId: string,
    contents: string
  ): Promise<boolean>;
  deleteComments(commentInstance: Comments): Promise<boolean>;
  updateComments(updateComments: Comments, contents: string): Promise<boolean>;
}
