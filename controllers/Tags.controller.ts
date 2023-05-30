import ITagsControllerDomain from "../domain/controllers/Tags";
import TagsService from "../services/Tags.service";
import { ITagsDto } from "../dto/tags/TagsDto";
import Tags from "../models/Tags.model";
export default class TagsController implements ITagsControllerDomain {
  public tagsService: TagsService;

  constructor() {
    this.tagsService = new TagsService();
  }

  async createTags(tags: ITagsDto[], postInstance: object): Promise<boolean> {
    const createTags: Tags[] = await this.tagsService.createTags(tags);
    await this.createPostsTags(createTags, postInstance);
    return true;
  }

  async createPostsTags(
    createTags: Tags[],
    postInstance: object
  ): Promise<boolean> {
    await this.tagsService.createPostsTags(createTags, postInstance);
    return true;
  }
}
