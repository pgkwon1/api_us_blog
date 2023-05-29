import { Model } from "sequelize";
import ITagsServiceDomain from "../domain/services/Tags";
import { ITagsDto } from "../dto/tags/TagsDto";
import Posts, { PostsTags } from "../models/Posts.model";
import Tags from "../models/Tags.model";

export default class TagsService implements ITagsServiceDomain {
  constructor() {}

  async getPostListByTag(tagName: string, page: number): Promise<object> {

    const result = await Tags.findOne({
      where: {
        tagName,
      },
      order: [["createdAt", "DESC"]],
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
  async createTags(tags: ITagsDto[]): Promise<Tags[]> {
    
    const result = await Tags.bulkCreate(tags, {
      ignoreDuplicates: true,
      fields: ["tagName", "id"],
      returning: true,
    });

    if (!result) {
      throw new Error("태그 생성에 실패하였습니다.");
    }
    return result;
  }

  async createPostsTags(
    tags: Tags[],
    postInstance: object
  ): Promise<boolean> {
    
    let result: boolean = true;
    for await (let i = 0; i < tags.length; i++) {
      const tagInfo = tags[i];      
      
      if (!tagInfo) {
        result = false;
        break;
      }
      await postInstance.addTags(tagInfo, 
        {
          through: {
            order: i + 1
          }
        });
    }
    
    if (result === false) {
      throw new Error("태그 생성에 실패하였습니다.");
    }
    return true;
  }

  async updatePostsTags(
    tags: ITagsDto[],
    postInstance: object
  ): Promise<boolean> {
    let result: boolean = true;

    await PostsTags.destroy({where:{postId: postInstance.id}});
    const promiseArr: Promise<Model>[] = [];

    for await (let i = 0; i < tags.length; i++) {
      const tagInfo = tags[i]
      if (!tagInfo) {
        result = false;
        break;
      }
      tagInfo.dataValues.order = i;

      //태그 순서부분 구현하기
      promiseArr.push(postInstance.addTags(tagInfo, {through: { order : i + 1}}));
    }
    try {
      await Promise.all(promiseArr)
    } catch (err) {
      throw new Error("태그 생성에 실패하였습니다.");
    }
    return true;
  }

  static sortPostTags(post) {
    post.Tags.sort((a, b) => {
      return a.PostsTags.order - b.PostsTags.order;
    });
    return post;
  }

  static sortPostListTags(postList) {
    postList.map((post) =>
      post.Tags.sort((a, b) => a.PostsTags.order - b.PostsTags.order)
    );
    return postList;
  }
}
