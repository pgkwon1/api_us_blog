import { ITagsDto } from "../../dto/tags/TagsDto";

export default interface ITagsServiceDomain {
  getPostListByTag(tagName: string, page: number): Promise<object>;
  createTags(tags: string[], post: object): Promise<boolean>;
  createPostsTags(tags: ITagsDto, postInstance: object): Promise<boolean>;
}
