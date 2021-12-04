import PostType from '@/interfaces/PostType';
import { Submission } from 'snoowrap';

const PostTransform = (post: Submission): PostType[] => {
    const newPost: PostType = {
        authorName: post.author.name,
        commentsCount: post.num_comments,
    };

    const newPostsArr: PostType[] = [];

    return newPostsArr;
};

export {};
