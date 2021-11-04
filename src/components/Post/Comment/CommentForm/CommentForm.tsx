import React, { LegacyRef, useCallback, useContext } from 'react';
import { highlightMatches } from '@/utils/highlightMatches';

import styles from './styles.module.scss';

type CommentsProps = {
    defaultValue?: string;
    commentFormRef?: React.RefObject<HTMLTextAreaElement>;
    author?: string;
    onSendComment?: (e: React.MouseEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const CommentForm: React.FC<CommentsProps> = ({ commentFormRef, onSendComment, defaultValue, onChange, author }) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e);
    };

    return (
        <form className={styles.form}>
            <textarea
                className={styles.form__input}
                onChange={handleOnChange}
                value={defaultValue}
                placeholder="Комментировать"
                ref={commentFormRef}
            />
            {/* <span className={styles.form__name}>{`${author},`}</span> */}
            <button onClick={onSendComment} className={styles.form__button}>
                Комментировать
            </button>
        </form>
    );
};

export default CommentForm;
