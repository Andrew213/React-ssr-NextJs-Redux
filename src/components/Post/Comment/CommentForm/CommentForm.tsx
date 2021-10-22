import React, { useContext } from 'react';
import { commentContext } from '@/hooks/commentContext';

import styles from './styles.module.scss';

type CommentsProps = {
    nickName?: string;
};

const CommentForm: React.FC<CommentsProps> = ({ nickName }) => {
    // const [inputValue, setInputValue] = React.useState(`${nickName}, `);
    const { value, onChange } = useContext(commentContext);
    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    return (
        <form className={styles.form}>
            <textarea className={styles.form__input} onChange={handleChange} value={value} />
            {/* <span className={styles.form__name}>{`${nickName},`}</span> */}
            <button type="submit" className={styles.form__button}>
                Комментировать
            </button>
        </form>
    );
};

export default CommentForm;
