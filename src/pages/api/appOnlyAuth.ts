import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Snoowrap, { Listing, Comment, Submission } from 'snoowrap';

type PostFetchedT = {
    data?: Submission;
    icon_img?: string;
    comments?: Comment[];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        const basicAuth = Buffer.from(`${process.env.APP_ONLY_ID}:`).toString('base64');

        // .com/api/v1/
        try {
            const resp = await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=https://oauth.reddit.com/grants/installed_client&device_id=DO_NOT_TRACK_THIS_DEVICE`,
            });
            const json = await resp.json();
            if (json.access_token) {
                res.setHeader(
                    'Set-Cookie',
                    serialize('token_appOnly', json.access_token, { path: '/', sameSite: true, secure: true })
                );

                res.end();
            } else {
                throw new Error();
            }
        } catch (err) {
            res.status(500).json({ error: 'failed to fetch data' });
            // throw new Error(err.massage);
        }
    }
};
