/* eslint-disable class-methods-use-this */
import { IPostsServiceDomain } from "../domain/services/Posts";
import IWriteDto from "../dto/post/WriteDto";
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

  static async getPostList(page: number): Promise<object> {
    let offset = 0;
    if (page > 1) {
      offset = 10 * page;
    }
    const { count, rows }: object = await Posts.findAndCountAll({
      limit: 10,
      offset,
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
