export interface IPostsServiceDomain {
  getPost(): Promise<object>;
  getPostList(): Promise<object>;
  getUserPostList(): Promise<object>;
  store(data: IWriteDto): Promise<object>;
}
