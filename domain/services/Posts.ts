export interface IPostsServiceDomain {
  getPostList(): Promise<object>;
  getUserPostList(): Promise<object>;
}
