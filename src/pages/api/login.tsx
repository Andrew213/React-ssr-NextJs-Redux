import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('access_token', req.body.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
            sameSite: true,
            path: '/',
        })
    );
    res.statusCode = 200;
    res.json({ succes: true });
};
