import { PostsSortMode } from '../../PostState';
import { PostFetchedT } from '@/interfaces/PostType';
import { ActionReturnType } from '@/utils/ActionReturnType';
import { Listing, Submission } from 'snoowrap';

export type PostsTimes = 'all' | 'hour' | 'day' | 'week' | 'month' | 'year';

export enum PostsActionsTypes {
    REQUEST_POSTS = 'REQUEST_POSTS',
    REQUEST_MORE_POSTS = 'REQUEST_MORE_POSTS',
    RECEIVE_POSTS = 'RECEIVE_POSTS',
    FETCH_POST_ERROR = 'FETCH_POST_ERROR',
}

export const PostsActions = {
    requestPosts: (subreddit: string, sortMode: PostsSortMode, time: PostsTimes) =>
        ({
            type: PostsActionsTypes.REQUEST_POSTS,
            subreddit,
            sortMode,
            time,
        } as const),

    receivePosts: (subreddit: string, posts: PostFetchedT[], originalListing: Listing<Submission>) =>
        ({
            type: PostsActionsTypes.RECEIVE_POSTS,
            subreddit,
            posts,
            originalListing,
            receivedAt: Date.now(),
        } as const),

    PostsError: (subreddit: string, errorMessage: string) =>
        ({
            type: PostsActionsTypes.FETCH_POST_ERROR,
            subreddit,
            errorMessage,
        } as const),
};

export type PostActionType = ActionReturnType<typeof PostsActions>;
