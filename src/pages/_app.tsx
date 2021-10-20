import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { tokenContext } from '@/hooks/userContext';
import { useCookies } from 'react-cookie';
import { parseCookie } from '@/utils/cookie';

import '@styles/global.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [cookies] = useCookies();

    return (
        <CookiesProvider>
            <tokenContext.Provider value={cookies.access_token}>
                <Component {...pageProps} />
            </tokenContext.Provider>
        </CookiesProvider>
    );
};

export default MyApp;
