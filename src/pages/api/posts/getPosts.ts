import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Submission } from 'snoowrap';
import { PostDisruction } from '@/utils/postTransform';
import { PostFetchedT } from '@/interfaces/PostType';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    const { body } = req;

    const { subreddit, sortMode, time } = body;

    let r: Snoowrap | null = null;

    const postsWithIcon_img: PostFetchedT[] = [];

    let posts: Listing<Submission>;

    if (session) {
        r = snoowConf(session.accessToken as string, session.refreshToken as string);

        const posts = await r.getHot('webdev');

        await Promise.all(
            posts.map(async (post: Submission) => {
                const newPost: PostFetchedT = {
                    data: PostDisruction(post),
                    icon_img: await r.getUser(post.author.name).icon_img,
                    originalPost: post,
                };

                postsWithIcon_img.push(newPost);
            })
        );

        res.status(200).send(JSON.stringify(postsWithIcon_img));
    } else {
        const basicAuth = Buffer.from(`${process.env.APP_ONLY_ID}:`).toString('base64');

        const resp = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=https://oauth.reddit.com/grants/installed_client&device_id=DO_NOT_TRACK_THIS_DEVICE`,
        });

        const json = await resp.json();

        r = snoowConf(json.access_token as string);

        // #########################################################
        const sub = subreddit ? subreddit : '';

        switch (sortMode) {
            case 'hot':
                posts = await r.getHot(sub);
                break;
            case 'top':
                posts = await r.getTop(sub, { time });
                break;
            case 'new':
                posts = await r.getNew(sub);
                break;
            case 'controversial':
                posts = await r.getControversial(sub, { time });
                break;
            case 'rising':
                posts = await r.getRising(sub);
                break;
            default:
                posts = await r.getHot(sub);
        }

        await Promise.all(
            posts.map(async (post: Submission) => {
                const newPost: PostFetchedT = {
                    data: PostDisruction(post),
                    icon_img: await r.getUser(post.author.name).icon_img,
                    originalPost: post,
                };

                postsWithIcon_img.push(newPost);
            })
        );

        res.status(200).send(postsWithIcon_img);
    }
    res.end();
};

// void Snoowrap.fromApplicationOnlyAuth({
//     userAgent: 'My app',
//     clientId: 'Tmkg5W551ffqPxozPiiY-Q',
//     deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
//     grantType: 'https://oauth.reddit.com/grants/installed_client',
// }).then(r => {
//     // Now we have a requester that can access reddit through a "user-less" Auth token
//     return r.getHot().then(posts => {
//         // do something with posts from the front page
//     });
// });
