import { PostsState } from './posts/PostState';
import { CommentsState } from './comments/CommentsState';
import { ThunkDispatch } from 'redux-thunk';
import { combineReducers, Dispatch, Action } from 'redux';
import commentsReducer from './comments/reducer';
import postsReducer from './posts/reducer';
import authReducer from './auth/reducer';
import { AuthState } from './auth/AuthState';

export type RootState = {
    comments: CommentsState;
    posts: PostsState;
    auth: AuthState;
};

export const reducers = combineReducers({
    comments: commentsReducer,
    posts: postsReducer,
    auth: authReducer,
});

export type RootStore = ReturnType<typeof reducers>;

export type DispatchType = Dispatch<Action> & ThunkDispatch<RootStore, any, Action>;
// export type RootState = ReturnType<typeof reducers>;
