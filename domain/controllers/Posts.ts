export interface IPostsControllerDomain {
  getPostsList(): Promise<object>;
  getPost(id: number): Promise<object>;
  getUserPostList(author: string): Promise<object>;
}
