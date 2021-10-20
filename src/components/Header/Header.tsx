import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import DropDown from '@/lib/DropDown/DropDown';
import Chevron from '@img/icons/Desktop/chevron.svg';
import Rocket from '@img/icons/Desktop/rocket.svg';
import Mail from '@img/icons/Desktop/mail.svg';
import Anonim from '@img/icons/Desktop/anonim.svg';
import Typography from '@/lib/Typography/Typography';
import { userContext } from '@/hooks/userContext';
import Icon from '@/lib/Icon/Icon';

import styles from './styles.module.scss';

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
    const data = useContext(userContext);
    return (
        <>
            <header className={cn(styles.header, className)}>
                <Typography As="h1" className={styles.visuallyHidden}>
                    Самый лучший блог
                </Typography>
                <div className={styles.header__left}>
                    <Typography As="h2" size={28} mobileSize={20} className={styles.header__title}>
                        Личный кабинет
                    </Typography>
                    <div className={styles.header__dropDownWrapper}>
                        <DropDown
                            trigger={<button className={styles.header__dropDownBtn}>Лучшие</button>}
                            prefix={Rocket}
                            suffix={Chevron}
                        >
                            <h1>supper</h1>
                        </DropDown>
                    </div>
                </div>
                <div className={styles.header__right}>
                    <button className={styles.header__mail}>
                        <Typography
                            As="span"
                            size={14}
                            mobileSize={9}
                            weight={500}
                            className={styles.header__mailCount}
                        >
                            4
                        </Typography>
                        <Icon component={Mail} width={20} height={16} className={styles.header__mailIcon} />
                    </button>
                    <input placeholder="Поиск" className={styles.header__search} type="search" />
                    <Link
                        href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.USER_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT_URI}&duration=permanent&scope=read submit identity`}
                    >
                        <a className={styles.header__profileLink}>
                            {data.iconImg ? (
                                <img src={data.iconImg} className={styles.header__avatar} />
                            ) : (
                                <Icon component={Anonim} className={styles.header__avatar} />
                            )}
                        </a>
                    </Link>
                    <Link
                        href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.USER_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT_URI}&duration=permanent&scope=read submit identity`}
                    >
                        <a className={styles.header__nickNameLink}>
                            <Typography As="p" size={20} className={styles.header__nickName}>
                                {data.name ? data.name : 'Аноним'}
                            </Typography>
                        </a>
                    </Link>
                </div>
            </header>
        </>
    );
};

export default Header;
