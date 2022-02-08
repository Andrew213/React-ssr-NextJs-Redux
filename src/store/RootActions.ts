import { fetchMorePosts, fetchPosts } from './posts/actions';
import { fetchComments } from './comments/actions';
import { fetchAuth } from './auth/actions';
export const FetchPosts = fetchPosts;
export const FetchComments = fetchComments;
export const FetchAuth = fetchAuth;
export const FetchMorePosts = fetchMorePosts;
