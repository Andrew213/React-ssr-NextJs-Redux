import React from 'react';
import Icon from '@/lib/Icon/Icon';
import Profile from './Profile/Profile';
import mail from '@icons/Desktop/mail.svg';

import style from './styles.module.scss';

type SearchT = {
    token?: string;
};

const Search: React.FC<SearchT> = () => {
    return (
        <div className={style.searchBlock}>
            <button className={style.mail}>
                <span className={style.mail__count}>4</span>
                <Icon iconClassName={style.mail__icon} component={mail} />
            </button>
            <input placeholder="Поиск" className={style.search} type="search" />
            <Profile />
        </div>
    );
};

export default Search;
