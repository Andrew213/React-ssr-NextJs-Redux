import { Submission } from 'snoowrap';
import { PostActionType, PostsActionsTypes } from '../actions/action-creators';
import { IdPostDict, PostsState } from '../PostState';

const defaultState: PostsState = {
    posts: [],
    isLoading: true,
    byId: {},
    error: false,
    // bySubreddit: {},
};

// const postsInSubreddit = (state: Pos) => {};

const posts = (state: PostsState = defaultState, action: PostActionType): PostsState => {
    switch (action.type) {
        case PostsActionsTypes.REQUEST_POSTS:
            return {
                ...state,
                isLoading: true,
            };
        case PostsActionsTypes.RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts,
                isLoading: false,
                // byId: combineWithNewPost(state.byId, action.posts)
            };
        case PostsActionsTypes.FETCH_POST_ERROR:
            return { ...state, isLoading: false, error: true };
        default:
            return state;
    }
};

export default posts;
