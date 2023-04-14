/* eslint-disable class-methods-use-this */
import PostsService from "../services/Posts.service";
import { IPostsControllerDomain } from "../domain/controllers/Posts";
import TagsController from "./Tags.controller";
import IWriteDto from "../dto/post/WriteDto";

class PostController implements IPostsControllerDomain {
  public id: string;

  public author: string;

  private postService: PostsService;

  private tagsController: TagsController;

  constructor(id?: string, author?: string) {
    this.id = id;
    this.author = author;
    this.postService = new PostsService(this.id, this.author);
    this.tagsController = new TagsController();
  }

  static async getPostsList(page: number): Promise<object> {
    const { count, rows } = await PostsService.getPostList(page);
    return { count, rows };
  }

  async getPost(): Promise<object> {
    const post = await this.postService.getPost();
    return post;
  }

  async getUserPostList(): Promise<object> {
    const postList = await this.postService.getUserPostList();
    return postList;
  }

  async store(data: IWriteDto): Promise<string> {
    const postInstance = await this.postService.store(data);
    await this.tagsController.createTags(data.tags, postInstance);
    return postInstance.id;
  }
}
export default PostController;
