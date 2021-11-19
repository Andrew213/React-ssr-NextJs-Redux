import { SnoowrapAuthType, SnoowrapState } from '../types/index';
import { ThunkDispatch } from 'redux-thunk';
import { SnoowrapAT } from '../action-types';
import { Action } from 'redux';
import { getSession } from 'next-auth/client';

const receiveSnoowrapAC = (authType: SnoowrapAuthType) => {
    return {
        type: SnoowrapAT.RECEIVE_SNOOWRAP,
        receivedAt: Date.now(),
        authType,
    };
};

const requestSnoowrap = () => {
    return {
        type: SnoowrapAT.REQUEST_SNOOWRAP,
    };
};

const snoowrapErrorAC = () => {
    return {
        type: SnoowrapAT.SNOOWRAP_ERROR,
    };
};

export const initSnoowrap = () => {
    return (dispatch: ThunkDispatch<SnoowrapState, void, Action>) => {
        dispatch(requestSnoowrap());

        // try{
        //     const authCredentials = await appOnlyOauth();
        //     const session = await getSession
        //     const accessToken =
        // }
    };
};
