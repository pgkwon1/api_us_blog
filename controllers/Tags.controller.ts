import ITagsControllerDomain from "../domain/controllers/Tags";
import TagsService from "../services/Tags.service";
import { ITagsDto } from "../dto/tags/TagsDto";
export default class TagsController implements ITagsControllerDomain {
  public tagsService: TagsService;

  constructor() {
    this.tagsService = new TagsService();
  }

  async createTags(tags: ITagsDto[], postInstance: object): Promise<boolean> {
    await this.tagsService.createTags(tags);
    await this.createPostsTags(tags, postInstance);
    return true;
  }

  async createPostsTags(
    tags: ITagsDto[],
    postInstance: object
  ): Promise<boolean> {
    await this.tagsService.createPostsTags(tags, postInstance);
    return true;
  }
}
