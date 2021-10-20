import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pic from '@img/pic.jpg';
import avatar2 from '@img/avatar.png';
import viewed from '@img/icons/viewed.svg';
import comments from '@img/icons/comments.svg';
import share from '@img/icons/Desktop/share.svg';
import hide from '@img/icons/Desktop/hide.svg';
import save from '@img/icons/Desktop/save.svg';
import report from '@img/icons/Desktop/report.svg';
import Typography from '@/lib/Typography/Typography';
import DropDown from '@/lib/DropDown/DropDown';
import List, { ListProps } from '@/lib/List/List';
import Karma from './Karma/Karma';
import Icon from '@/lib/Icon/Icon';
import useWindowSize from '@/hooks/useWindowSize';
import CardControlMobile from './CardControlMobile/CardControlMobile';

import styles from './styles.module.scss';

const dropDownList: ListProps[] = [
    {
        id: 'Comments',
        text: 'Комментарии',
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
        id: 'Hide',
        text: 'Скрыть',
        liIcon: hide,
        As: 'button',
    },
    {
        id: 'Save',
        text: 'Сохранить',
        liIcon: save,
        As: 'button',
    },
    {
        id: 'Report',
        text: 'Пожаловаться',
        liIcon: report,
        As: 'button',
    },
    {
        id: 'Close',
        text: 'Закрыть',
        As: 'button',
    },
];

type CardProps = {
    nicName?: string;
    title?: string;
    publicTime?: string;
    thumbnail?: string;
    avatar?: string;
};

const Card: React.FC<CardProps> = ({ nicName, thumbnail, title, avatar, publicTime }) => {
    const { width, height } = useWindowSize();

    const WIDTH_990 = width > 990;

    return (
        <li className={styles.card}>
            {!WIDTH_990 && <CardControlMobile KarmaControl={Karma} />}

            <div className={styles.card__imgWrapper}>
                <Image src={thumbnail ? thumbnail : pic} layout="fill" quality={100} className={styles.card__img} />
            </div>
            <div className={styles.card__info}>
                <button>
                    <Typography As="h2" size={20} weight={400} className={styles.card__title}>
                        {title ? title : 'Here is any Title'}
                    </Typography>
                </button>
                <div className={styles.card__userInfo}>
                    <Typography As="p" size={14} className={styles.card__published}>
                        {publicTime}
                    </Typography>
                    <button className={styles.card__profile}>
                        <Image
                            src={avatar ? avatar : avatar2}
                            width={20}
                            height={20}
                            className={styles.card__avatar}
                            objectFit="contain"
                            objectPosition="center"
                        />
                        <Typography As="p" size={14} className={styles.card__nickName}>
                            {nicName ? nicName : 'Anonim Anonim'}
                        </Typography>
                    </button>
                </div>
                <div className={styles.card__viewed}>
                    <Icon component={viewed} />
                    <p className={styles.card__viewedText}>1 час назад</p>
                </div>
                <div className={styles.card__menuWrapper}>
                    <DropDown
                        trigger={
                            <button className={styles.card__menu}>
                                <div className={styles.card__emptyArea} />
                            </button>
                        }
                        triggerActive={styles.card__menuTrigger_active}
                        className={styles.card__menuList}
                        // onTriggerClick={handleTriggerClick}
                    >
                        {dropDownList.map(({ id, text, liIcon, As }) => {
                            return (
                                <List
                                    id={id}
                                    key={id}
                                    As={As}
                                    text={text}
                                    className={styles.listItem}
                                    liIcon={liIcon}
                                />
                            );
                        })}
                    </DropDown>
                    {WIDTH_990 && <Karma />}
                </div>
            </div>
        </li>
    );
};

export default Card;
