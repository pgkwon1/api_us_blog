export interface IPostsControllerDomain {
  getPostsList(): Promise<object>;
  getPost(): Promise<object>;
  getUserPostList(): Promise<object>;
}
