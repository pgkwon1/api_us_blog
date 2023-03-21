export interface IPostsControllerDomain {
  getPostsList(): Promise<object>;
  getPost(id: number): Promise<object>;
  getUserPostList(): Promise<object>;
}
