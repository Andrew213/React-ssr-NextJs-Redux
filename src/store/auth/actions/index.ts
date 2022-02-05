import { ThunkDispatch } from 'redux-thunk';
import { AuthState } from '../AuthState';
import { Action } from 'redux';
import { AuthActions } from './action-creators';

const { requestAuth, receiveAuth, authError } = AuthActions;

export const getAppOnly = () => {
    return async (dispatch: ThunkDispatch<AuthState, void, Action>) => {
        dispatch(requestAuth());

        const res = await fetch('/api/appOnlyAuth');
        if (!res.ok) {
            const errMesage = await res.json();
            dispatch(authError(errMesage));
        } else {
            dispatch(receiveAuth(true));
        }
    };
};
