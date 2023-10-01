import { ICommentsControllerDomain } from "../domain/controllers/Comments";
import { ICommentUpdateData } from "../dto/post/CommentDto";
import Comments from "../models/Comments.model";
import CommentsService from "../services/Comments.service";

class CommentsController implements ICommentsControllerDomain {
  public commentsService;

  constructor() {
    this.commentsService = new CommentsService();
  }

  async getCommentsList(postId: string): Promise<Comments[]> {
    const comments = this.commentsService.getCommentsList(postId);
    if (comments === null) {
      throw new Error("댓글이 존재하지 않습니다.");
    }
    return comments;
  }

  async getComment(commentId: string, postId: string): Promise<Comments> {
    const comment = await this.commentsService.getComment(commentId, postId);
    return comment;
  }

  async writeComments(
    postId: string,
    userId: string,
    contents: string
  ): Promise<boolean> {
    await this.commentsService.writeComments(postId, userId, contents);
    return true;
  }

  async deleteComments(
    commentId: string,
    postId: string,
    userId: string
  ): Promise<boolean> {
    const commentInstance = await this.getComment(commentId, postId);
    if (commentInstance.userId !== userId) {
      throw new Error("비정상적인 접근입니다.");
    }

    await this.commentsService.deleteComments(commentInstance);
    return true;
  }

  async updateComments({
    commentId,
    postId,
    contents,
    userId,
  }: ICommentUpdateData): Promise<boolean> {
    const commentInstance: Comments = await this.getComment(commentId, postId);

    if (commentInstance.userId !== userId) {
      throw new Error("비정상적인 접근입니다.");
    }

    await this.commentsService.updateComments(commentInstance, contents);
    return true;
  }
}

export default CommentsController;
