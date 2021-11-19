import Snoowrap from 'snoowrap';
import snoowrap from 'snoowrap';

const snoowConf = (accessToken?: string, refreshToken?: string): Snoowrap => {
    return new snoowrap({
        userAgent: 'snoowrap clone by A.Kochanov',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
        refreshToken,
    });
};

export default snoowConf;
