import React from 'react';
import Loader from 'react-loader-spinner';
import { declOfNum, formatUnixDate } from '@/utils';
import PostType from '@/interfaces/PostType';
import { useSession } from 'next-auth/client';
import useWindowSize from '@/hooks/useWindowSize';
import useActions from '@/hooks/useActions';
import Card from './Card/Card';
import { useTypedSelector } from '@/hooks/useTapedSelector';
import Router, { useRouter } from 'next/router';

import styles from './styles.module.scss';

type CardListProps = {
    postsArr?: PostType[];
};

const CardList: React.FC<CardListProps> = () => {
    const [session, load] = useSession();
    const { FetchPosts } = useActions();
    const router = useRouter();
    const { posts } = useTypedSelector(state => state);

    React.useEffect(() => {
        // Принимает 3 параметра: 1-subreddit, 2-sortmod, 3-time
        FetchPosts('world', 'top');
    }, []);

    // React.useEffect(() => {
    //     void Router.push({
    //         pathname: '/',
    //         query: { keyword: 'this way', amogus: 'abobus' },
    //     });

    //     const query = new URLSearchParams();
    //     // return query.get(name);
    //     console.log(`query`, query);
    // }, []);

    const { width, height } = useWindowSize();

    if (posts.isLoading) {
        return (
            <div className={styles.load}>
                <Loader type="Circles" color="#cc6633" height={100} width={100} />
            </div>
        );
    }

    return (
        <>
            <ul className={styles.cardList}>
                {posts &&
                    posts.posts.map(post => {
                        const { data, icon_img } = post;
                        if (data.authorName === '-HDVinnie-') {
                            console.log(post);
                        }
                        return (
                            <Card
                                authorName={data.authorName}
                                key={data.id}
                                title={data.title}
                                authorAvatar={icon_img}
                                score={data.score}
                                id={data.id}
                                created={data.created}
                                subredditName_display={data.subredditName_prefix}
                                content={data.content}
                                originalPost={data.originalPost}
                                content_size={data.content_size}
                                commentsCount={data.commentsCount}
                            />
                        );
                    })}
            </ul>
        </>
    );
};

export default CardList;
