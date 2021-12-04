import Snoowrap from 'snoowrap';
import { PostsTimes } from '../interfaces/index';
import moment from 'moment-mini';
import { PostsSortMode, PostsState } from '../PostState';
import { PostsActionType } from '../action-types/index';
import { Action, Dispatch } from 'redux';
import { PostsAction } from '../interfaces';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/state';
import { fetchPostError, receivePosts, requestPosts } from '../action-creators';

export const fetchPosts = (subreddit?: string, sortMode: PostsSortMode = 'best', time: PostsTimes = 'month') => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async (dispatch: ThunkDispatch<PostsState, void, Action>, getState: () => RootState) => {
        dispatch(requestPosts(subreddit, sortMode, time));

        try {
            const res = await fetch('/api/posts/getPosts', {
                method: 'POST',
                body: JSON.stringify({ subreddit, sortMode }),
            });
            const posts = await res.json();

            dispatch(receivePosts(subreddit, posts));
        } catch (err) {
            console.log(err);
            dispatch(fetchPostError(subreddit));
        }
    };
};
