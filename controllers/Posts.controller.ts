/* eslint-disable class-methods-use-this */
import PostsService from "../services/Posts.service";
import { IPostsControllerDomain } from "../domain/controllers/Posts";
import TagsController from "./Tags.controller";
import IWriteDto from "../dto/post/WriteDto";
import TagsService from "../services/Tags.service";

class PostController implements IPostsControllerDomain {
  public id: string;

  public author: string;

  private postService: PostsService;

  private tagService: TagsService;

  private tagsController: TagsController;

  constructor() {
    this.postService = new PostsService();
    this.tagService = new TagsService();
    this.tagsController = new TagsController();
  }

  static async getPostsList(page: number): Promise<object> {
    const { count, rows } = await PostsService.getPostList(page);
    return { count, rows };
  }

  async getPost(id: string): Promise<object> {
    const post = await this.postService.getPost(id);
    return post;
  }

  async getPostListByTag(tagName: string, page: number): Promise<object> {
    const postByTag = await this.tagService.getPostListByTag(tagName, page);
    return postByTag;
  }

  async getPostListByCategory(category: string, page: number): Promise<object> {
    const postByCategory = await this.postService.getPostListByCategory(
      category,
      page
    );
    return postByCategory;
  }

  async getUserPostList(author: string): Promise<object> {
    const postList = await this.postService.getUserPostList(author);
    return postList;
  }

  async store(data: IWriteDto): Promise<string> {
    const postInstance = await this.postService.store(data);
    await this.tagsController.createTags(data.tags, postInstance);
    return postInstance.id;
  }
}
export default PostController;
