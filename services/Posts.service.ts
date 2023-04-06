/* eslint-disable class-methods-use-this */
import { IPostsServiceDomain } from "../domain/services/Posts";
import Likes from "../models/Likes.model";
import Posts from "../models/Posts.model";
import Tags from "../models/Tags.model";
class PostsService implements IPostsServiceDomain {
  public id: string;

  public author: string;

  constructor(id: string, author: string) {
    this.id = id;
    this.author = author;
  }

  static async getPostList(): Promise<object> {
    const postList: object = await Posts.findAll({
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
    return postList;
  }

  async getPost(): Promise<object> {
    const post = await Posts.findOne({
      where: {
        id: this.id,
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

  async getUserPostList(): Promise<object> {
    const userPostList: object = await Posts.findAll({
      where: {
        author: this.author,
      },
      include: [{ model: Likes, as: "postsLikes" }],
    });
    return userPostList;
  }
}
export default PostsService;
