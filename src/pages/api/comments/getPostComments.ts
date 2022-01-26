import { NextApiRequest, NextApiResponse } from 'next';
import CommentType, { replyI } from '@/interfaces/Comment';
import { getSession, session } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Comment } from 'snoowrap';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, body } = req;

    try {
        const session = await getSession({ req });
        const access_token = req.cookies.token;

        let r: Snoowrap | null = null;

        r = snoowConf(access_token);

        const foo = await r.getSubmission('s9uyqx').comments.map(cm => cm.body);
        // console.log(foo);

        // if (session) {
        //     r = snoowConf(session.accessToken as string, session.refreshToken as string);
        // }

        // let r;

        // if (session) {
        //     r = snoowConf(session.accessToken as string, session.refreshToken as string);
        // }
        // const commArr: CommentType[] = [];

        // const images: replyI[] = [];

        // let i = 0;

        // const getReplieImg = async (replieArr: Listing<Comment>) => {
        //     await Promise.all(
        //         await replieArr.map(async rep => {
        //             if (rep.author.name !== '[deleted]') {
        //                 const repImg = await rep.author.icon_img;
        //                 const replObj: replyI = {
        //                     authorImg: repImg,
        //                     author: rep.author.name,
        //                 };
        //                 images.push(replObj);
        //                 i++;
        //                 if (rep.replies.length > 0) {
        //                     void getReplieImg(rep.replies);
        //                 }
        //             }
        //         })
        //     );
        //     return images;
        // };

        // const transformReplies = async (replies: Listing<Comment>) => {
        //     const replyArr: CommentType[] = [];
        //     await Promise.all(
        //         replies.map(async (rep, index) => {
        //             if (body.repliesCount >= index) {
        //                 if (rep.author.name !== '[deleted]') {
        //                     const repObj: CommentType = {
        //                         author: rep.author.name,
        //                         authorImage: await rep.author.icon_img,
        //                         body: rep.body,
        //                         score: rep.score,
        //                         id: rep.id,
        //                         created: rep.created,
        //                         replies: await transformReplies(rep.replies),
        //                     };
        //                     replyArr.push(repObj);
        //                 }
        //             }
        //         })
        //     );
        //     return replyArr;
        // };

        // await Promise.all(
        //     await r.getSubmission(body.postId).comments.filter(async (cmt, i) => {
        //         if (body.commentsCount >= i) {
        //             if (cmt.author.name !== '[deleted]') {
        //                 const repObj: CommentType = {};
        //                 repObj.author = cmt.author.name;
        //                 repObj.body = cmt.body;
        //                 repObj.score = cmt.score;
        //                 repObj.id = cmt.id;
        //                 repObj.authorImage = await cmt.author.icon_img;
        //                 repObj.subreddit = cmt.subreddit.name;
        //                 repObj.created = cmt.created;
        //                 repObj.replies = await transformReplies(cmt.replies);
        //                 // if (cmt.replies.length > 0) repObj.repliesImg = await getReplieImg(cmt.replies);
        //                 commArr.push(repObj);
        //             }
        //         }
        //     })
        // );

        // const comments = await r.getSubmission('qttqsy').comments.map(cm => cm.body);

        // res.status(200).send(JSON.stringify(comments));
    } catch (err) {
        throw new Error(err);
    }
};
