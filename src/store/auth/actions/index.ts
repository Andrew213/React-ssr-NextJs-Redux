import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AuthState } from '../AuthState';
import { AuthActionsTypes } from '../reducer';

export const fetchAuth = () => {
    return async (dispatch: ThunkDispatch<AuthState, void, Action>) => {
        dispatch({
            type: AuthActionsTypes.REQUEST_AUTH,
        });

        try {
            const res = await fetch('/api/appOnlyAuth').then(() => {
                dispatch({ type: AuthActionsTypes.RECEIVE_AUTH });
            });
        } catch (err) {
            dispatch({
                type: AuthActionsTypes.AUTH_ERROR,
            });
        }
    };
};
