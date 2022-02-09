import { PostsSortMode, PostsState } from '../PostState';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/store';
import { PostsActions, PostsTimes } from './action-creators';
import { Listing, Submission } from 'snoowrap';

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

            const posts = await res.json();

            console.log(`posts `, posts);
            await dispatch(receivePosts(subreddit, posts));
        } catch (err) {
            console.log(err);
            dispatch(PostsError(subreddit, err));
        }
    };
};

// export const fetchMorePosts = (subreddit?: string, sortMode: PostsSortMode = 'best', time: PostsTimes = 'month') => {
//     return async (dispatch: ThunkDispatch<PostsState, void, Action>, getState: () => RootState) => {
//         // dispatch(requestPosts(subreddit, sortMode, time));
//         const prevPosts = getState().posts;

//         // console.log(`prev `, prevPosts);
//         const res = await fetch('/api/posts/getPosts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ prevPosts }),
//         });
//     };
// };
