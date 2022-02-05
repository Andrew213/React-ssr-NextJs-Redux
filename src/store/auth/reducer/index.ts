import { AuthActionsTypes, AuthActionType } from '../actions/action-creators';
import { AuthState } from '../AuthState';

const defaultState: AuthState = {
    isAppOnly: true,
    authToken: '',
    isLoading: true,
    error: false,
    errorMessage: '',
};

const auth = (state: AuthState = defaultState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case AuthActionsTypes.REQUEST_AUTH:
            return {
                ...state,
            };
        case AuthActionsTypes.RECEIVE_AUTH:
            return {
                ...state,
                isAppOnly: action.isAppOnly,
                authToken: action.authToken,
            };
        case AuthActionsTypes.AUTH_ERROR:
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
