import React from 'react';
import Image from 'next/image';
import pic from '@img/pic.jpg';
import viewed from '@img/icons/viewed.svg';
import { CSSTransition } from 'react-transition-group';
import DropDown from '@/lib/DropDown/DropDown';
import List from '@/lib/List/List';
import Karma from './Karma/Karma';
import Icon from '@/lib/Icon/Icon';
import useWindowSize from '@/hooks/useWindowSize';
import CardControlMobile from './CardControlMobile/CardControlMobile';
import User_info from './User_info/User_info';
import { dropDownList } from '@/utils/dropDownList';
import Loader from 'react-loader-spinner';
import Post from '@/components/Post/Post';
import { useRouter } from 'next/router';
import { PostType } from '@/pages';

import styles from './styles.module.scss';

interface CardProps extends PostType {
    onPostClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPostOpen?: boolean;
}

export interface CommentType {
    author?: string;
    body?: string;
    id?: string;
    subreddit?: string;
    created?: number;
    replies?: CommentType[] | undefined;
}

const Card: React.FC<CardProps> = ({
    subreddit,
    author,
    thumbnail,
    title,
    authorAvatar,
    created,
    thumbnail_height,
    thumbnail_width,
    permalink,
    id,
}) => {
    const { width, height } = useWindowSize();
    const [isPostOpen, setIsPostOpen] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const router = useRouter();

    const handlePostClick = () => {
        void router.push(`/?link=${permalink}`, undefined, { shallow: true });

        const commentsClone = comments.slice();

        const getComments = async () => {
            const resp = await fetch('/api/comments/getPostComments', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ postId: id }),
            });
            const answ = await resp.json();
            console.log(answ);

            // const resp = await fetch(`https://api.reddit.com${permalink}`);
            // const commentsFromApi = await resp.json();
            // const commentsArr = commentsFromApi[1]?.data?.children;
            // commentsArr.forEach((comm: any) => {
            //     const { kind, data } = comm;
            //     const cmt: CommentType = {};
            //     if (data.author !== '[deleted]') {
            //         cmt.author = data.author;
            //         cmt.body = data.body;
            //         cmt.id = `${data.id}${data.link_id}`;
            //         cmt.subreddit = data.subreddit;
            //         cmt.created = data.created;
            //         cmt.replies = data?.replies?.data?.children;
            //         commentsClone.push(cmt);
            //     }
            // });
            // setComments(commentsClone);
        };

        void getComments();

        setIsPostOpen(prev => !prev);
    };

    const handleOnPostClose = React.useCallback(() => {
        setIsPostOpen(false);
    }, []);

    const WIDTH_990 = width > 990;

    const titleRef = React.useRef(null);

    return (
        <>
            <li className={styles.card}>
                {!WIDTH_990 && <CardControlMobile KarmaControl={Karma} />}

                <div className={styles.card__imgWrapper}>
                    {!thumbnail ? (
                        <div className={styles.card__img_load}>
                            <Loader type="Circles" color="#cc6633" height={50} width={50} timeout={30000} />
                        </div>
                    ) : (
                        <Image
                            src={thumbnail ? thumbnail : pic}
                            layout="fill"
                            quality={50}
                            className={styles.card__img}
                        />
                    )}
                </div>
                <div className={styles.card__info}>
                    <button onClick={handlePostClick} ref={titleRef}>
                        <h2 className={styles.card__title}>{title ? title : 'Here is any Title'}</h2>
                    </button>
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
                    bannerImg={thumbnail}
                    title={title}
                    thumbnail_height={thumbnail_height}
                    thumbnail_width={thumbnail_width}
                    comments={comments}
                    subreddit={subreddit}
                    onClose={handleOnPostClose}
                />
            </CSSTransition>
        </>
    );
};

export default Card;
