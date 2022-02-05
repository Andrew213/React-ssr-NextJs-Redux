import { ThunkDispatch } from 'redux-thunk';
import { CommentsActionType } from './action-types';
import { CommentsAction } from '../interfaces';
import { receiveComments, requestComments, fetchCommentsError } from '../actions/action-creators';
import { CommentsState } from '../CommentsState';

export const fetchComments = (id?: string) => {
    return async (dispatch: ThunkDispatch<CommentsState, void, CommentsAction>) => {
        dispatch(requestComments());

        try {
            const res = await fetch('/api/comments/getPostComments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: id }),
            });
            const comments = await res.json();
            console.log(`comments `, 123);
            // dispatch(receiveComments())
        } catch (err) {
            // dispatch({
            //     type: LOAD_COMMENTS_ERROR,
            //     payload: `err ${err}`,
            // });
        }
    };
};
