import { PostsActionType } from '../action-types';
import { PostsAction } from '../interfaces';
import { PostsState } from '../PostState';

const defaultState: PostsState = {
    posts: [],
    // byId: {},
    // bySubreddit: {},
};

// const postsInSubreddit = (state: Pos) => {};

const posts = (state: PostsState = defaultState, action: PostsAction): PostsState => {
    switch (action.type) {
        case PostsActionType.RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts,
            };
        default:
            return state;
    }
};

export default posts;
