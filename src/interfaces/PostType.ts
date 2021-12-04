import { RedditUser } from 'snoowrap';

export type authorT = {
    icon_img?: string;
    name?: string;
};

export type ContentT = {
    type: 'gif' | 'video' | 'text' | 'image';
    url: string;
};

export type DescriptionT = {
    type?: 'html' | 'URL';
    content?: string;
};

export default interface PostType {
    authorName?: string;
    commentsCount?: number;
    content?: ContentT;
    contentImg_Width?: number;
    contentImg_Height?: number;
    created?: string | number;
    domain?: string;
    distinguished?: 'moderator' | 'admin';
    description?: DescriptionT;
    headerImg?: string;
    id?: string;
    imgPreview_width?: number;
    imgPreview_height?: number;
    isGif?: boolean;
    isImage?: boolean;
    isLike?: boolean;
    isSelf?: boolean;
    isVideo?: boolean;
    linkFlaitText?: string;
    over18?: boolean;
    permalink?: string;
    post_himt?: string;
    saved?: boolean;
    score?: number;
    selfTextHtml?: string;
    spoiler?: boolean;
    sticked?: boolean;
    subredditName?: string;
    title?: string;
    thumbnail?: string;
    url?: string;
}
