import React from 'react';
import DropDown from '@/lib/DropDown/DropDown';
import List, { ListProps } from '../../../../lib/List/List';
import Typography from '../../../../lib/Typography/Typography';
import cn from 'classnames';
import useMountEffect from '@/hooks/useMountEffect';
import Rocket from '@icons/Desktop/rocket.svg';
import Chevron from '@icons/Desktop/chevron.svg';

import styles from './styles.module.scss';

const dropDownList: ListProps[] = [
    {
        id: 'Comments',
        text: 'Комментарии',
        As: 'button',
    },
    {
        id: 'Share',
        text: 'Поделиться',
        As: 'button',
    },
];

const Info: React.FC = () => {
    const [menuList, setMenuList] = React.useState<ListProps[]>(dropDownList);
    useMountEffect(() => {
        console.log(1);
    });
    return (
        <div className={styles.info}>
            <Typography className={styles.info__title} weight={400} As="h2" size={28}>{`Личный кабинет`}</Typography>

            <DropDown
                prefix={Rocket}
                suffix={Chevron}
                trigger={
                    <button className={styles.cardMenu}>
                        <Typography As="p" size={14} className={styles.info__trigger}>
                            Лучшие
                        </Typography>
                    </button>
                }
            >
                {menuList.map(({ id, text, liIcon, As }) => {
                    return (
                        <List id={id} key={id} As={As} text={text} className={styles.listItemClass} liIcon={liIcon} />
                    );
                })}
            </DropDown>
        </div>
    );
};

export default Info;

{
    /* <DropDown
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
                    </DropDown> */
}
