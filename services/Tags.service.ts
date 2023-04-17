import ITagsServiceDomain from "../domain/services/Tags";
import { ITagsDto } from "../dto/tags/TagsDto";
import Posts, { PostsTags } from "../models/Posts.model";
import Tags from "../models/Tags.model";

export default class TagsService implements ITagsServiceDomain {
  constructor() {}

  async getPostListByTag(tagName: string, page: number): Promise<object> {
    let offset = 0;

    if (page > 1) {
      offset = page * 10;
    }
    const result = await Tags.findOne({
      where: {
        tagName,
      },
      offset,
      limit: 10,
      include: [
        {
          model: Posts, 
          through: PostsTags,
          include:[
            { model: Tags },
          ]
        }
      ]
    })
    if (result === null) {
      return []
    }
    return result.Posts;    
  }
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
