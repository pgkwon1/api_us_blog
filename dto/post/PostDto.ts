const category = ["기술", "직장", "잡담"] as const;
const likeType = ["LIKE", "UNLIKE"] as const;
export type Category = (typeof category)[keyof typeof category];
export type LikeType = (typeof likeType)[keyof typeof likeType];

export interface IPostsTags {
  postId: string;
  tagId: string;
}
export interface ITags {
  PostsTags: IPostsTags;
  id: string;
  tagName: string;
  order: number;
}
export interface IPostsLikes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: LikeType;
  userId: string;
  postId: string;
}
export interface IPostList {
  Tags: ITags[];
  author: string;
  category: Category;
  contents: string;
  createdAt: Date;
  id: string;
  like: number;
  unlike: number;
  postsLikes;
  title: string;
  updatedAt: Date;
}

export interface IPostListResult {
  count: number;
  postList: IPostList[];
}

export interface IPostsCountResult<T> {
  count: number;
  rows: T[];
}
