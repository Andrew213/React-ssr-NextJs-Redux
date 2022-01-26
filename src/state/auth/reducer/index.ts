import { AuthActionType } from '../actions/action-types';
import { AuthState } from '../AuthState';
import { AuthAction } from '../interfaces';

const defaultState: AuthState = {
    isAppOnly: true,
    authToken: '',
    isLoading: true,
    error: false,
    errorMessage: '',
};

const auth = (state: AuthState = defaultState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.REQUEST_AUTH:
            return {
                ...state,
            };
        case AuthActionType.RECEIVE_AUTH:
            return {
                ...state,
                isAppOnly: action.isAppOnly,
                authToken: action.authToken,
            };
        case AuthActionType.AUTH_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                // errorMessage: action
            };
        default:
            return state;
    }
};

export default auth;
