import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';
import { getSession, useSession } from 'next-auth/client';
import snoowrap from 'snoowrap';

export interface PostType {
    author?: string;
    created?: string | number;
    id?: string;
    permalink?: string;
    bannerImg?: string;
    thumbnail_height?: number;
    thumbnail_width?: number;
    headerImg?: string;
    description?: string;
    thumbnail?: string;
    title?: string;
    authorAvatar?: string;
    subreddit?: string;
}

const Index: NextPage<Record<string, PostType[]>> = ({ postsData, topPosts }) => {
    return (
        <MainLayout>
            <CardList postsArr={postsData} />
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const session = await getSession(ctx);

    if (session) {
        const r = new snoowrap({
            userAgent: ctx.req.headers['user-agent'],
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: session.refreshToken as string,
            accessToken: session.accessToken as string,
        });

        const top = await Promise.all(
            (await r.getTop('', { limit: 5, show: 'all' })).map(async post => {
                const postObj: PostType = {
                    title: post.title,
                    thumbnail: post.thumbnail,
                    thumbnail_height: post.thumbnail_height,
                    thumbnail_width: post.thumbnail_width,
                    authorAvatar: await post.author.icon_img,
                    author: post.author.name,
                    id: post.id,
                    permalink: post.permalink,
                    created: post.created,
                };
                // const postImg = post.author.toJSON();
                return postObj;
            })
        );

        // const tops = (await r.getTop('', { limit: 2, show: 'all' })).map(post => post.id);
        // const top = await r.getSubmission('qhtlsp').author.icon_img;
        // const top = await Promise.all(
        //     tops.map(async postId => {
        //         const post = await r.getSubmission(postId).author.icon_img;
        //         return post;
        //     })
        // );
        // const users = await top.map(post => post.author.name);

        // const resp = await fetch('https://oauth.reddit.com/best.json?sr_detail=true', {
        //     headers: {
        //         Authorization: `bearer ${session.accessToken}`,
        //     },
        // });
        // const postsData = await resp.json();
        // postsData.data.children.forEach((el: Record<string, any>) => {
        //     const post = el.data;
        //     const postObj: PostType = {
        //         author: post.author,
        //         created: post.created,
        //         id: post.id,
        //         permalink: post.permalink,
        //         bannerImg: post.sr_detail.banner_img,
        //         headerImg: post.sr_detail.header_img,
        //         authorAvatar: post.sr_detail.icon_img,
        //         title: post.sr_detail.title,
        //         description: post.sr_detail.public_description,
        //         thumbnail: post.thumbnail,
        //         subreddit: post.subreddit,
        //     };
        //     postsArr.push(postObj);
        // });
        // return {
        //     props: { postsData: postsArr },
        // };
        return {
            props: { postsData: top, topPosts: top },
        };
    }

    return {
        props: { postsData: null },
    };
};

export default Index;
