import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import Modal from '@/lib/Modal/Modal';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Index: NextPage = () => {
    const router = useRouter();
    const onModalClose = () => {
        void router.push(
            {
                pathname: `/`,
            },
            undefined,
            // {
            //     pathname: `/post/${id}`,
            // },
            { shallow: true }
        );
    };
    return (
        <>
            <MainLayout>
                <CardList />

                {/* <Modal visible={!!router.query.postId} onCancel={onModalClose}>
                    {'aboba'}
                </Modal> */}
            </MainLayout>
        </>
    );
};

export default Index;

// export const getServerSideProps: GetServerSideProps = async ctx => {
//     const session = await getSession(ctx);

//     // if (session) {
//     //     const r = snoowConf(session.accessToken as string, session.refreshToken as string);

//     //     const postsArr: PostType[] = [];

//     //     const topPosts = await r.getTop('', { limit: 10 });

//     //     for (const post of await topPosts.fetchMore({ amount: 0 })) {
//     //         const newPost: PostType = {};
//     //         const newPostAuthor: authorT = {};
//     //         const newDesc: DescriptionT = {};
//     //         if (post.selftext_html !== null) {
//     //             newDesc.type = 'html';
//     //             newDesc.content = post.selftext_html;
//     //         } else {
//     //             newDesc.type = 'URL';
//     //             newDesc.content = post.url;
//     //         }
//     //         newPostAuthor.name = post.author.name;
//     //         newPost.created = post.created_utc;
//     //         newPost.commentsCount = post.num_comments;
//     //         newPost.title = post.title;
//     //         newPost.score = post.score;
//     //         newPost.id = post.id;
//     //         newPost.subreddit = post.subreddit.name;
//     //         newPostAuthor.icon_img = await post.author.icon_img;
//     //         newPost.author = newPostAuthor;
//     //         newPost.description = newDesc;

//     //         if (post.post_hint !== null) {
//     //             const newContent: ContentT = { type: '', data: '' };
//     //             switch (post.post_hint) {
//     //                 case 'image':
//     //                     newContent.type = 'image';
//     //                     newContent.data = post.url;
//     //                     newPost.content = newContent;
//     //                     newPost.contentImg_Height = post.preview.images[0].source.height;
//     //                     newPost.contentImg_Width = post.preview.images[0].source.width;
//     //                     newPost.thumbnail = post.thumbnail;
//     //                     break;
//     //                 case 'hosted:video':
//     //                     newContent.type = 'video';
//     //                     newContent.data = post.secure_media.reddit_video.hls_url;
//     //                     newPost.content = newContent;
//     //                     newPost.thumbnail = post.thumbnail;
//     //                     break;
//     //             }
//     //         }

//     //         postsArr.push(newPost);
//     //     }
//     //     return {
//     //         props: { postsData: JSON.stringify(postsArr) },
//     //     };
//     // }

//     return {
//         props: { postsData: null },
//     };
// };
