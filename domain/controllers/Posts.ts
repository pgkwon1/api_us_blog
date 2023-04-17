import IWriteDto from "../../dto/post/WriteDto";

export interface IPostsControllerDomain {
  getPost(): Promise<object>;
  getPostListByTag(tagName: string, page: number): Promise<object>;
  getUserPostList(): Promise<object>;
  store(data: IWriteDto): Promise<string>;
}
