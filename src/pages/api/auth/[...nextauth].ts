import NextAuth from 'next-auth';

export default NextAuth({
    providers: [
        {
            id: 'reddit',
            name: 'Reddit',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            scope: 'read submit identity',
            type: 'oauth',
            version: '2.0',
            params: { grant_type: 'authorization_code' },
            accessTokenUrl: 'https://www.reddit.com/api/v1/access_token',
            authorizationUrl: 'https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent',
            profileUrl: 'https://oauth.reddit.com/api/v1/me?raw_json=1',
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
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },

        // eslint-disable-next-line @typescript-eslint/require-await
        async session(session, token) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
