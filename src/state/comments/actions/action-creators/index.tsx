import { Submission } from 'snoowrap';
import { CommentsActionType } from '../action-types';
import { requestCommentsI, recieveCommentsI, fetchCommentsErrorI } from '../../interfaces';

export const requestComments = (): requestCommentsI => {
    return {
        type: CommentsActionType.REQUEST_COMMENTS,
    };
};

export const receiveComments = (comments: Submission[]): recieveCommentsI => {
    return {
        type: CommentsActionType.RECIEVE_COMMENTS,
        comments,
    };
};
export const fetchCommentsError = (errMsg: any): fetchCommentsErrorI => {
    return {
        type: CommentsActionType.FETCH_COMMENTS_ERROR,
        errMsg,
    };
};
