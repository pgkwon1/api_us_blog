import { Category, ITags } from "./PostDto";

export interface IPostEditRequestBody {
  id: string;
  author: string;
  category: Category;
  contents: string;
  tags?: ITags;
  title: string;
}
