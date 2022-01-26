import { AuthActionType } from '../action-types';
import { requestAuthI, receiveAuthI, errAuthI } from '../../interfaces';

export const requestAuth = (): requestAuthI => {
    return {
        type: AuthActionType.REQUEST_AUTH,
    };
};

export const receiveAuth = (isAppOnly?: boolean, authToken?: string): receiveAuthI => {
    return {
        type: AuthActionType.RECEIVE_AUTH,
        isAppOnly,
        authToken,
    };
};

export const authErr = (errorMessage?: string): errAuthI => {
    return {
        type: AuthActionType.AUTH_ERROR,
        errorMessage,
    };
};
