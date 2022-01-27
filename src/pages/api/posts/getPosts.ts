import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Submission } from 'snoowrap';
import { PostDisruction } from '@/utils/postTransform';
import { PostFetchedT } from '@/interfaces/PostType';
import { SortedListingOptions } from 'snoowrap/dist/objects';

type sortModeT = 'hot' | 'top' | 'new' | 'controversial' | 'rising';

const getPosts = async (
    sortMode: sortModeT,
    time: SortedListingOptions['time'],
    access_token: string,
    refresh_token?: string,
    subreddit?: string
): Promise<PostFetchedT[]> => {
    const postsWithIcon_img: PostFetchedT[] = [];
    const snoo: Snoowrap | null = snoowConf(access_token, refresh_token);
    let posts: Listing<Submission>;
    const sub = subreddit ? subreddit : '';

    switch (sortMode) {
        case 'hot':
            posts = await snoo.getHot(sub);
            break;
        case 'top':
            posts = await snoo.getTop(sub, { time });
            break;
        case 'new':
            posts = await snoo.getNew(sub);
            break;
        case 'controversial':
            posts = await snoo.getControversial(sub, { time });
            break;
        case 'rising':
            posts = await snoo.getRising(sub);
            break;
        default:
            posts = await snoo.getHot(sub);
    }
    await Promise.all(
        posts.map(async (post: Submission) => {
            const newPost: PostFetchedT = {
                data: PostDisruction(post),
                icon_img: await snoo.getUser(post.author.name).icon_img,
                originalPost: post,
            };
            postsWithIcon_img.push(newPost);
        })
    );
    return postsWithIcon_img;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    const { body, cookies } = req;

    const { subreddit, sortMode, time } = body;

    let postsWithIcon_img: PostFetchedT[] = [];

    if (session) {
        const access_token = cookies.token_auth;
        const refresh_token = cookies.refresh_token;
        postsWithIcon_img = await getPosts(sortMode, time, access_token, refresh_token, subreddit);
    } else {
        const access_token = cookies.token_appOnly;
        postsWithIcon_img = await getPosts(sortMode, time, access_token, subreddit);
    }
    res.status(200).send(postsWithIcon_img);
    res.end();
};
