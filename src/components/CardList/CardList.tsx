import React from 'react';
import Loader from 'react-loader-spinner';
import PostType from '@/interfaces/PostType';
import { useSession } from 'next-auth/client';
import useActions from '@/hooks/useActions';
import Card from './Card/Card';
import { useTypedSelector } from '@/hooks/useTapedSelector';

import styles from './styles.module.scss';

type CardListProps = {
    postsArr?: PostType[];
};

const CardList: React.FC<CardListProps> = () => {
    const [session, load] = useSession();
    const { FetchPosts } = useActions();
    // const router = useRouter();
    const { posts } = useTypedSelector(state => state);

    // TO-DO: УБРАТЬ ВСЕ ИЗ ЗАВИСИМОСТЕЙ, ПРОВЕРИТЬ НА ПЕРВУЮ ЗАГРУЗКУ ПОСТОВ БЕЗ ТОКЕНА
    React.useEffect(() => {
        // Принимает 3 параметра: 1-subreddit, 2-sortmod, 3-time

        FetchPosts('cryptocurrency');
    }, []);

    const bottomOfListRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    console.log('load more');
                }
            },
            { rootMargin: '1000px' }
        );

        if (bottomOfListRef.current) {
            observer.observe(bottomOfListRef.current);
        }

        return () => {
            if (bottomOfListRef.current) {
                observer.unobserve(bottomOfListRef.current);
            }
        };
    }, [bottomOfListRef.current]);

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
            <div ref={bottomOfListRef} />
        </>
    );
};

export default CardList;
