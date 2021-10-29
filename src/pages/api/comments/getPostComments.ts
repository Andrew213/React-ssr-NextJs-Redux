import axios from 'axios';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { CommentType } from '@/components/CardList/Card/Card';
import { getSession } from 'next-auth/client';
import snoowrap, { Comment, Listing } from 'snoowrap';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession({ req });
        const r = new snoowrap({
            userAgent: 'userAgent',
            clientId: 'KBEdM37DYRW4ukBWhT-wdQ',
            clientSecret: 'sNGEj6X7Uxevyrbf8nuvVTfXVHx22g',
            refreshToken: session.refreshToken as string,
        });
        // const asd = await Promise.all(
        //     await r.getSubmission('4fuq26').comments.map(async (comm, i) => {
        //         const replArr: CommentType[] = [];

        //         await r
        //             .getComment(comm.id)
        //             .replies.fetchMore({ amount: 5 })
        //             .forEach(replie => {
        //                 const repObj: CommentType = {};

        //                 repObj.body = replie.body;
        //                 repObj.author = replie.author.name;
        //                 repObj.id = replie.id;
        //                 repObj.subreddit = replie.subreddit.name;
        //                 repObj.created = replie.created;

        //                 replArr.push(repObj);
        //             });

        //         const returnObj: CommentType = await {
        //             body: comm.body,
        //             author: comm.author.name,
        //             id: comm.id,
        //             subreddit: comm.subreddit.name,
        //             created: comm.created,
        //             replies: replArr,
        //         };

        //         return returnObj;
        //     })
        // );

        // res.send(JSON.stringify(zaebalo));
    } catch (err) {
        console.log(`error ${err}`);
    }
};
