import IWriteDto from "../../dto/post/WriteDto";

export interface IPostsServiceDomain {
  getPost(): Promise<object>;
  getPostList(): Promise<object>;
  getUserPostList(): Promise<object>;
  getPostListByCategory(category: string, page: number): Promise<object>;
  store(data: IWriteDto): Promise<object>;
}
