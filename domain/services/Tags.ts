import { ITagsDto } from "../../dto/tags/TagsDto";

export default interface ITagsServiceDomain {
  getPostListByTag(tagName: string, page: number): Promise<object>;
  createTags(tags: ITagsDto[], post: object): Promise<object>;
  createPostsTags(tags: ITagsDto[], postInstance: object): Promise<boolean>;
}
