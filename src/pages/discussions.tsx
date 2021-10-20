import MainLayout from '@/components/MainLayout/MainLayout';
import { NextPage, GetServerSideProps } from 'next';
import cookie from 'cookie';
import CardList from '@/components/CardList/CardList';
import { postsContext, PostsContextProvider } from '@/hooks/postsContext';
import { useCookies } from 'react-cookie';
import React, { useEffect } from 'react';
import Link from 'next/link';
s;

type DiscussionsProps = {
    token: string | undefined;
};

const Discussions: NextPage<DiscussionsProps> = ({ token }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_tokend']);

    useEffect(() => {
        setCookie('access_tokend', JSON.stringify(token), {
            path: '/',
            maxAge: 3600,
            sameSite: true,
        });
    }, [token]);

    return (
        <MainLayout token={token && token}>
            <PostsContextProvider>
                <Link href={'./'}>
                    <h1>Back</h1>
                </Link>
                <CardList />
            </PostsContextProvider>
        </MainLayout>
    );
};

const basicAuth = Buffer.from(`${process.env.USER_ID}:sNGEj6X7Uxevyrbf8nuvVTfXVHx22g`).toString('base64');

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + basicAuth,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${query.code}&redirect_uri=http://localhost:8080/discussions`,
    });

    const tk = await response.json();
    return {
        props: { token: tk.access_token || false },
    };
};

export default Discussions;
