import { NextApiRequest, NextApiResponse } from 'next';
import CommentType, { replyI } from '@/interfaces/Comment';
import { getSession, session } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Comment, Submission } from 'snoowrap';

type PostFetchedT = {
    data?: Submission;
    icon_img?: string;
    comments?: Comment[];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    let r: Snoowrap | null = null;

    if (session) {
        r = snoowConf(session.accessToken as string, session.refreshToken as string);

        const posts = await r.getHot('webdev');

        res.status(200).send(JSON.stringify(posts));
    } else {
        const posts: PostFetchedT[] = [];

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

        const postsFetched: Submission[] = await r.getHot('');

        await Promise.all(
            postsFetched.map(async (post: Submission) => {
                const newPost: PostFetchedT = {
                    data: post,
                    icon_img: await r.getUser(post.author.name).icon_img,
                };

                posts.push(newPost);
            })
        );

        res.status(200).send(posts);
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
