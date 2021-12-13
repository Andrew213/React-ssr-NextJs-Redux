import MainLayout from '@/components/MainLayout/MainLayout';
import { NextPage, GetServerSideProps } from 'next';
import cookie from 'cookie';
import CardList from '@/components/CardList/CardList';
import { useCookies } from 'react-cookie';
import React, { useEffect } from 'react';
import Link from 'next/link';

type DiscussionsProps = {
    token: string | undefined;
};

const Example: NextPage<DiscussionsProps> = () => {
    return <h1>WELCOME!</h1>;
};

// const basicAuth = Buffer.from(`${process.env.USER_ID}:sNGEj6X7Uxevyrbf8nuvVTfXVHx22g`).toString('base64');

// export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
//     const response = await fetch('https://www.reddit.com/api/v1/access_token', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Basic ' + basicAuth,
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `grant_type=authorization_code&code=${query.code}&redirect_uri=http://localhost:8080/discussions`,
//     });

//     const tk = await response.json();
//     return {
//         props: { token: tk.access_token || false },
//     };
// };

export default Example;
