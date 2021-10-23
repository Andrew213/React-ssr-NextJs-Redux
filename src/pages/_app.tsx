import { useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { tokenContext } from '@/hooks/userContext';
import { useCookies } from 'react-cookie';
// import { SessionProvider } from 'next-auth/react';
import { commentContext } from '@/hooks/commentContext';

import '@styles/global.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [cookies] = useCookies();
    const [commentValue, setCommentValue] = useState('');

    const CommentProvider = commentContext.Provider;

    return (
        // <SessionProvider>
        <CookiesProvider>
            <CommentProvider value={{ value: commentValue, onChange: setCommentValue }}>
                <tokenContext.Provider value={cookies.access_token}>
                    <Component {...pageProps} />
                </tokenContext.Provider>
            </CommentProvider>
        </CookiesProvider>
        // </SessionProvider>
    );
};

export default MyApp;
