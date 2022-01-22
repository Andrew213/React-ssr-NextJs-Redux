export interface replyI {
    author: string;
    authorImg: string;
    replies?: replyI[];
}

export default interface CommentType {
    authorName?: string;
    authorAva?: string;
    body?: string;
    id?: string;
    score?: number;
    subreddit?: string;
    repliesImg?: replyI[];
    created?: number;
    replies?: any;
}
