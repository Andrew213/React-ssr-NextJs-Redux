import { PostsState } from "./posts/PostState";
import { CommentsState } from "./comments/CommentsState";
import { ThunkDispatch } from "redux-thunk";
import { combineReducers, Dispatch, Action } from "redux";
import commentsReducer from "./comments/reducer/commentsReducer";
import postsReducer from "./posts/reducer/postsReducer";

export type RootState = {
  comments: CommentsState;
  posts: PostsState;
};

export const reducers = combineReducers({
  comments: commentsReducer,
  posts: postsReducer
});

export type RootStore = ReturnType<typeof reducers>;

export type DispatchType = Dispatch<Action> &
  ThunkDispatch<RootStore, any, Action>;
// export type RootState = ReturnType<typeof reducers>;
