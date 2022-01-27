import React from 'react';
import cn from 'classnames';
import DropDown from '@/lib/DropDown/DropDown';
import List from '@/lib/List/List';
import Karma from './Karma/Karma';
import { declOfNum } from '@/utils';
import { useRouter } from 'next/router';
import useWindowSize from '@/hooks/useWindowSize';
import User_info from './User_info/User_info';
import { dropDownList } from '@/utils/dropDownList';
import CommentsList from './CommentList/CommentList';
import Loader from 'react-loader-spinner';
import PostType from '@/interfaces/PostType';
import { animateScroll as scroll } from 'react-scroll';
import CardContent from './CardContent/CardContent';
import AnimateHeight from 'react-animate-height';
import Modal from '@/lib/Modal/Modal';

import styles from './styles.module.scss';

const WORDS_FOR_DECLENSION = ['Комментарий', 'Комментария', 'Комментариев'];

interface CardProps extends PostType {
    onPostClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPostOpen?: boolean;
    As?: 'li' | 'div';
}

const Card: React.FC<CardProps> = ({
    subredditName_display,
    authorName,
    title,
    created,
    authorAvatar,
    commentsCount,
    score,
    postInPopup = false,
    content_size,
    id,
    content,
    As = 'li',
}) => {
    const { width, height } = useWindowSize();

    const [commentsHeight, setCommentsHeight] = React.useState<number | 'auto'>(0);

    const [showComments, setShowComments] = React.useState<boolean>(false);

    const router = useRouter();

    const postInPopupRef = React.useRef(false);

    const [isPostOpen, setIsPostOpen] = React.useState(false);

    // const switchCardMenu = (val: string) => {
    //     switch (val) {
    //         case 'Comments':
    //             handleCommentsClick();
    //     }
    // };
    const onCommentsClick = () => {
        if (!showComments || commentsHeight === 0) {
            setShowComments(true);
            setTimeout(() => {
                setCommentsHeight('auto');
            }, 0);
        } else {
            setCommentsHeight(0);
        }
    };

    const switchCardMenuInPopup = (val: string) => {
        switch (val) {
            case 'Comments':
                onCommentsClick();
        }
    };

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
                setIsPostOpen(true);
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
        setIsPostOpen(false);
        setShowComments(false);
    };

    return (
        <>
            <As className={cn(styles.card, { [styles.cardInPopup]: postInPopup })}>
                <div className={cn(styles.card__inner, { [styles.cardInPopup__inner]: postInPopup })}>
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
                    </div>

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
                            <List>
                                {dropDownList.map(({ id, text, liIcon, As }) => {
                                    return (
                                        <List.Option key={id} value={id} liIcon={liIcon} className={styles.listItem}>
                                            {text}
                                        </List.Option>
                                    );
                                })}
                            </List>
                        </DropDown>
                    </div>
                    <button
                        onClick={onTitleClick}
                        className={cn(styles.card__titleBtn, { [styles.cardInPopup__titleBtn]: postInPopup })}
                    >
                        <p className={cn(styles.card__title, { [styles.cardInPopup__title]: postInPopup })}>{title}</p>
                    </button>
                </div>

                {content.url && (
                    <div className={cn(styles.card__content, { [styles.cardInPopup__content]: postInPopup })}>
                        <CardContent content={content} content_size={content_size} />
                    </div>
                )}
                {postInPopup && (
                    <>
                        <div className={cn(styles.cardInPopup__controlWrapper)}>
                            <List onChange={switchCardMenuInPopup} className={styles.cardInPopup__control}>
                                {dropDownList.map(({ id, text, liIcon, As }, i) => {
                                    if (id === 'Close') return;
                                    if (id === 'Comments') {
                                        text = `${commentsCount} ${declOfNum(commentsCount, WORDS_FOR_DECLENSION)}`;
                                    }
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
                        {showComments && (
                            <AnimateHeight duration={300} height={commentsHeight}>
                                <CommentsList id={id} authorName={authorName} />
                            </AnimateHeight>
                        )}
                    </>
                )}
            </As>

            <Modal
                visible={isPostOpen}
                onCancel={onModalClose}
                width={1000}
                className={styles.modal}
                ref={postInPopupRef}
            >
                <Card
                    id={id}
                    content={content}
                    score={score}
                    subredditName_display={subredditName_display}
                    authorName={authorName}
                    content_size={content_size}
                    created={created}
                    title={title}
                    commentsCount={commentsCount}
                    authorAvatar={authorAvatar}
                    postInPopup={true}
                    As="div"
                />
            </Modal>
        </>
    );
};

export default Card;
