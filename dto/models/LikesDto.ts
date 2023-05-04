const liketype = ["LIKE", "UNLIKE"] as const;
export type LIKETYPE = (typeof liketype)[keyof typeof liketype];

export default interface ILikesDto {
  id: string;
  postId: string;
  userId: string;
  type: LIKETYPE;
  createdAt: Date;
  updatedAt: Date;
}
