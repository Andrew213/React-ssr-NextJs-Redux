import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import snoowrap from 'snoowrap';

export interface PostType {
    author?: string;
    created?: string | number;
    id?: string;
    permalink?: string;
    bannerImg?: string;
    thumbnail_height?: number;
    score?: number;
    thumbnail_width?: number;
    headerImg?: string;
    description?: string;
    thumbnail?: string;
    title?: string;
    authorAvatar?: string;
    subreddit?: string;
}

export const snoowrapR = (accessToken: string, refreshToken: string) => {
    return new snoowrap({
        userAgent: 'user-agent',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
        refreshToken,
    });
};

const Index: NextPage<Record<string, PostType[]>> = ({ postsData }) => {
    return (
        <MainLayout>
            <CardList postsArr={postsData} />
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const session = await getSession(ctx);

    if (session) {
        const r = snoowrapR(session.accessToken as string, session.refreshToken as string);
        const postsArr: PostType[] = [];
        const top = await Promise.all(
            (await r.getTop('webdev', { limit: 10 })).map(async post => {
                if ((await post.thumbnail) !== 'self') {
                    const postObj: PostType = {
                        title: post.title,
                        score: post.score,
                        thumbnail: post.thumbnail,
                        thumbnail_height: post.thumbnail_height,
                        thumbnail_width: post.thumbnail_width,
                        author: post.author.name,
                        // authorAvatar: await post.author.icon_img,
                        id: post.id,
                        permalink: post.permalink,
                        created: post.created,
                    };
                    postsArr.push(postObj);
                }
            })
        );

        return {
            props: { postsData: postsArr },
        };
    }

    return {
        props: { postsData: null },
    };
};

export default Index;
