import { CommentType } from "./Comment";

export type Post = {
  id?: string;
  title: string;
  description: string;
  likes: string[];
  comments: CommentType[];
  createdAt: number;
  createdBy: string | undefined;
  imageURL?: string;
};
