import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Submission } from 'snoowrap';
import { isImgUrl, PostDestruction } from '@/utils/postTransform';
import { PostFetchedT } from '@/interfaces/PostType';
import { SortedListingOptions } from 'snoowrap/dist/objects';

type sortModeT = 'hot' | 'top' | 'new' | 'controversial' | 'rising';

type returnPostsT = {
    destructuredPosts?: PostFetchedT[];
    originalListing?: Listing<Submission>;
};

const getPosts = async (
    sortMode: sortModeT = 'hot',
    time: SortedListingOptions['time'],
    access_token: string,
    refresh_token?: string,
    subreddit?: string
): Promise<PostFetchedT[]> => {
    const postsWithOriginalListing: PostFetchedT[] = [];

    const snoo: Snoowrap | null = snoowConf(access_token, refresh_token);

    const sub = subreddit ? `r/${subreddit}/` : '';

    const resp = await fetch(`https://oauth.reddit.com/${sub}${sortMode}?limit=9`, {
        headers: { Authorization: `bearer ${access_token}` },
    });

    const {
        data: { children: posts, after },
    } = await resp.json();

    await Promise.all(
        posts.map(async ({ data }: any) => {
            const getImg = await fetch(`https://oauth.reddit.com/user/${data.author}/about.json`, {
                headers: { Authorization: `bearer ${access_token}` },
            })
                .then(res => res.json())
                .then(res => res.data.icon_img.split('?')[0]);
            const newPost: PostFetchedT = {
                data: PostDestruction(data, data.author),
                icon_img: await getImg,
            };
            postsWithOriginalListing.push(newPost);
        })
    );

    return postsWithOriginalListing;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    const { body, cookies } = req;

    const { subreddit, sortMode, time } = body;

    // #############################################

    const access_token = cookies.token_appOnly;

    // #############################################

    let postsWithOriginalListing: PostFetchedT[];
    let after: string;
    if (session) {
        // const access_token = session.accessToken;
        // const refresh_token = session.refreshToken;
        // postsWithOriginalListing = await getPosts(
        //     sortMode,
        //     time,
        //     access_token as string,
        //     refresh_token as string,
        //     subreddit
        // );
    } else {
        // const access_token = cookies.token_appOnly;
        postsWithOriginalListing = await getPosts(sortMode, time, access_token, '', '');
    }

    const sub = '';

    // const foo = await getPosts('hot', time, access_token, '', subreddit);
    // res.status(200).send(JSON.stringify(foo));
    res.status(200).send(JSON.stringify(postsWithOriginalListing));
    res.end();
};
