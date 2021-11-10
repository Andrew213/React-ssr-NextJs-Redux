import React from 'react';
import Loader from 'react-loader-spinner';
import { declOfNum, formatUnixDate } from '@/utils';
import PostType from '@/interfaces/PostType';
import { useSession } from 'next-auth/client';
import useWindowSize from '@/hooks/useWindowSize';
import Card from './Card/Card';

import styles from './styles.module.scss';

const ARR_HOUR = ['час', 'часа', 'часов'];

type CardListProps = {
    postsArr?: PostType[];
};

const CardList: React.FC<CardListProps> = ({ postsArr }) => {
    const [session, load] = useSession();
    // console.log(
    //     `post arr `,
    //     postsArr.map(post => post.title)
    // );
    const { width, height } = useWindowSize();

    if (load) {
        return (
            <div className={styles.load}>
                <Loader type="Circles" color="#cc6633" height={100} width={100} timeout={30000} />
            </div>
        );
    }

    return (
        session &&
        postsArr && (
            <>
                <div className={styles.cardList}>
                    <ul>
                        {postsArr.map((post: PostType, i) => {
                            const created = formatUnixDate(post.created);
                            const pubTime = `${width > 460 ? 'опубликованно' : ''} ${created} ${declOfNum(
                                created,
                                ARR_HOUR
                            )} назад`;

                            return (
                                <Card
                                    author={post.author}
                                    created={pubTime}
                                    // thumbnail_height={post.thumbnail_height}
                                    // thumbnail_width={post.thumbnail_width}
                                    score={post.score}
                                    key={post.id}
                                    id={`${post.id}`}
                                    title={post.title}
                                    contentImg_Height={post.contentImg_Height}
                                    contentImg_Width={post.contentImg_Width}
                                    thumbnail={post.thumbnail}
                                    content={post.content}
                                    permalink={post.permalink}
                                    description={post.description}
                                />
                            );
                        })}
                    </ul>
                </div>
            </>
        )
    );
};

export default CardList;
