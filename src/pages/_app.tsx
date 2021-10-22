import { useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { tokenContext } from '@/hooks/userContext';
import { useCookies } from 'react-cookie';
import { commentContext } from '@/hooks/commentContext';

import '@styles/global.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [cookies] = useCookies();
    const [commentValue, setCommentValue] = useState('');

    const CommentProvider = commentContext.Provider;

    return (
        <CookiesProvider>
            <CommentProvider value={{ value: commentValue, onChange: setCommentValue }}>
                <tokenContext.Provider value={cookies.access_token}>
                    <Component {...pageProps} />
                </tokenContext.Provider>
            </CommentProvider>
        </CookiesProvider>
    );
};

export default MyApp;
