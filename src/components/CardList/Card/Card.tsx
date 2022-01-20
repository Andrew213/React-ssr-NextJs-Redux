import React from 'react';
import cn from 'classnames';
import DropDown from '@/lib/DropDown/DropDown';
import List from '@/lib/List/List';
import Karma from './Karma/Karma';
import { useRouter } from 'next/router';
import useWindowSize from '@/hooks/useWindowSize';
import CardControlMobile from './CardControlMobile/CardControlMobile';
import User_info from './User_info/User_info';
import { dropDownList } from '@/utils/dropDownList';
import Loader from 'react-loader-spinner';
import Post from '@/components/Post/Post';
import PostType from '@/interfaces/PostType';
import { animateScroll as scroll } from 'react-scroll';
import Typography from '@/lib/Typography/Typography';
import CardContent from './CardContent/CardContent';

import Link from 'next/link';
import Modal from '@/lib/Modal/Modal';
import styles from './styles.module.scss';

interface CardProps extends PostType {
    onPostClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPostOpen?: boolean;
}

const Card: React.FC<CardProps> = ({
    subredditName_display,
    authorName,
    thumbnail,
    title,
    created,
    authorAvatar,
    commentsCount,
    score,
    postInPopup = false,
    content_size,
    permalink,
    id,
    content,
    description,
}) => {
    const { width, height } = useWindowSize();

    const [isPostOpen, setIsPostOpen] = React.useState(false);

    const router = useRouter();

    const WIDTH_990 = width > 990;

    const titleRef = React.useRef(null);

    const handlePostClick = React.useCallback(() => {
        console.log(1);
        // void router.replace('/example');
        // scroll.scrollTo(100);
        // void fetch(`/api/comments/getPostComments`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ commentsCount: 4, postId: id, repliesCount: 2 }),
        // })
        //     .then(resp => resp.json())
        //     .then(commentsArr => dispatch(commentsFetchDataSuccess(commentsArr)));
        // setIsPostOpen(prev => !prev);
    }, []);

    const [active, setActive] = React.useState(false);

    const handleOnPostClose = React.useCallback(() => {
        setIsPostOpen(false);
    }, []);

    const switchCardMenu = (val: string) => {
        switch (val) {
            case 'Comments':
                handlePostClick();
        }
    };

    const openModal = React.useCallback(() => {
        setActive(true);
    }, []);

    const onTitleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            void router.push(
                {
                    pathname: `/`,
                    query: { postId: `${id}` },
                },
                {
                    pathname: `/post/${id}`,
                },
                { shallow: true }
            );
            if (!router.query.postId) {
                setActive(true);
            }
        },
        [id, router]
    );

    const onModalClose = () => {
        void router.push(
            {
                pathname: `/`,
            },
            undefined,
            { shallow: true }
        );
        setActive(false);
    };
    return (
        <>
            <li className={cn(styles.card, { [styles.cardInPopup]: postInPopup })}>
                <div className={cn(styles.card__header, { [styles.cardInPopup__header]: postInPopup })}>
                    <Karma
                        className={cn(styles.card__karma, { [styles.cardInPopup__karma]: postInPopup })}
                        score={score}
                    />
                    <User_info
                        className={cn(styles.post__userInfo, { [styles.cardInPopup__userInfo]: postInPopup })}
                        subreddit={subredditName_display}
                        authorName={authorName}
                        authorAva={authorAvatar}
                        created={created}
                    />
                    <div className={cn(styles.card__menuWrapper, { [styles.cardInPopup__menuWrapper]: postInPopup })}>
                        <DropDown
                            trigger={
                                <button className={styles.card__menu}>
                                    <div className={styles.card__emptyArea} />
                                </button>
                            }
                            triggerActive={styles.card__menuTrigger_active}
                            className={styles.card__menuList}
                        >
                            <List onChange={switchCardMenu}>
                                {dropDownList.map(({ id, text, liIcon, As }) => {
                                    return (
                                        <List.Option key={id} value={id} liIcon={liIcon} className={styles.listItem}>
                                            {text}
                                        </List.Option>
                                    );
                                })}
                            </List>
                        </DropDown>
                        {/* {WIDTH_990 && <Karma className={styles.card__karma} score={score} />} */}
                    </div>
                    <button
                        onClick={onTitleClick}
                        className={cn(styles.card__titleBtn, { [styles.cardInPopup__titleBtn]: postInPopup })}
                    >
                        <p className={cn(styles.card__title, { [styles.cardInPopup__title]: postInPopup })}>{title}</p>
                    </button>
                    {content.url && (
                        <div className={cn(styles.card__content, { [styles.cardInPopup__content]: postInPopup })}>
                            <CardContent content={content} content_size={content_size} />
                        </div>
                    )}
                </div>
                {postInPopup && (
                    <div className={cn(styles.cardInPopup__controlWrapper)}>
                        <List onChange={switchCardMenu} className={styles.cardInPopup__control}>
                            {dropDownList.map(({ id, text, liIcon, As }, i) => {
                                if (id === 'Close') delete dropDownList[i];

                                return (
                                    <List.Option
                                        key={id}
                                        value={id}
                                        liIcon={liIcon}
                                        className={styles.cardInPopup__listItem}
                                    >
                                        {text}
                                    </List.Option>
                                );
                            })}
                        </List>
                    </div>
                )}
            </li>
            {/* <li className={styles.card}>
                {!WIDTH_990 && <CardControlMobile KarmaControl={Karma} />}
                {thumbnail && (
                    <div className={styles.card__imgWrapper}>
                    <Image src={thumbnail} layout="fill" quality={50} className={styles.card__img} />
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
                    content={content}
                    score={score}
                    id={id}
                    title={title}
                    subreddit={subreddit}
                    onClose={handleOnPostClose}
                />
            </CSSTransition> */}

            <Modal visible={active} onCancel={onModalClose} width={1000} className={styles.modal}>
                <Card
                    id={id}
                    content={content}
                    score={score}
                    subredditName_display={subredditName_display}
                    authorName={authorName}
                    content_size={content_size}
                    created={created}
                    title={title}
                    authorAvatar={authorAvatar}
                    postInPopup={true}
                />
            </Modal>
        </>
    );
};

export default Card;
