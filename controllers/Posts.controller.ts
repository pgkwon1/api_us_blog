/* eslint-disable class-methods-use-this */
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

  async getPost(id: number): Promise<object> {
    const postService = new PostsService();
    console.log(id);
    const post = await postService.getPost(id);
    return post;
  }

  async getUserPostList(): Promise<object> {
    const postService = new PostsService({ author: this.author });
    const postList = await postService.getUserPostList();
    return postList;
  }
}
export default PostController;
