import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Submission } from 'snoowrap';
import { PostDestruction } from '@/utils/postTransform';
import { PostFetchedT } from '@/interfaces/PostType';
import { SortedListingOptions } from 'snoowrap/dist/objects';

type sortModeT = 'hot' | 'top' | 'new' | 'controversial' | 'rising';

type returnPostsT = {
    destructuredPosts?: PostFetchedT[];
    originalListing?: Listing<Submission>;
};

const getPosts = async (
    sortMode: sortModeT,
    time: SortedListingOptions['time'],
    access_token: string,
    refresh_token?: string,
    subreddit?: string
): Promise<returnPostsT> => {
    const postsWithOriginalListing: returnPostsT = {
        destructuredPosts: [],
        originalListing: [] as Listing<Submission>,
    };

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
                data: PostDestruction(post),
                icon_img: await snoo.getUser(post.author.name).icon_img,
                originalPost: post,
            };
            postsWithOriginalListing.destructuredPosts.push(newPost);
        })
    ).then(() => {
        postsWithOriginalListing.originalListing = posts;
    });
    return postsWithOriginalListing;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    const { body, cookies } = req;

    const { subreddit, sortMode, time } = body;

    let postsWithOriginalListing: returnPostsT = {};
    let after: string;
    if (session) {
        const access_token = session.accessToken;
        const refresh_token = session.refreshToken;
        postsWithOriginalListing = await getPosts(
            sortMode,
            time,
            access_token as string,
            refresh_token as string,
            subreddit
        );
    } else {
        // const basicAuth = Buffer.from(`${process.env.APP_ONLY_ID}:`).toString('base64');

        // const resp = await fetch('https://www.reddit.com/api/v1/access_token', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Basic ${basicAuth}`,
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: `grant_type=https://oauth.reddit.com/grants/installed_client&device_id=DO_NOT_TRACK_THIS_DEVICE`,
        // });

        // const { access_token } = await resp.json();

        const access_token = cookies.token_appOnly;
        postsWithOriginalListing = await getPosts(sortMode, time, access_token, subreddit);
        // res.end();
    }
    res.status(200).send(JSON.stringify(postsWithOriginalListing));
};
