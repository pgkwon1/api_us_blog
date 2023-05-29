import { IPostEditRequestBody } from "../../dto/post/EditDto";
import IWriteDto from "../../dto/post/WriteDto";

export interface IPostsControllerDomain {
  getPost(id: string): Promise<object>;
  getPostListByTag(tagName: string, page: number): Promise<object>;
  getUserPostList(author: string): Promise<object>;
  editPost(editData: IPostEditRequestBody): Promise<boolean>;
  store(data: IWriteDto): Promise<string>;
}
