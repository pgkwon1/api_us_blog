import { Request, Response } from "express";
import Posts from "../models/Posts.model";
import PostsService from "../services/Posts.service";

interface IPostDomain {
  getUserPostList(req: Request, res: Response): Promise<object>;
}
class PostController implements IPostDomain {
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
