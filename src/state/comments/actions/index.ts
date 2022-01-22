import { Dispatch } from 'redux';
import { CommentsActionType } from './action-types';
import { CommentsAction } from '../interfaces';

export const fetchComments = (id?: string) => {
    const { LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS, LOAD_COMMENTS_ERROR } = CommentsActionType;
    return async (dispatch: Dispatch<CommentsAction>) => {
        dispatch({
            type: LOAD_COMMENTS,
        });

        try {
            const res = await fetch('/api/comments/getPostComments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            // const comments = await res.json();
            // dispatch({
            //     type: LOAD_COMMENTS_SUCCESS,
            //     payload: comments,
            // });
        } catch (err) {
            dispatch({
                type: LOAD_COMMENTS_ERROR,
                payload: `err ${err}`,
            });
        }
    };
};
