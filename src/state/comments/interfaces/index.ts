import { CommentsActionType } from '../actions/action-types';

interface LoadCommentsAction {
    type: CommentsActionType.LOAD_COMMENTS;
}

interface LoadCommentsSuccessAction {
    type: CommentsActionType.LOAD_COMMENTS_SUCCESS;
    payload: any[];
}

interface LoadCommentsErrorAction {
    type: CommentsActionType.LOAD_COMMENTS_ERROR;
    payload: string | null;
}

export type CommentsAction = LoadCommentsAction | LoadCommentsErrorAction | LoadCommentsSuccessAction;
