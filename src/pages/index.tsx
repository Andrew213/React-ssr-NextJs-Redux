import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import { providers } from 'next-auth/client';
import { useRouter } from 'next/router';
import useActions from '@/hooks/useActions';
import { GetServerSideProps, NextPage } from 'next';

const Index: NextPage = () => {
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
export const getServerSideProps: GetServerSideProps = async ctx => {
    if (ctx.query.error) {
        return {
            redirect: {
                permanent: false,
                destination: process.env.NEXTAUTH_URL,
            },
        };
    }
    return {
        props: { postsData: null },
    };
};
