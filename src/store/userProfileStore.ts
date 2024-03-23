import { Post } from "types/Post";
import { User } from "types/User";
import { create } from "zustand";

type UserProfileStore = {
  userProfile: User | null;
  setUserProfile: (userProfile: any | null) => void;
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
};

const useUserProfileStore = create<UserProfileStore>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  addPost: (post) =>
    set((state: any) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  deletePost: (postId) =>
    set((state: any) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id: string) => id !== postId),
      },
    })),
}));

export default useUserProfileStore;
