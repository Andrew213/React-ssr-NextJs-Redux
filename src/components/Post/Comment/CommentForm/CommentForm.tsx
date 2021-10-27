import React, { useContext } from 'react';
import { commentContext } from '@/hooks/commentContext';

import styles from './styles.module.scss';

type CommentsProps = {
    author?: string;
};

const CommentForm: React.FC<CommentsProps> = ({ author }) => {
    // const [inputValue, setInputValue] = React.useState(`${author}, `);
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
            {/* <span className={styles.form__name}>{`${author},`}</span> */}
            <button type="submit" className={styles.form__button}>
                Комментировать
            </button>
        </form>
    );
};

export default CommentForm;
