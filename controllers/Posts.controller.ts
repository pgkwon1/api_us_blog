import PostsService from "../services/Posts.service";
import { IPostsControllerDomain } from "../domain/controllers/Posts";

class PostController implements IPostsControllerDomain {
  public author: string;

  constructor(data?) {
    this.author = data?.author;
  }

  static async getPostsList(): Promise<object> {
    const postList = await PostsService.getPostList();
    return postList;
  }

  async getUserPostList(): Promise<object> {
    const postService = new PostsService({ author: this.author });
    const postList = await postService.getUserPostList();
    return postList;
  }
}
export default PostController;
