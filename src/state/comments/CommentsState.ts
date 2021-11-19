import { Comment } from 'snoowrap';

type IdCommentDict = {
    [key: string]: Comment;
};

export type CommentsState = {
    byId: IdCommentDict;
};
