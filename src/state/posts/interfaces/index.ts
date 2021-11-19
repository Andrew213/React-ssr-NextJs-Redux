import { Submission } from 'snoowrap';
import { PostsActionType } from '../action-types';

export type PostsTimes = 'all' | 'hour' | 'day' | 'week' | 'month' | 'year';

interface receivePostsAction {
    type: PostsActionType.RECEIVE_POSTS;
    subreddit: string;
    posts: Submission[];
    receivedAt: Date;
}

interface requestPostsAction {
    type: PostsActionType.REQUEST_POSTS;
    subreddit: string;
    time: PostsTimes;
}

interface requestMorePostsAction {
    type: PostsActionType.REQUEST_MORE_POSTS;
    subreddit: string;
    posts: Submission[];
    recivedAt: Date;
}

interface fetchPostsErrorAction {
    type: PostsActionType.FETCH_POST_ERROR;
    subreddit: string;
}

export type PostsAction = requestPostsAction | requestMorePostsAction | fetchPostsErrorAction | receivePostsAction;
