import { fetchPosts } from './posts/actions';
import { fetchComments } from './comments/actions';
import { getAppOnly } from './auth/actions';
export const FetchPosts = fetchPosts;
export const FetchComments = fetchComments;
export const GetAppOnly = getAppOnly;
