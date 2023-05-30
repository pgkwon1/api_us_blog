/* eslint-disable class-methods-use-this */
import PostsService from "../services/Posts.service";
import { IPostsControllerDomain } from "../domain/controllers/Posts";
import TagsController from "./Tags.controller";
import IWriteDto from "../dto/post/WriteDto";
import TagsService from "../services/Tags.service";
import { IPostEditRequestBody } from "../dto/post/EditDto";
import Tags from "../models/Tags.model";
import TagsUtil from "../util/Tags.util";
import { IPostList } from "../dto/post/PostDto";

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

  async getPostsList(page: number): Promise<object> {
    let { count, rows } = (await PostsService.getPostList(page)) as unknown as {
      count: number;
      rows: IPostList[];
    };
    rows = TagsUtil.sortPostListTags(rows);
    return { count, rows };
  }

  async getPost(id: string): Promise<object> {
    let post = (await this.postService.getPost(id)) as unknown as IPostList;
    post = TagsUtil.sortPostTags(post);
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

  async editPost(editData: IPostEditRequestBody): Promise<boolean> {
    const postInstance = await this.postService.getPost(editData.id);
    if (postInstance.author !== editData.author) {
      throw new Error("비정상적인 접근입니다.");
    }
    await this.postService.editPost(editData, postInstance);
    const createTags: Tags[] = await this.tagService.createTags(editData.tags);
    await this.tagService.updatePostsTags(createTags, postInstance);
    return true;
  }

  async store(data: IWriteDto): Promise<string> {
    const postInstance = await this.postService.store(data);
    await this.tagsController.createTags(data.tags, postInstance);
    return postInstance.id;
  }
}
export default PostController;
