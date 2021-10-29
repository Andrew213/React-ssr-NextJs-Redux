import React, { useCallback, useEffect, useRef } from 'react';
import Typography from '@/lib/Typography/Typography';
import Image from 'next/image';
import Karma from '../CardList/Card/Karma/Karma';
import bannerImg2 from '@img/banner.jpg';
import CommentsForm from './Comment/CommentForm/CommentForm';
import Comment from './Comment/Comment';
import User_info from '../CardList/Card/User_info/User_info';
import Portal from '@/lib/Portal/Portal';
import List from '@/lib/List/List';
import { dropDownList } from '@/utils/dropDownList';
import { CommentType } from '../CardList/Card/Card';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { PostType } from '@/pages';

import styles from './styles.module.scss';

interface PostProps extends PostType {
    onClose?: () => void;
    className?: string;
    comments?: CommentType[];
    triggerNode?: React.RefObject<HTMLButtonElement>;
}

const Post: React.FC<PostProps> = ({
    triggerNode,
    title,
    author,
    created,
    authorAvatar,
    thumbnail_height,
    thumbnail_width,
    comments,
    subreddit,
    onClose,
    className,
    bannerImg,
}) => {
    const router = useRouter();

    const getAnswer = useCallback((value: string) => {
        console.log(value);
    }, []);

    const handleCommentChange = useCallback((value: string) => {
        switch (value) {
            case 'Answer':
                getAnswer(value);
                break;
        }
    }, []);

    const postRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerBtn = triggerNode.current.children[0];
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && e.target !== triggerBtn && !postRef.current?.contains(e.target)) {
                onClose();
                void router.push(`/`, undefined, { shallow: true });
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <Portal className={className}>
            <div className={styles.post} ref={postRef}>
                <div className={styles.post__header}>
                    <Karma />
                    <User_info
                        className={styles.post__userInfo}
                        subreddit={subreddit}
                        author={author}
                        created={created}
                        authorAvatar={authorAvatar}
                    />
                </div>
                <Typography As="p" className={styles.post__text} size={28} weight={400}>
                    {title}
                </Typography>
                <div className={styles.post__imgWrapper}>
                    <Image
                        src={bannerImg ? bannerImg : bannerImg2}
                        width={thumbnail_width * 3}
                        height={thumbnail_height * 3}
                        quality={100}
                        className={styles.post__bannerImg}
                    />
                </div>

                <div className={styles.post__control}>
                    {dropDownList.map((el, i) => {
                        if (el.id === 'Close') {
                            delete dropDownList[i];
                        }
                        return (
                            <List
                                id={el.id}
                                key={el.id}
                                As={el.As}
                                text={el.text}
                                className={styles.listItem}
                                liIcon={el.liIcon}
                            />
                        );
                    })}
                </div>
                {comments.length > 0 ? (
                    <>
                        <CommentsForm author={author} />
                        {comments.map((comment, i) => {
                            console.log(comment);
                            return (
                                <Comment
                                    key={i}
                                    replies={comment.replies}
                                    onChange={handleCommentChange}
                                    author={comment.author}
                                    published={comment.created}
                                    body={comment.body}
                                    subreddit={comment.subreddit}
                                />
                            );
                        })}
                    </>
                ) : (
                    <div className={styles.post__load}>
                        <Loader type="Circles" color="#cc6633" height={50} width={50} timeout={30000} />
                    </div>
                )}
            </div>
            )
        </Portal>
    );
};

export default Post;
