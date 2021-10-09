import React, { useEffect, useState } from 'react';
import DropDown from '@/lib/DropDown/DropDown';
import List, { ListProps } from '@/lib/List/List';
import { declOfNum } from '@/utils';
import cn from 'classnames';
import CardControlMobile from './CardControlMobile/CardControlMobile';
import anonim from '@icons/Desktop/anonim.svg';
import Karma from './CardKarma/CardKarma';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import comments from '@icons/comments.svg';
import share from '@icons/Desktop/share.svg';
import hide from '@icons/Desktop/hide.svg';
import save from '@icons/Desktop/save.svg';
import report from '@icons/Desktop/report.svg';
import Icon from '@/lib/Icon/Icon';

import styles from './styles.module.scss';
import Loader from 'react-loader-spinner';
const ARR_HOUR = ['час', 'часа', 'часов'];
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
    userName: string;
    title: string;
    publicTime: number;
    id: string | number;
    img: string;
    avatar: string;
};

const Card: React.FC<CardProps> = ({ userName, title, publicTime, id, img, avatar }) => {
    const [isTriggerActive, setTriggerActive] = React.useState<boolean>(false);
    const listItemClass = `${styles.listItem}`;
    const [menuList, setMenuList] = React.useState<ListProps[]>(dropDownList);
    const { width, height } = useWindowSize();
    const WIDTH_940 = width > 940;

    React.useEffect(() => {
        const menuListClone = dropDownList.slice();
        const delItems = ['Comments', 'Share', 'Save'];
        if (!WIDTH_940) {
            const newsList = menuListClone.filter(({ id }) => !delItems.includes(id));
            setMenuList(newsList);
        } else {
            setMenuList(dropDownList);
        }
    }, [WIDTH_940]);

    const handleTriggerClick = React.useCallback((isOpen: boolean) => {
        setTriggerActive(isOpen);
    }, []);

    return (
        <li className={styles.card}>
            {!WIDTH_940 && <CardControlMobile KarmaControl={Karma} />}

            <div className={styles.card__img}>
                {img ? (
                    <Image quality={100} src={img} width="190" height="107" sizes="(max-width: 940px) 100px" />
                ) : (
                    <p className={styles.card__noImg}>No img</p>
                )}
            </div>
            <div className={styles.card__body}>
                <h2 className={styles.card__title}>{title}</h2>
                <div className={styles.card__userInfoWrapper}>
                    {width < 390 ? (
                        <p className={styles.card__publickHours}>{`${publicTime} ${declOfNum(
                            publicTime,
                            ARR_HOUR
                        )} назад`}</p>
                    ) : (
                        <p className={styles.card__publickHours}>{`опубликовано ${publicTime} ${declOfNum(
                            publicTime,
                            ARR_HOUR
                        )} назад`}</p>
                    )}
                    <a href="#" className={styles.card__userInfo}>
                        <div className={styles.card__avatar}>
                            {avatar ? <Image src={avatar} layout="fill" alt="avatar" /> : <Icon component={anonim} />}
                        </div>
                        <p className={styles.card__userName}>{userName}</p>
                    </a>
                </div>
                <div className={styles.controlWrapper}>
                    <DropDown
                        trigger={
                            <button className={styles.cardMenu}>
                                <div
                                    className={cn(styles.cardMenu__emptyArea, {
                                        [styles.triggerActive]: isTriggerActive,
                                    })}
                                />
                            </button>
                        }
                        triggerActive={styles.triggerActive}
                        className={styles.cardMenu__list}
                        onTriggerClick={handleTriggerClick}
                    >
                        {menuList.map(({ id, text, liIcon, As }) => {
                            return (
                                <List id={id} key={id} As={As} text={text} className={listItemClass} liIcon={liIcon} />
                            );
                        })}
                    </DropDown>
                    {WIDTH_940 && <Karma />}
                </div>
            </div>
        </li>
    );
};

export default Card;
