import { PostsActionType } from '../action-types';
import { PostsTimes } from '../../interfaces';
import { PostsSortMode } from '../../PostState';
import { PostFetchedT } from '@/interfaces/PostType';

export const requestPosts = (subreddit: string, sortMode: PostsSortMode, time: PostsTimes) => {
    return {
        type: PostsActionType.REQUEST_POSTS,
        subreddit,
        sortMode,
        time,
    };
};

export const requestMorePosts = (subreddit: string) => ({
    type: PostsActionType.REQUEST_MORE_POSTS,
    subreddit,
});

export const receivePosts = (subreddit: string, posts: PostFetchedT[]) => ({
    type: PostsActionType.RECEIVE_POSTS,
    subreddit,
    posts,
    receivedAt: Date.now(),
});

export const fetchPostError = (subreddit: string) => ({
    type: PostsActionType.FETCH_POST_ERROR,
    subreddit,
});
