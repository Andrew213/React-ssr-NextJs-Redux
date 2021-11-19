import { RedditUser } from 'snoowrap';

export type authorT = {
    icon_img?: string;
    name?: string;
};

export type ContentT = {
    type: string;
    data: string;
};

export type DescriptionT = {
    type?: 'html' | 'URL';
    content?: string;
};

export default interface PostType {
    author?: authorT;
    created?: string | number;
    id?: string;
    permalink?: string;
    content?: ContentT;
    contentImg_Width?: number;
    contentImg_Height?: number;
    score?: number;
    headerImg?: string;
    description?: DescriptionT;
    thumbnail?: string;
    commentsCount?: number;
    title?: string;
    subreddit?: string;
}
