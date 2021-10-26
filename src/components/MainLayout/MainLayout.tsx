import React from 'react';
import Head from 'next/head';
import Header from '../Header/Header';
import { UserContextProvider } from '@/hooks/userContext';
import { withCookies } from 'react-cookie';

import styles from './styles.module.scss';

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
    token?: string | undefined;
};

const MainLayout: React.FC<LayoutProps> = ({ children, title = 'Blog', token }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content="next,javascript,nextjs,react" />
                <meta name="description" content="some description" />
                <meta charSet="utf-8" />
            </Head>
            {/* <UserContextProvider> */}
            <Header className={styles.layout} />
            <main className={styles.layout}>{children}</main>
            {/* </UserContextProvider> */}
        </>
    );
};

export default withCookies(MainLayout);
