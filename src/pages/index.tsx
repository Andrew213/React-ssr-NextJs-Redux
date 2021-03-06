import React from 'react';
import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';

import { NextPage } from 'next';
import useActions from '@/hooks/useActions';

const Index: NextPage = () => {
    const { FetchAuth } = useActions();

    React.useEffect(() => {
        FetchAuth();
    }, []);
    return (
        <>
            <MainLayout>
                <CardList />
            </MainLayout>
        </>
    );
};

export default Index;

// eslint-disable-next-line @typescript-eslint/require-await
// export const getServerSideProps: GetServerSideProps = async ctx => {
//     if (ctx.query.error) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: process.env.NEXTAUTH_URL,
//             },
//         };
//     }
//     return {
//         props: { postsData: null },
//     };
// };
