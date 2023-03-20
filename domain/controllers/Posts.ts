export interface IPostsControllerDomain {
  getPostsList(): Promise<object>;
  getUserPostList(): Promise<object>;
}
