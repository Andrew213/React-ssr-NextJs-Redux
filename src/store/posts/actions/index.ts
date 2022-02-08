import { PostsSortMode, PostsState } from '../PostState';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/store';
import { PostsActions, PostsTimes } from './action-creators';

const { requestPosts, receivePosts, PostsError } = PostsActions;

export const fetchPosts = (subreddit?: string, sortMode: PostsSortMode = 'best', time: PostsTimes = 'month') => {
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
            const { destructuredPosts, originalListing } = await res.json();
            // console.log(123);
            await dispatch(receivePosts(subreddit, destructuredPosts, originalListing));
        } catch (err) {
            console.log(err);
            dispatch(PostsError(subreddit, err));
        }
    };
};

export const fetchMorePosts = (subreddit?: string, sortMode: PostsSortMode = 'best', time: PostsTimes = 'month') => {
    return async (dispatch: ThunkDispatch<PostsState, void, Action>, getState: () => RootState) => {
        // dispatch(requestPosts(subreddit, sortMode, time));

        const prevPosts = getState().posts.originalListing;

        console.log(`prevPosts `, prevPosts);
    };
};
