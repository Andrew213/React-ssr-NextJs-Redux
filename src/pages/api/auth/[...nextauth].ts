import NextAuth from 'next-auth';

export default NextAuth({
    providers: [
        {
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
        },
    ],

    callbacks: {
        // eslint-disable-next-line @typescript-eslint/require-await
        async jwt(token, user, account, profile) {
            if (account && user) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token;
        },

        // eslint-disable-next-line @typescript-eslint/require-await
        async session(session, token) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
    },
});
