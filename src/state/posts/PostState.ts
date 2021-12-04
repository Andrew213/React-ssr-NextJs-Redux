import { Submission, Listing } from 'snoowrap';
import { PostsTimes } from './interfaces';

export type PostsSortMode = 'best' | 'hot' | 'top' | 'controversial' | 'new' | 'rising' | '';

export type IdPostDict = {
    [key: string]: Submission;
};

export type PostsInSubState = {
    /** items will be a list of post IDs */
    items: string[];
    /** The original listing object fetched by Snoowrap, used when fetching more */
    originalListing: Listing<Submission> | null;
    sortMode: PostsSortMode;
    time: PostsTimes;
    receivedAt: Date | null;
    isLoading: boolean;
    isLoadingMore: boolean;
    error: boolean;
};

export type PostsState = {
    posts: Submission[];
    byId: IdPostDict;
    isLoading: boolean;
    error: boolean;
    // bySubreddit: {
    //     [key: string]: PostsInSubState;
    // };
};
