import React from 'react';
import Comment from './Comment/Comment';
import cn from 'classnames';
import useActions from '@/hooks/useActions';

import styles from './styles.module.scss';

type CommentsListProps = {
    defaultValue?: string;
    commentFormRef?: React.RefObject<HTMLTextAreaElement>;
    authorName?: string;
    onSendComment?: (e: React.MouseEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id: string;
};

const CommentsList: React.FC<CommentsListProps> = ({ id, authorName }) => {
    const [defaultValue, setDefaultValue] = React.useState<string>(`${authorName}, `);
    const { FetchComments } = useActions();

    React.useEffect(() => {
        FetchComments(id);
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDefaultValue(e.target.value);
    };

    return (
        <>
            <form className={styles.commentsForm}>
                <textarea
                    className={styles.commentsForm__input}
                    value={defaultValue}
                    onChange={handleOnChange}
                    placeholder="Комментировать"
                />
                <button className={cn(styles.commentsForm__btn, styles.commentsForm__btn_send)}>Комментировать</button>
            </form>
            <Comment id={id} />
        </>
    );
};

export default CommentsList;
