import { ICommentsControllerDomain } from "../domain/controllers/Comments";
import CommentsService from "../services/Comments.service";

class CommentsController implements ICommentsControllerDomain {
  public commentsService;

  constructor() {
    this.commentsService = new CommentsService();
  }

  async getCommentsList(postId: string): Promise<object> {
    const comments = this.commentsService.getCommentsList(postId);
    return comments;
  }

  async getComment(commentId: string): Promise<object> {
    const comment = await this.commentsService.getComment();
    return comment;
  }

  async writeComments(
    postId: string,
    userId: string,
    contents: string
  ): Promise<boolean> {
    const comments = await this.commentsService.writeComments(
      postId,
      userId,
      contents
    );

    return true;
  }

  async deleteComments(
    postId: string,
    userId: string,
    commentId: string
  ): Promise<boolean> {
    const deleteComment = await this.getComment(commentId);
    if (deleteComment.userId !== commentId) {
      throw new Error("비정상적인 접근입니다.");
    }
  }
}

export default CommentsController;
