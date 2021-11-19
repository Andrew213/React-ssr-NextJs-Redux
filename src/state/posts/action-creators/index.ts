import { PostsActionType } from './../action-types/index';
import { PostsTimes } from './../interfaces/index';
import { PostsSortMode } from './../PostState';
import { Submission, Subreddit } from 'snoowrap';

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

export const receivePosts = (subreddit: string, posts: Submission[]) => ({
    type: PostsActionType.RECEIVE_POSTS,
    subreddit,
    posts,
    receivedAt: Date.now(),
});

export const fetchPostError = (subreddit: string) => ({
    type: PostsActionType.FETCH_POST_ERROR,
    subreddit,
});
