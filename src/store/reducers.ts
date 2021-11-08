import { CommentType } from './../components/CardList/Card/Card';
import { combineReducers } from 'redux';
import * as types from './types';

const initState: CommentType[] = [];

const commentsReducer = (state = initState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case types.FETCH_COMMENTS:
            return action.payload;
        case types.CLEAR_COMMENTS:
            return [];
        default:
            return state;
    }
};

export default commentsReducer;
