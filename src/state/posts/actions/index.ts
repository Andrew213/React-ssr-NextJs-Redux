import { PostsTimes } from '../interfaces/index';
import moment from 'moment-mini';
import { PostsSortMode, PostsState } from '../PostState';
import { PostsActionType } from '../action-types/index';
import { Action, Dispatch } from 'redux';
import { PostsAction } from '../interfaces';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/state';
import snoowConf from '@/utils/snow';
import { fetchPostError, receivePosts, requestPosts } from '../action-creators';

export const postsRepositories = (subreddit?: string, sortMode: PostsSortMode = 'best', time: PostsTimes = 'month') => {
    // const { REQUEST_POSTS, RECEIVE_POSTS, REQUEST_MORE_POSTS, FETCH_POST_ERROR } = PostsActionType;

    return async (dispatch: ThunkDispatch<PostsAction, void, Action>, getState: () => RootState) => {
        const state = getState();

        // if (!shouldFetch(state, subreddit, sortMode, time)) return;

        dispatch(requestPosts(subreddit, sortMode, time));

        try {
            const tokens = await fetch('/api/snoowrap');
            const answ = await tokens.json();

            dispatch(receivePosts(subreddit, answ));
        } catch (err) {
            console.log(err);
            dispatch(fetchPostError(subreddit));
        }
    };
};
