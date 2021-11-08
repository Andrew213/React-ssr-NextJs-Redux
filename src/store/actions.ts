import { CommentType } from './../components/CardList/Card/Card';
import * as types from './types';

export const commentsFetchDataSuccess = (comments: CommentType[]) => {
    return {
        type: types.FETCH_COMMENTS,
        payload: comments,
    };
};

export const commentsClear = () => {
    return {
        type: types.CLEAR_COMMENTS,
    };
};

// export const commentsFetchData = () => {
//     return dispatch => {
//         void fetch('/api/comments/getPostComments', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ commentsCount: 5, postId: id, repliesCount: 3 }),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(comments => dispatch(commentsFetchDataSuccess(comments)));
//     };
// };
