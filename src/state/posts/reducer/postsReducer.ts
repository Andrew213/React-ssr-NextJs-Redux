import { Submission } from 'snoowrap';
import { PostsActionType } from '../action-types';
import { PostsAction } from '../interfaces';
import { IdPostDict, PostsState } from '../PostState';

const defaultState: PostsState = {
    posts: [],
    isLoading: true,
    byId: {},
    error: false,
    // bySubreddit: {},
};

const combineWithNewPost = (oldPosts: IdPostDict, newPosts: Submission[]): IdPostDict => {
    const newPostsObj = { ...oldPosts };
    newPosts.forEach((post, i) => {
        newPostsObj[i + 1] = post;
    });

    return newPostsObj;
};

// const postsInSubreddit = (state: Pos) => {};

const posts = (state: PostsState = defaultState, action: PostsAction): PostsState => {
    switch (action.type) {
        case PostsActionType.REQUEST_POSTS:
            return {
                ...state,
                isLoading: true,
            };
        case PostsActionType.RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts,
                isLoading: false,
                // byId: combineWithNewPost(state.byId, action.posts)
            };
        case PostsActionType.FETCH_POST_ERROR:
            return { ...state, isLoading: false, error: true };
        default:
            return state;
    }
};

export default posts;
