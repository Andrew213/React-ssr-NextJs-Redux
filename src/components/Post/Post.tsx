import React, { FocusEventHandler, useCallback, useEffect, useRef } from 'react';
import Typography from '@/lib/Typography/Typography';
import Image from 'next/image';
import Karma from '../CardList/Card/Karma/Karma';
import { useDispatch, useSelector } from 'react-redux';
import CommentsForm from '../CardList/Card/CommentList/Comment/CommentForm/CommentForm';
import Comment from '../CardList/Card/CommentList/Comment/Comment';
import User_info from '../CardList/Card/User_info/User_info';
import Portal from '@/lib/Portal/Portal';
import List from '@/lib/List/List';
import { dropDownList } from '@/utils/dropDownList';
import Loader from 'react-loader-spinner';
import Scroll, { Element } from 'react-scroll';
import { useRouter } from 'next/router';
import PostType from '@/interfaces/PostType';
import CommentType from '@/interfaces/Comment';
import ReactPlayer from 'react-player';
import { commentsClear } from '@/store/actions';

import styles from './styles.module.scss';

interface PostProps extends PostType {
    onClose?: () => void;
    className?: string;
    triggerNode?: React.RefObject<HTMLButtonElement>;
}

type initTextT = {
    commentId?: string;
    text: string;
};

const Post: React.FC<PostProps> = ({
    triggerNode,
    title,
    author,
    description,
    created,
    contentImg_Height,
    contentImg_Width,
    subreddit,
    score,
    onClose,
    className,
    content,
}) => {
    const router = useRouter();

    const { type: descType, content: descContent } = description;

    const [initText, setInitText] = React.useState<initTextT>({
        commentId: null,
        text: '',
    });

    const postRef = useRef<HTMLDivElement>(null);

    // const [postComments, setPostComments] = React.useState([]);

    const commentFormRef = React.useRef(null);

    // const comments = useSelector(state => state as CommentType[]);

    const getAnswer = (dataComment: Record<string, string>) => {
        const { commentId, author } = dataComment;

        Scroll.scroller.scrollTo('commentForm', {
            smooth: 'easeInOut',
            offset: -300,
        });
        setInitText({ commentId: commentId, text: `${author}, ` });
        commentFormRef?.current.focus();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInitText({ ...initText, text: e.target.value });
    };

    const handleCommentChange = useCallback((value: string, dataComment) => {
        switch (value) {
            case 'Answer':
                getAnswer(dataComment);
                break;
        }
    }, []);

    // const sendComment = useCallback(
    //     (e: React.MouseEvent) => {
    //         e.preventDefault();

    //         const sendRep = async () => {
    //             const res = await fetch('/api/comments/sendComment', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     commentData: initText,
    //                     postId: id,
    //                 }),
    //             });
    //             const foo = await res.json();
    //             console.log(foo);
    //             const resp = await fetch(`/api/comments/getPostComments`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ commentsCount: 5, postId: id, repliesCount: 3 }),
    //             });
    //             const commentsArr = await resp.json();
    //             setPostComments(commentsArr);
    //         };
    //         void sendRep();
    //         setInitText({ commentId: null, text: '' });
    //     },
    //     [id, initText]
    // );

    useEffect(() => {
        const triggerBtn = triggerNode.current.children[0];

        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && e.target !== triggerBtn && !postRef.current?.contains(e.target)) {
                onClose();

                // dispatch(commentsClear());

                void router.push(`/`, undefined, { shallow: true });
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const renderContentSwitch = (type: string) => {
        switch (type) {
            case 'image':
                return <img src={content.data} className={styles.post__bannerImg} />;
                break;
            case 'video':
                return (
                    <div className={styles.post__imgWrapper}>
                        <ReactPlayer controls url={content.data} playing volume={0.2} />
                    </div>
                );
            default:
                break;
        }
    };

    const renderDescriptionSwitch = (type: string) => {
        switch (type) {
            case 'html':
                return (
                    <div
                        className={styles.post__description}
                        dangerouslySetInnerHTML={{ __html: description.content }}
                    />
                );
                break;
            case 'URL':
                return (
                    <a
                        className={styles.post__link}
                        href={description.content}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {description.content}
                    </a>
                );
            default:
                break;
        }
    };

    return (
        <Portal className={className}>
            <div style={{ color: 'red' }} className={styles.post} ref={postRef}>
                <div className={styles.post__header}>
                    <Karma className={styles.post__karma} score={score} />
                    <User_info
                        className={styles.post__userInfo}
                        subreddit={subreddit}
                        authorName={author}
                        created={created}
                    />
                </div>

                <Typography As="p" className={styles.post__title} size={28} weight={400}>
                    {title}
                </Typography>

                {description && renderDescriptionSwitch(descType)}

                {content && <div className={styles.post__imgWrapper}>{renderContentSwitch(content.type)}</div>}

                <div className={styles.post__control}>
                    {dropDownList.map((el, i) => {
                        if (el.id === 'Close') {
                            delete dropDownList[i];
                        }
                        return (
                            <List
                                // id={el.id}
                                key={el.id}
                                // As={el.As}
                                // text={el.text}
                                className={styles.listItem}
                                liIcon={el.liIcon}
                            />
                        );
                    })}
                </div>
                {/* {comments.length > 0 ? (
                    <>
                        <Element name="commentForm">
                            <CommentsForm
                                commentFormRef={commentFormRef}
                                // onSendComment={sendComment}
                                defaultValue={initText.text}
                                onChange={handleOnChange}
                            />
                        </Element>
                        {comments.map((comment, i) => {
                            return (
                                <Comment
                                    key={comment.id}
                                    onChange={handleCommentChange}
                                    author={comment.author}
                                    score={comment.score}
                                    created={comment.created}
                                    body={comment.body}
                                    id={comment.id}
                                    replies={comment.replies}
                                />
                            );
                        })}
                    </>
                ) : (
                    <div className={styles.post__load}>
                        <Loader type="Circles" color="#cc6633" height={50} width={50} timeout={30000} />
                    </div>
                )} */}
            </div>
        </Portal>
    );
};

export default Post;
