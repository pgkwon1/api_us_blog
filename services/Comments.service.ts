/* eslint-disable class-methods-use-this */
import { ICommentsServiceDomain } from "../domain/services/Comments";
import Comments from "../models/Comments.model";

class CommentsService implements ICommentsServiceDomain {
  constructor() {}

  async getCommentsList(postId: string): Promise<object> {
    const commentList = await Comments.findAll({
      where: {
        postId,
      },
      order: [["createdAt", "ASC"]];
    });

    return commentList;
  }

  async getComment(postId: string, userId: string): Promise<object> {
      const result = await Comments.findOne({
        where: {
          postId,
          userId,
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
    postId: string,
    userId: string,
    commentId: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export default CommentsService;
