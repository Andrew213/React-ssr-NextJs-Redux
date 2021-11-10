import { RedditUser } from 'snoowrap';
import { authorT } from './PostType';

export interface replyI {
    author: string;
    authorImg: string;
    replies?: replyI[];
}

export default interface CommentType {
    author?: authorT;
    body?: string;
    id?: string;
    score?: number;
    subreddit?: string;
    repliesImg?: replyI[];
    created?: number;
    replies?: any;
}
