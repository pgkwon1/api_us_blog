import { IPostEditRequestBody } from "../../dto/post/EditDto";
import IWriteDto from "../../dto/post/WriteDto";
import Posts from "../../models/Posts.model";

export interface IPostsServiceDomain {
  getPost(id: string): Promise<Posts>;
  getUserPostList(author: string): Promise<Posts[]>;
  getPostListByCategory(category: string, page: number): Promise<object>;
  editPost(editData: IPostEditRequestBody, postInstance: Posts);
  store(data: IWriteDto): Promise<object>;
}
