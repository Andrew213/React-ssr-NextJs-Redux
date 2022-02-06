import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

type setRefreshTokenArgs = {
    cookies: Cookies;
    refresh_token: string;
};

// const setRefreshCookie = ({ cookies, refresh_token }: setRefreshTokenArgs) => {
//     const date = new Date();
//     const time = date.getTime();
//     const expireTime = time + 24 * 60 * 80 * 1000 * 30; //30 days
//     date.setTime(expireTime);

//     cookies.set(`refresh_token`, refresh_token, {
//         sameSite: 'strict',
//         overwrite: true,
//         expires: date,
//         httpOnly: true,
//     });
// };

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req, res);
    const basicAuth = Buffer.from(`${process.env.APP_ONLY_ID}:`).toString('base64');

    return NextAuth(req, res, {
        providers: [
            Providers.Reddit({
                id: 'reddit',
                name: 'Reddit',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                scope: 'read submit identity edit vote subscribe modconfig',
                type: 'oauth',
                version: '2.0',
                params: { grant_type: 'authorization_code' },
                accessTokenUrl: 'https://www.reddit.com/api/v1/access_token',
                authorizationUrl: 'https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent',
                profileUrl: 'https://oauth.reddit.com/api/v1/me',
                profile: profile => {
                    return {
                        id: profile.id as string,
                        name: profile.name,
                        image: profile.icon_img as string,
                    };
                },
            }),
        ],
        pages: {
            error: `/`,
        },
        callbacks: {
            // eslint-disable-next-line @typescript-eslint/require-await
            async session(session, token) {
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                return session;
            },
            // eslint-disable-next-line @typescript-eslint/require-await
            async jwt(token, user, account, profile) {
                if (account && user) {
                    token.accessToken = account.access_token;
                    token.refreshToken = account.refresh_token;
                    // setRefreshCookie({ cookies, refresh_token: account.refresh_token });
                    // cookies.set('token_auth', account.access_token, {
                    //     sameSite: 'strict',
                    //     overwrite: true,
                    //     expires: account.accessTokenExpires,
                    //     httpOnly: true,
                    // });
                }
                return token;
            },
        },
        // debug: true,
    });
};

export default Auth;
