import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { requestSnoowrap } from '../action-creators';
import { SnoowrapState } from '../SnoowrapState';

export const snoowrapRepository = () => {
    return (dispatch: ThunkDispatch<SnoowrapState, void, Action>) => {
        dispatch(requestSnoowrap());

        try{
            const authCredentials = await appOnlyOauth();
            const session = await getSession
            const accessToken =
        }
    };
};
