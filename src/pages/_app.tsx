import { ReactElement, useState } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { tokenContext } from '@/hooks/userContext';
import { useCookies } from 'react-cookie';
import { Session } from 'next-auth';
import { commentContext } from '@/hooks/commentContext';
import { getSession, GetSessionOptions, Provider as SessionProvider } from 'next-auth/client';

import '@styles/global.scss';

interface AppType extends AppProps {
    session: Session;
}

const MyApp = ({ Component, pageProps, session }: AppType): ReactElement => {
    const [cookies] = useCookies();
    const [commentValue, setCommentValue] = useState('');

    const CommentProvider = commentContext.Provider;

    return (
        <CookiesProvider>
            <SessionProvider session={session} options={{ baseUrl: process.env.NEXTAUTH_URL }}>
                <CommentProvider value={{ value: commentValue, onChange: setCommentValue }}>
                    <tokenContext.Provider value={cookies.access_token}>
                        <Component {...pageProps} />
                    </tokenContext.Provider>
                </CommentProvider>
            </SessionProvider>
        </CookiesProvider>
    );
};

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);
    const session = await getSession(context as GetSessionOptions);

    return {
        ...appProps,
        session,
    };
};

export default MyApp;
