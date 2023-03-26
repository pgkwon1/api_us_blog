const category = ["기술", "직장", "잡담"] as const;
type Category = (typeof category)[keyof typeof category];

export default interface IPostsDto {
  id: string;
  author: string;
  title: string;
  contents: string;
  like: number;
  category: Category;
}
