import React, { useEffect, useState } from 'react';
import { useUserPosts } from '@/hooks/postsContext';
import styles from './styles.module.scss';
import Loader from 'react-loader-spinner';
import nanoid from 'nanoid';
import { declOfNum, formatUnixDate } from '@/utils';
import Card from './Card/Card';

import useWindowSize from '@/hooks/useWindowSize';

const ARR_HOUR = ['час', 'часа', 'часов'];

const CardList: React.FC = () => {
    const [data] = useUserPosts();
    const [postsArr, setPostsArr] = useState([]);
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (data.length) {
            const posts = data[0]?.data?.children;
            const postsArrClone = postsArr.slice();
            posts.forEach((post: any) => {
                if (postsArrClone.length <= 24) {
                    post.id = nanoid(5);
                    postsArrClone.push(post);
                }
            });
            setPostsArr(postsArrClone);
        }
    }, [data]);

    console.log(`data `, postsArr);
    return data.length ? (
        <div className={styles.cardList}>
            <ul>
                {postsArr.map(({ data }, i) => {
                    const detail = data.sr_detail;
                    const created = formatUnixDate(data.created);
                    const pubTime = `${width > 460 ? 'опубликованно' : ''} ${created} ${declOfNum(
                        created,
                        ARR_HOUR
                    )} назад`;
                    const thumb =
                        data.thumbnail !== 'self' &&
                        data.thumbnail !== 'nsfw' &&
                        data.thumbnail !== 'default' &&
                        data.thumbnail;
                    console.log(`thumb `, thumb);
                    return (
                        <Card
                            nicName={data.author}
                            avatar={detail.icon_img}
                            title={detail.title}
                            key={data.id}
                            publicTime={pubTime}
                            thumbnail={thumb}
                        />
                    );
                })}
            </ul>
        </div>
    ) : (
        <div className={styles.load}>
            <Loader type="Circles" color="#cc6633" height={100} width={100} timeout={30000} />
        </div>
    );
};

export default CardList;
