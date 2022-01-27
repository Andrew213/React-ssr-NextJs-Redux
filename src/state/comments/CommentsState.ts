import { Comment, Listing, Submission } from 'snoowrap';

type IdCommentDict = {
    [key: string]: Comment;
};

export type CommentsState = {
    comments: Submission[];
    isLoading: boolean;
    error: boolean;
    errMsg: string;
    byId: IdCommentDict;
};
