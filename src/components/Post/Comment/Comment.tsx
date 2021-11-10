import React from 'react';
import Typography from '@/lib/Typography/Typography';
import Karma from '../../CardList/Card/Karma/Karma';
import User_info from '../../CardList/Card/User_info/User_info';
import share from '@img/icons/Desktop/share.svg';
import report from '@img/icons/Desktop/report.svg';
import comments from '@img/icons/comments.svg';
import CommentType from '@/interfaces/Comment';
import List, { ListProps } from '@/lib/List/List';

import styles from './styles.module.scss';

const commentControl: ListProps[] = [
    {
        id: 'Answer',
        text: 'Ответить',
        liIcon: comments,
        As: 'button',
    },
    {
        id: 'Share',
        text: 'Поделиться',
        liIcon: share,
        As: 'button',
    },
    {
        id: 'Report',
        text: 'Пожаловаться',
        liIcon: report,
        As: 'button',
    },
];

interface CommentProps extends CommentType {
    onChange?: (value: string, id: string) => void;
}

const Comment: React.FC<CommentProps> = ({ onChange, score, author, id, created, subreddit, body, replies }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment__karmaWrapper}>
                <Karma className={styles.comment__karma} score={score} />
                <div className={styles.comment__separator} />
            </div>
            <div className={styles.comment__main}>
                <User_info className={styles.comment__userInfo} subreddit={subreddit} author={author} />
                <Typography As="p" className={styles.comment__text}>
                    {body}
                </Typography>
                <div className={styles.comment__control}>
                    {commentControl.map(el => {
                        return (
                            <List
                                id={el.id}
                                onClick={onChange}
                                key={el.id}
                                smthToSend={{ commentId: id, author }}
                                As={el.As}
                                text={el.text}
                                className={styles.listItem}
                                liIcon={el.liIcon}
                            />
                        );
                    })}
                </div>
                {replies.length > 0 &&
                    replies.map((cm: CommentType) => {
                        if (cm.body !== undefined) {
                            return (
                                <Comment
                                    replies={cm.replies}
                                    onChange={onChange}
                                    body={cm.body}
                                    score={cm.score}
                                    id={cm.id}
                                    author={cm.author}
                                    key={`${cm.id}${cm.author}`}
                                />
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export default Comment;
