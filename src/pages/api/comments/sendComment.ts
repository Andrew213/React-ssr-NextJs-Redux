import axios from 'axios';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { CommentType, replyI } from '@/components/CardList/Card/Card';
import { getSession, session } from 'next-auth/client';
import { snoowrapR } from '@/pages';
import { Listing, Comment } from 'snoowrap';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, body } = req;

    const session = await getSession({ req });
    try {
        const r = snoowrapR(session.accessToken as string, session.refreshToken as string);

        if (body.commentData.commentId) {
            const comment = await r.getComment(body.commentData.commentId).reply(body.commentData.text);
            res.send(JSON.stringify(comment));
        } else {
            const comment = await r.getSubmission(body.postId).reply(body.commentData.text);
            res.send(JSON.stringify(comment));
        }
    } catch (err) {
        console.log(`error: ${err}`);
    }
};
