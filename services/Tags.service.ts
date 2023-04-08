import ITagsServiceDomain from "../domain/services/Tags";
import { ITagsDto } from "../dto/tags/TagsDto";
import Tags from "../models/Tags.model";

export default class TagsService implements ITagsServiceDomain {
  constructor() {}

  async createTags(tags: ITagsDto[]): Promise<object> {
    
    const result = await Tags.bulkCreate(tags, {
      ignoreDuplicates: true,
      fields: ["tagName", "id"],
    });

    if (!result) {
      throw new Error("태그 생성에 실패하였습니다.");
    }
    console.log("here result", result);
    return result;
  }

  async createPostsTags(
    tags: ITagsDto[],
    postInstance: object
  ): Promise<boolean> {
    
    let result: boolean = true;
    for await (let i = 0; i < tags.length; i++) {
      const { tagName } = tags[i]

      console.log("num", i)
      const tagInfo = await Tags.findOne({
        where: {
          tagName,
        },
      });

      if (!tagInfo) {
        result = false;
        break;
      }
      await postInstance.addTags(tagInfo);
    }
    
    if (result === false) {
      throw new Error("태그 생성에 실패하였습니다.");
    }
    return true;
  }
}
