/* eslint-disable class-methods-use-this */
import { Transaction } from "sequelize";
import { IPostsServiceDomain } from "../domain/services/Posts";
import { IPostEditRequestBody } from "../dto/post/EditDto";
import { IPostsCountResult } from "../dto/post/PostDto";
import IWriteDto from "../dto/post/WriteDto";
import { sequelize } from "../models";
import Likes from "../models/Likes.model";
import Posts, { PostsTags } from "../models/Posts.model";
import Tags from "../models/Tags.model";
import Comments from "../models/Comments.model";

class PostsService implements IPostsServiceDomain {
  constructor() {}

  static async getPostList(page: number): Promise<IPostsCountResult<Posts>> {
    let offset = 0;
    if (page > 1) {
      offset = 10 * page;
    }
    const { count, rows } = await Posts.findAndCountAll({
      limit: 10,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Tags,
          through: {
            attributes: ["tagId", "postId", "order"],
          },
        },
        { model: Likes, as: "postsLikes" },
      ],
    });

    return { count, rows };
  }

  async getPost(id: string): Promise<Posts> {
    const post: Posts = await Posts.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Tags,
          through: {
            attributes: ["postId", "tagId", "order"],
          },
        },
        {
          model: Likes,
          as: "postsLikes",
        },
      ],
    });

    if (!post) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    return post;
  }

  async getUserPostList(author: string, page: number): Promise<Posts[]> {
    let offset = 0;
    if (page > 1) {
      offset = 10 * page;
    }
    const postList = await Posts.findAll({
      where: {
        author,
      },
      limit: 10,
      offset,
      include: [
        {
          model: Tags,
          through: {
            attributes: ["postId", "tagId", "order"],
          },
        },
        {
          model: Likes,
          as: "postsLikes",
        },
      ],
    });
    return postList;
  }

  async getPostListByCategory(
    category: string,
    page: number
  ): Promise<Posts[]> {
    let offset = 0;
    if (page > 1) {
      offset = page * 10;
    }
    const postListByCategory: Posts[] = await Posts.findAll({
      where: {
        category,
      },
      offset,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: { model: Tags },
    });

    return postListByCategory;
  }

  async editPost(
    editData: IPostEditRequestBody,
    postInstance: Posts
  ): Promise<boolean> {
    await postInstance.update(editData);
    return true;
  }

  async deletePost(id: string): Promise<boolean> {
    const transaction: Transaction = await sequelize.transaction();
    try {
      await PostsTags.destroy({
        where: {
          postId: id,
        },
        transaction,
      });

      await Comments.destroy({
        where: {
          postId: id,
        },
        transaction,
      });
      await Likes.destroy({
        where: {
          postId: id,
        },
        transaction,
      });
      await Posts.destroy({
        where: {
          id,
        },
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw new Error("게시물 삭제에 실패하였습니다.");
    }
    return true;
  }

  async store(data: IWriteDto): Promise<object> {
    const { author, title, contents, category } = data;

    const post = await Posts.create({
      author,
      title,
      contents,
      category,
    });
    if (!post) {
      throw new Error("게시물 등록하는데 실패하였습니다.");
    }

    return post;
  }
}
export default PostsService;
