import { IPostListResult } from "../../dto/post/PostDto";
import IWriteDto from "../../dto/post/WriteDto";

export interface IPostsServiceDomain {
  getPost(userId: string): Promise<object>;
  getPostList(): Promise<object>;
  getUserPostList(author: string): Promise<object>;
  getPostListByCategory(category: string, page: number): Promise<object>;
  store(data: IWriteDto): Promise<object>;
}
