/* eslint-disable class-methods-use-this */
import { ICommentsServiceDomain } from "../domain/services/Comments";
import Comments from "../models/Comments.model";

class CommentsService implements ICommentsServiceDomain {
  constructor() {}

  async getCommentsList(postId: string): Promise<Comments[]> {
    const commentList = await Comments.findAll({
      where: {
        postId,
      },
      order: [["createdAt", "ASC"]];
    });

    return commentList;
  }

  async getComment(commentId: string, postId: string): Promise<Comments> {
      const result = await Comments.findOne({
        where: {
          id: commentId,
          postId,
        }
      })

      if (result === null) {
        throw new Error("댓글이 없습니다.");
      }

      return result;
  }

  async writeComments(
    postId: string,
    userId: string,
    contents: string
  ): Promise<boolean> {
    const result = await Comments.create({
      postId,
      userId,
      contents,
    });

    if (result === null) {
      throw new Error("댓글 등록에 실패하였습니다.");
    }
    return true;
  }

  async deleteComments(
    commentInstance: Comments,
  ): Promise<boolean> {
    const result = await commentInstance.destroy();

    if (result === null) {
      throw new Error("댓글 삭제에 실패하였습니다.");
    }
    return true;
    
  }

  async updateComments(commentInstance: Comments, contents: string): Promise<boolean> {
    const result = await commentInstance.update({
      contents,
    })

    if (result === null) {
      throw new Error("댓글 수정에 실패하였습니다.");
    }

    return true;
  }
}

export default CommentsService;
