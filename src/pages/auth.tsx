import CardsList from '@/components/CardsList/CardList';
import Content from '@/components/Content/Content';
import MainLayout from '@/components/MainLayout';
import PostsContextProvider from '@/hooks/postsContext';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

interface AuthI {
    token: string | undefined;
}

const Auth: NextPage<AuthI> = ({ token }) => {
    return (
        <MainLayout token={token}>
            <PostsContextProvider>
                {/* <Content> */}
                <CardsList />
                {/* </Content> */}
            </PostsContextProvider>
        </MainLayout>
    );
};

const basicAuth = Buffer.from(`${process.env.USER_ID}:sNGEj6X7Uxevyrbf8nuvVTfXVHx22g`).toString('base64');

export const getServerSideProps: GetServerSideProps = async ctx => {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + basicAuth,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${ctx.query.code}&redirect_uri=http://localhost:8080/auth`,
    });
    const token = await response.json();
    return {
        props: { token: token.access_token ? token.access_token : false },
    };
};

export default Auth;
