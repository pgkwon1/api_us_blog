/* eslint-disable class-methods-use-this */
import PostsService from "../services/Posts.service";
import { IPostsControllerDomain } from "../domain/controllers/Posts";

class PostController implements IPostsControllerDomain {
  public id: string;

  public author: string;

  private postService: PostsService;

  constructor(id?: string, author?: string) {
    this.id = id;
    this.author = author;
    this.postService = new PostsService(this.id, this.author);
  }

  static async getPostsList(): Promise<object> {
    const postList = await PostsService.getPostList();
    return postList;
  }

  async getPost(): Promise<object> {
    const post = await this.postService.getPost();
    return post;
  }

  async getUserPostList(): Promise<object> {
    const postList = await this.postService.getUserPostList();
    return postList;
  }
}
export default PostController;
