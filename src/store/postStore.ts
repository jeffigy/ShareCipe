import { create } from "zustand";
import { Post } from "types/Post";

type PostStore = {
  posts: Post[];
  createPost: (post: Post) => void;
  deletePost: (id: string) => void;
  setPosts: (posts: Post[]) => void;
  addComment: (postId: string, comment: any) => void;
};
const usePostStore = create<PostStore>((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post: Post) => post.id !== id),
    })),
  setPosts: (posts) => set({ posts }),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post: Post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
