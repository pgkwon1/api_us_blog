import { IPostList, IPostsTags } from "../dto/post/PostDto";

class TagsUtil {
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  static sortPostTags(post: IPostList) {
    post.Tags.sort((a, b) => {
      return a.PostsTags.order - b.PostsTags.order;
    });
    return post;
  }

  static sortPostListTags(postList: IPostList[]): IPostList[] {
    postList.map((post) =>
      post.Tags.sort((a, b) => a.PostsTags.order - b.PostsTags.order)
    );
    return postList;
  }
}
export default TagsUtil;
