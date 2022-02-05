import { CommentsActionType } from '../actions/action-types';

export interface requestCommentsI {
    type: CommentsActionType.REQUEST_COMMENTS;
}

export interface recieveCommentsI {
    type: CommentsActionType.RECIEVE_COMMENTS;
    comments: any[];
}

export interface fetchCommentsErrorI {
    type: CommentsActionType.FETCH_COMMENTS_ERROR;
    errMsg: string;
}

export type CommentsAction = requestCommentsI | recieveCommentsI | fetchCommentsErrorI;
