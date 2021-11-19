import { NextApiRequest, NextApiResponse } from 'next';
import CommentType, { replyI } from '@/interfaces/Comment';
import { getSession, session } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Comment } from 'snoowrap';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    let r: Snoowrap | null = null;

    if (session) {
        r = snoowConf(session.accessToken as string, session.refreshToken as string);
        const posts = await r.getHot('webdev');
        res.status(200).send(JSON.stringify(posts));
    }
    res.end();
};
