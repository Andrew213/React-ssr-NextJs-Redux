import { Action } from 'redux';
import { AuthState } from '../AuthState';

export enum AuthActionsTypes {
    REQUEST_AUTH = 'REQUEST_AUTH',
    RECEIVE_AUTH = 'RECEIVE_AUTH',
    AUTH_ERROR = 'AUTH_ERROR',
}

const initState: AuthState = {
    isLoading: true,
    errorMsg: '',
};

export const AuthReducer = (state: AuthState = initState, action: Action): AuthState => {
    switch (action.type) {
        case AuthActionsTypes.REQUEST_AUTH:
            return { ...state, errorMsg: '' };
        case AuthActionsTypes.RECEIVE_AUTH:
            return { ...state, isLoading: false };
        case AuthActionsTypes.AUTH_ERROR:
            return { ...state, isLoading: false, errorMsg: 'Что-то пошло не так' };
        default:
            return state;
    }
};
