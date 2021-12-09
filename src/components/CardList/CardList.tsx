import React from 'react';
import Loader from 'react-loader-spinner';
import { declOfNum, formatUnixDate } from '@/utils';
import PostType from '@/interfaces/PostType';
import { useSession } from 'next-auth/client';
import useWindowSize from '@/hooks/useWindowSize';
import useActions from '@/hooks/useActions';
import Card from './Card/Card';
import { useTypedSelector } from '@/hooks/useTapedSelector';
import { PostsState } from '@/state/posts/PostState';

import styles from './styles.module.scss';

const ARR_HOUR = ['час', 'часа', 'часов'];

type CardListProps = {
    postsArr?: PostType[];
};

const CardList: React.FC<CardListProps> = () => {
    const [session, load] = useSession();
    const { FetchPosts } = useActions();
    const { posts } = useTypedSelector(state => state);

    React.useEffect(() => {
        // Принимает 3 параметра: 1-subreddit, 2-sortmod, 3-time
        FetchPosts();
    }, []);

    const { width, height } = useWindowSize();

    if (posts.isLoading) {
        return (
            <div className={styles.load}>
                <Loader type="Circles" color="#cc6633" height={100} width={100} />
            </div>
        );
    }

    // const switchPosts = post => {
    //     // console.log(post, ' ', post.data.);
    //     if (post.data.content.type === 'Image') {
    //         console.log(post);
    //         // console.log(post.authorName);
    //         // console.log(post.originalPost);
    //     }
    // };

    return (
        <>
            <ul className={styles.cardList}>
                {posts &&
                    posts.posts.map(post => {
                        const { data, icon_img } = post;
                        // switchPosts(post);
                        console.log(post);
                        return (
                            <Card
                                key={data.id}
                                authorName={data.authorName}
                                title={data.title}
                                authorAvatar={icon_img}
                                score={data.score}
                                created={data.created}
                                content={data.content}
                                content_size={data.content_size}
                                commentsCount={data.commentsCount}
                            />
                        );
                    })}
            </ul>
        </>
        // session &&
        // postsArr && (
        //   <>
        //     <div className={styles.cardList}>
        //       <ul>
        //         {postsArr.map((post: PostType, i) => {
        //           const created = formatUnixDate(post.created);
        //           const pubTime = `${
        //             width > 460 ? "опубликованно" : ""
        //           } ${created} ${declOfNum(created, ARR_HOUR)} назад`;

        //           return (
        //             <Card
        //               author={post.author}
        //               created={pubTime}
        //               // thumbnail_height={post.thumbnail_height}
        //               // thumbnail_width={post.thumbnail_width}
        //               score={post.score}
        //               key={post.id}
        //               id={`${post.id}`}
        //               title={post.title}
        //               contentImg_Height={post.contentImg_Height}
        //               contentImg_Width={post.contentImg_Width}
        //               thumbnail={post.thumbnail}
        //               content={post.content}
        //               permalink={post.permalink}
        //               description={post.description}
        //             />
        //           );
        //         })}
        //       </ul>
        //     </div>
        //   </>
        // )
    );
};

export default CardList;
