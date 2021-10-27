import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const Post: NextPage = () => {
    const router = useRouter();
    return (
        <MainLayout>
            <h1>we</h1>
            {/* <CardList /> */}
        </MainLayout>
    );
};

export default Post;
