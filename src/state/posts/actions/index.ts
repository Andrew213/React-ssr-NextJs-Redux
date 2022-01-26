import { PostsTimes } from '../interfaces';
import { PostsSortMode, PostsState } from '../PostState';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/state';
import { fetchPostError, receivePosts, requestPosts } from './action-creators';

export const fetchPosts = (subreddit?: string, sortMode: PostsSortMode = 'best', time: PostsTimes = 'month') => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async (dispatch: ThunkDispatch<PostsState, void, Action>, getState: () => RootState) => {
        dispatch(requestPosts(subreddit, sortMode, time));

        try {
            const res = await fetch('/api/posts/getPosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subreddit, sortMode, time }),
            });
            const posts = await res.json();
            dispatch(receivePosts(subreddit, posts));
        } catch (err) {
            console.log(err);
            dispatch(fetchPostError(subreddit));
        }
    };
};
