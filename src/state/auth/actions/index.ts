import { ThunkDispatch } from 'redux-thunk';
import { AuthState } from '../AuthState';
import { Action } from 'redux';
import { authErr, receiveAuth, requestAuth } from './action-creators';

export const getAppOnly = () => {
    return async (dispatch: ThunkDispatch<AuthState, void, Action>) => {
        dispatch(requestAuth());

        console.log(123);
        const res = await fetch('/api/appOnlyAuth');
        if (!res.ok) {
            const errMesage = await res.json();
            dispatch(authErr(errMesage));
        } else {
            dispatch(receiveAuth(true));
        }
    };
};
