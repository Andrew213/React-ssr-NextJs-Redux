import { ActionReturnType } from '@/utils/ActionReturnType';

export enum AuthActionsTypes {
    REQUEST_AUTH = 'REQUEST_AUTH',
    RECEIVE_AUTH = 'RECEIVE_AUTH',
    AUTH_ERROR = 'AUTH_ERROR',
}

export const AuthActions = {
    requestAuth: () =>
        ({
            type: AuthActionsTypes.REQUEST_AUTH,
        } as const),

    receiveAuth: (isAppOnly?: boolean, authToken?: string) =>
        ({
            type: AuthActionsTypes.RECEIVE_AUTH,
            isAppOnly,
            authToken,
        } as const),

    authError: (errorMessage?: string) =>
        ({
            type: AuthActionsTypes.AUTH_ERROR,
            errorMessage,
        } as const),
};

export type AuthActionType = ActionReturnType<typeof AuthActions>;
