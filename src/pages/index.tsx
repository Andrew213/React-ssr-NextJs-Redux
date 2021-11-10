import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import PostType, { authorT, ContentT } from '@/interfaces/PostType';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import snoowrap, { Submission } from 'snoowrap';

export const snoowrapR = (accessToken: string, refreshToken: string) => {
    return new snoowrap({
        userAgent: 'snoowrap clone by A.Kochanov',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
        refreshToken,
    });
};

const Index: NextPage<Record<string, PostType[] | Submission | string>> = ({ postsData }) => {
    // console.log(JSON.parse(postsData));
    return (
        <MainLayout>
            <CardList postsArr={JSON.parse(postsData as string)} />
            {/* <CardList postsArr={null} /> */}
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const session = await getSession(ctx);

    if (session) {
        const r = snoowrapR(session.accessToken as string, session.refreshToken as string);

        const postsArr: PostType[] = [];

        const topPosts = await r.getTop('webdev', { limit: 10 });

        for (const post of await topPosts.fetchMore({ amount: 0 })) {
            const newPost: PostType = {};
            const newPostAuthor: authorT = {};
            if (post.selftext_html !== null) {
                newPost.description = post.selftext_html;
            } else {
                newPost.description = post.url;
            }
            newPostAuthor.name = post.author.name;
            newPost.created = post.created_utc;
            newPost.commentsCount = post.num_comments;
            newPost.title = post.title;
            newPost.score = post.score;
            newPost.id = post.id;
            newPost.subreddit = post.subreddit.name;
            newPostAuthor.icon_img = await post.author.icon_img;
            newPost.author = newPostAuthor;

            if (post.post_hint !== null) {
                const newContent: ContentT = { type: '', data: '' };
                switch (post.post_hint) {
                    case 'image':
                        newContent.type = 'image';
                        newContent.data = post.preview.images[0].source.url;
                        newPost.content = newContent;
                        newPost.contentImg_Height = post.preview.images[0].source.height;
                        newPost.contentImg_Width = post.preview.images[0].source.width;
                        newPost.thumbnail = post.thumbnail;
                        break;
                    case 'hosted:video':
                        newContent.type = 'video';
                        newContent.data = post.secure_media.reddit_video.hls_url;
                        newPost.content = newContent;
                        newPost.thumbnail = post.thumbnail;
                        break;
                }
            }

            postsArr.push(newPost);
        }

        return {
            props: { postsData: JSON.stringify(postsArr) },
        };
    }

    return {
        props: { postsData: null },
    };
};

export default Index;
