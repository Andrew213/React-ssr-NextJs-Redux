import { CommentsActionType } from '../action-types';
import { CommentsAction } from '../interfaces';

interface commentsState {
    loading: boolean;
    error: string | null;
    data: any[];
}

const initialState: commentsState = {
    loading: false,
    error: null,
    data: [],
};

const reducer = (state: commentsState = initialState, action: CommentsAction): commentsState => {
    switch (action.type) {
        case CommentsActionType.LOAD_COMMENTS:
            return { loading: true, error: null, data: [] };
        case CommentsActionType.LOAD_COMMENTS_SUCCESS:
            return { loading: false, error: null, data: action.payload };
        case CommentsActionType.LOAD_COMMENTS_ERROR:
            return { loading: false, error: action.payload, data: [] };
        default:
            return state;
    }
};

export default reducer;
