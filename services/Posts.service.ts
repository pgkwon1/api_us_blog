/* eslint-disable class-methods-use-this */
import { IPostsServiceDomain } from "../domain/services/Posts";
import IWriteDto from "../dto/post/WriteDto";
import Likes from "../models/Likes.model";
import Posts from "../models/Posts.model";
import Tags from "../models/Tags.model";
class PostsService implements IPostsServiceDomain {
  constructor() {}

  static async getPostList(page: number): Promise<object> {
    let offset = 0;
    if (page > 1) {
      offset = 10 * page;
    }
    const { count, rows }: object = await Posts.findAndCountAll({
      limit: 10,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Tags,
          through: {
            attributes: ["tagId", "postId"],
          },
        },
        { model: Likes, as: "postsLikes" },
      ],
    });

    return { count, rows };
  }

  async getPost(id: string): Promise<object> {
    const post = await Posts.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Tags,
          through: {
            attributes: ["postId", "tagId"],
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

  async getUserPostList(author: string): Promise<object> {
    const userPostList: object = await Posts.findAll({
      where: {
        author,
      },
      include: [{ model: Likes, as: "postsLikes" }],
    });
    return userPostList;
  }

  async getPostListByCategory(category: string, page: number): Promise<object> {
    let offset = 0;
    if (page > 1) {
      offset = page * 10;
    }
    const postListByCategory = await Posts.findAll({
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
