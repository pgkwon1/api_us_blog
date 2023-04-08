import { ITagsDto } from "../../dto/tags/TagsDto";

export default interface ITagsControllerDomain {
  createTags(tags: string[]): Promise<boolean>;
  createPostsTags(tags: ITagsDto[], postInstance: object): Promise<boolean>;
}
