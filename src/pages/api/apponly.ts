import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, session } from 'next-auth/client';
import snoowConf from '@/utils/snow';
import Snoowrap, { Listing, Comment } from 'snoowrap';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    res.end();
};
