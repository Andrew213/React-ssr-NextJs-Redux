import { AuthActionType } from '../actions/action-types';

export interface requestAuthI {
    type: AuthActionType.REQUEST_AUTH;
}

export interface receiveAuthI {
    type: AuthActionType.RECEIVE_AUTH;
    isAppOnly: boolean;
    authToken: string;
}

export interface errAuthI {
    type: AuthActionType.AUTH_ERROR;
    errorMessage: string;
}

export type AuthAction = requestAuthI | receiveAuthI | errAuthI;
