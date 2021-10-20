import React from 'react';
import Icon from '@/lib/Icon/Icon';
import comments from '@img/icons/comments.svg';
import light from '@img/icons/light.svg';
import share from '@img/icons/share.svg';
import Delete from '@img/icons/delete.svg';

import styles from './styles.module.scss';

type CardControlMobileProps = {
    KarmaControl: React.FC;
};

const CardControlMobile: React.FC<CardControlMobileProps> = ({ KarmaControl }) => {
    return (
        <div className={styles.cardControlMobile}>
            <KarmaControl />
            <button className={styles.cardControlMobile__comments}>
                <Icon component={comments} className={styles.cardControlMobile__commentsIcon} width={15} height={15} />
                <span className={styles.cardControlMobile__commentsCount}>14</span>
            </button>
            <ul className={styles.cardControlMobile__items}>
                <li className={styles.cardControlMobile__item}>
                    <button className={styles.cardControlMobile__itemButton}>
                        <Icon component={light} width={20} height={20} />
                    </button>
                </li>
                <li className={styles.cardControlMobile__item}>
                    <button className={styles.cardControlMobile__itemButton}>
                        <Icon component={share} width={20} height={20} />
                    </button>
                </li>
                <li className={styles.cardControlMobile__item}>
                    <button className={styles.cardControlMobile__itemButton}>
                        <Icon component={Delete} width={20} height={20} />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default CardControlMobile;
