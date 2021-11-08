import React from 'react';
import Loader from 'react-loader-spinner';
import { declOfNum, formatUnixDate } from '@/utils';
import { useSession } from 'next-auth/client';
import { PostType } from '@/pages';
import useWindowSize from '@/hooks/useWindowSize';
import Card from './Card/Card';

import styles from './styles.module.scss';
import Counter from '../Counter/Counter';

const ARR_HOUR = ['час', 'часа', 'часов'];

type CardListProps = {
    postsArr?: PostType[];
};

const CardList: React.FC<CardListProps> = ({ postsArr }) => {
    const [session, load] = useSession();

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
                        {postsArr.map((post: PostType) => {
                            const created = formatUnixDate(post.created);
                            const pubTime = `${width > 460 ? 'опубликованно' : ''} ${created} ${declOfNum(
                                created,
                                ARR_HOUR
                            )} назад`;
                            const thumb =
                                post.thumbnail !== 'self' &&
                                post.thumbnail !== 'nsfw' &&
                                post.thumbnail !== 'default' &&
                                post.thumbnail;
                            return (
                                <Card
                                    author={post.author}
                                    authorAvatar={post.authorAvatar}
                                    created={pubTime}
                                    thumbnail_height={post.thumbnail_height}
                                    thumbnail_width={post.thumbnail_width}
                                    score={post.score}
                                    key={post.id}
                                    id={`${post.id}`}
                                    title={post.title}
                                    thumbnail={thumb}
                                    bannerImg={post.bannerImg}
                                    permalink={post.permalink}
                                    description={post.description}
                                    headerImg={post.headerImg}
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
