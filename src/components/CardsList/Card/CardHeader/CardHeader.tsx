import React from 'react';

import avatar from '@img/avatar.png';

import styles from './styles.module.scss';

export function CardHeader() {
    return (
        <div className={styles.cardheader}>
            <a href="#">
                <img className={styles.cardheader__avatar} src={avatar} alt="d" />
                <p className={styles.cardheader__name}>Владимир Петров</p>
                <button className={styles.cardheader__btn} data-label="Действия" />
            </a>
        </div>
    );
}
