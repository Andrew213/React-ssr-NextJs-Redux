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
