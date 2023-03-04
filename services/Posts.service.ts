import Likes from "../models/Likes.model";
import Posts from "../models/Posts.model";

class PostsService {
  public author: string;

  constructor(data?) {
    this.author = data?.author;
  }

  static async getPostList(): Promise<object> {
    const postList: object = await Posts.findAll({
      include: [{ model: Likes, as: "postsLikes" }],
    });
    return postList;
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
