import { SnoowrapAuthType, SnoowrapState } from '../SnoowrapState';
import { SnoowrapAT } from '../action-types';

export const receiveSnoowrapAC = (authType: SnoowrapAuthType) => {
    return {
        type: SnoowrapAT.RECEIVE_SNOOWRAP,
        receivedAt: Date.now(),
        authType,
    };
};

export const requestSnoowrap = () => {
    return {
        type: SnoowrapAT.REQUEST_SNOOWRAP,
    };
};

export const snoowrapErrorAC = () => {
    return {
        type: SnoowrapAT.SNOOWRAP_ERROR,
    };
};
