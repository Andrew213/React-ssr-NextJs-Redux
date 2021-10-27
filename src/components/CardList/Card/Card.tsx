import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pic from '@img/pic.jpg';
import viewed from '@img/icons/viewed.svg';
import { CSSTransition } from 'react-transition-group';
import Typography from '@/lib/Typography/Typography';
import DropDown from '@/lib/DropDown/DropDown';
import List from '@/lib/List/List';
import Karma from './Karma/Karma';
import Icon from '@/lib/Icon/Icon';
import useWindowSize from '@/hooks/useWindowSize';
import CardControlMobile from './CardControlMobile/CardControlMobile';
import Link from 'next/link';
import User_info from './User_info/User_info';
import { dropDownList } from '@/utils/dropDownList';
import Post from '@/components/Post/Post';
import { useRouter } from 'next/router';
import { PostType } from '@/pages';

import styles from './styles.module.scss';

// type CardProps = {
//     author?: string;
//     title?: string;
//     subreddit?: string;
//     created?: string;
//     thumbnail?: string;
//     authorAvatar?: string;
//     onPostClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
//     isPostOpen?: boolean;
//     bannerImg?: string;
//     permalink?: string;
// };

interface CardProps extends PostType {
    onPostClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPostOpen?: boolean;
}

export type CommentType = {
    author?: string;
    body?: string;
    created?: number;
};

const Card: React.FC<CardProps> = ({
    subreddit,
    author,
    thumbnail,
    title,
    authorAvatar,
    created,
    bannerImg,
    headerImg,
    permalink,
    id,
}) => {
    const { width, height } = useWindowSize();
    const [isPostOpen, setIsPostOpen] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    const handlePostClick = React.useCallback(() => {
        void router.push(`/?link=${permalink}`, undefined, { shallow: true });
        const commentsClone = comments.slice();
        const getComments = async () => {
            const resp = await fetch(`https://api.reddit.com${permalink}`);

            const commentsFromApi = await resp.json();

            const commentsArr = commentsFromApi[1]?.data?.children;

            setComments(commentsArr);

            commentsArr.forEach((comm: any) => {
                const { kind, data } = comm;
                const cmt: CommentType = {};

                if (kind === 't1' && data.author !== '[deleted]') {
                    cmt.author = data.author;
                    cmt.body = data.body;
                    cmt.created = data.created;

                    commentsClone.push(cmt);
                }
            });
        };

        void getComments();
        setIsPostOpen(prev => !prev);
    }, [permalink]);

    const handleOnPostClose = React.useCallback(() => {
        setIsPostOpen(false);
    }, []);
    // const titleRef = React.useRef(null);

    const WIDTH_990 = width > 990;

    const titleRef = React.useRef(null);

    const router = useRouter();

    return (
        <>
            <li className={styles.card}>
                {!WIDTH_990 && <CardControlMobile KarmaControl={Karma} />}

                <div className={styles.card__imgWrapper}>
                    <Image src={thumbnail ? thumbnail : pic} layout="fill" quality={100} className={styles.card__img} />
                </div>
                <div className={styles.card__info}>
                    {/* <Link href={'/[id]'} as={`/${id}`}> */}
                    <button onClick={handlePostClick} ref={titleRef}>
                        <h2 className={styles.card__title}>{title ? title : 'Here is any Title'}</h2>
                    </button>
                    {/* </Link> */}
                    {/* USER_INFO */}
                    <User_info created={`${created}`} authorAvatar={authorAvatar} author={author} />
                    <div className={styles.card__viewed}>
                        <Icon component={viewed} />
                        <p className={styles.card__viewedText}>1 час назад</p>
                    </div>
                    <div className={styles.card__menuWrapper}>
                        <DropDown
                            trigger={
                                <button className={styles.card__menu}>
                                    <div className={styles.card__emptyArea} />
                                </button>
                            }
                            triggerActive={styles.card__menuTrigger_active}
                            className={styles.card__menuList}
                            // onTriggerClick={handleTriggerClick}
                        >
                            {dropDownList.map(({ id, text, liIcon, As }) => {
                                return (
                                    <List
                                        id={id}
                                        key={id}
                                        As={As}
                                        text={text}
                                        className={styles.listItem}
                                        liIcon={liIcon}
                                    />
                                );
                            })}
                        </DropDown>
                        {WIDTH_990 && <Karma />}
                    </div>
                </div>
            </li>
            <CSSTransition
                in={isPostOpen}
                timeout={300}
                classNames={{
                    enter: styles.post_enter,
                    enterActive: styles.post_enter_active,
                    enterDone: styles.post_enter_done,
                    exit: styles.post_exit,
                    exitActive: styles.post_exit_active,
                    exitDone: styles.post_exit_done,
                }}
                mountOnEnter
                unmountOnExit
            >
                <Post
                    triggerNode={titleRef}
                    author={author}
                    authorAvatar={authorAvatar}
                    permalink={permalink}
                    created={created}
                    bannerImg={bannerImg}
                    title={title}
                    comments={comments}
                    subreddit={subreddit}
                    onClose={handleOnPostClose}
                />
            </CSSTransition>
        </>
    );
};

export default Card;
