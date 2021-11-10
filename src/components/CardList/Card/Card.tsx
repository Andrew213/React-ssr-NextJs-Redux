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
import PostType from '@/interfaces/PostType';
import { Link, animateScroll as scroll } from 'react-scroll';
import { commentsFetchDataSuccess } from '@/store/actions';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';

interface CardProps extends PostType {
    onPostClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPostOpen?: boolean;
}

const Card: React.FC<CardProps> = ({
    subreddit,
    author,
    thumbnail,
    title,
    created,
    score,
    contentImg_Height,
    contentImg_Width,
    permalink,
    id,
    content,
    description,
}) => {
    const { width, height } = useWindowSize();
    const [isPostOpen, setIsPostOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handlePostClick = React.useCallback(() => {
        scroll.scrollTo(100);

        // void fetch(`/api/comments/getPostComments`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ commentsCount: 4, postId: id, repliesCount: 2 }),
        // })
        //     .then(resp => resp.json())
        //     .then(commentsArr => dispatch(commentsFetchDataSuccess(commentsArr)));

        setIsPostOpen(prev => !prev);
    }, []);

    const handleOnPostClose = React.useCallback(() => {
        setIsPostOpen(false);
    }, []);

    const WIDTH_990 = width > 990;

    const titleRef = React.useRef(null);

    return (
        <>
            <li className={styles.card}>
                {!WIDTH_990 && <CardControlMobile KarmaControl={Karma} />}
                {thumbnail && (
                    <div className={styles.card__imgWrapper}>
                        <Image
                            src={thumbnail ? thumbnail : pic}
                            layout="fill"
                            quality={50}
                            className={styles.card__img}
                        />
                    </div>
                )}
                <div className={styles.card__info}>
                    <button onClick={handlePostClick} className={styles.card__titleBtn} ref={titleRef}>
                        <h2 className={styles.card__title}>{title}</h2>
                    </button>
                    <User_info created={`${created}`} author={author} />
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
                        {WIDTH_990 && <Karma className={styles.card__karma} score={score} />}
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
                    permalink={permalink}
                    created={created}
                    description={description}
                    contentImg_Height={contentImg_Height}
                    contentImg_Width={contentImg_Width}
                    content={content && content}
                    score={score}
                    id={id}
                    title={title}
                    subreddit={subreddit}
                    onClose={handleOnPostClose}
                />
            </CSSTransition>
        </>
    );
};

export default Card;
