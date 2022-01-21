import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type CommentsListProps = {
    defaultValue?: string;
    commentFormRef?: React.RefObject<HTMLTextAreaElement>;
    author?: string;
    onSendComment?: (e: React.MouseEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id: string;
};

const CommentsList: React.FC<CommentsListProps> = ({ id, author }) => {
    const [defaultValue, setDefaultValue] = React.useState<string>(`${author}, `);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDefaultValue(e.target.value);
    };

    return (
        <form className={styles.commentsForm}>
            <textarea
                className={styles.commentsForm__input}
                value={defaultValue}
                onChange={handleOnChange}
                placeholder="Комментировать"
            />
            <button className={cn(styles.commentsForm__btn, styles.commentsForm__btn_send)}>Комментировать</button>
        </form>
    );
};

export default CommentsList;
