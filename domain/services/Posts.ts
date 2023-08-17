import { IPostEditRequestBody } from "../../dto/post/EditDto";
import { IPostList } from "../../dto/post/PostDto";
import IWriteDto from "../../dto/post/WriteDto";
import Posts from "../../models/Posts.model";

export interface IPostsServiceDomain {
  getPost(id: string): Promise<IPostList>;
  getUserPostList(author: string, page: number): Promise<Posts[]>;
  getPostListByCategory(category: string, page: number): Promise<object>;
  editPost(editData: IPostEditRequestBody, postInstance: Posts);
  deletePost(id: string): Promise<boolean>;
  store(data: IWriteDto): Promise<object>;
}
