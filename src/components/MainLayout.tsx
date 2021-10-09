import React from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import { tokenContext } from '@/hooks/tokenContext';
import UserContextProvider from '@/hooks/userContext';

import style from './layout.module.scss';

type MainLayoutP = {
    children?: React.ReactNode;
    title?: string;
    token?: string;
};

const MainLayout: React.FC<MainLayoutP> = ({ children, title = 'Blog', token }) => {
    return (
        <tokenContext.Provider value={token}>
            <UserContextProvider>
                <Head>
                    <title>{title}</title>
                    <meta name="keywords" content="next,javascript,nextjs,react" />
                    <meta name="description" content="this is youtube tutorial for next" />
                    <meta charSet="utf-8" />
                </Head>
                <Header className={style.layout} />
                <main className={style.layout}>{children}</main>
            </UserContextProvider>
        </tokenContext.Provider>
    );
};

export default MainLayout;
