import React, { useContext } from 'react';
import cn from 'classnames';
import DropDown from '@/lib/DropDown/DropDown';
import Chevron from '@img/icons/Desktop/chevron.svg';
import Rocket from '@img/icons/Desktop/rocket.svg';
import Mail from '@img/icons/Desktop/mail.svg';
import Anonim from '@img/icons/Desktop/anonim.svg';
import { useSession, signOut, signIn } from 'next-auth/client';
import Typography from '@/lib/Typography/Typography';
import Icon from '@/lib/Icon/Icon';

import styles from './styles.module.scss';

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [session] = useSession();

    const userAvatar = session?.user?.image.split('?')[0];

    const toggleAuth = () => {
        if (session) {
            void signOut();
        } else {
            void signIn('reddit', { redirect: false });
        }
    };

    return (
        <>
            <header className={cn(className, styles.header)}>
                <Typography As="h1" className={styles.visuallyHidden}>
                    Ræbbit blog
                </Typography>
                <div className={styles.header__left}>
                    <Typography As="h2" size={28} mobileSize={20} className={styles.header__title}>
                        Ræbbit
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
                    <button className={styles.header__profileLink} onClick={toggleAuth}>
                        {session ? (
                            <img src={userAvatar} className={styles.header__avatar} />
                        ) : (
                            <Icon component={Anonim} className={styles.header__avatar} />
                        )}
                    </button>
                    <button className={styles.header__nickNameLink} onClick={toggleAuth}>
                        <Typography As="p" size={20} className={styles.header__nickName}>
                            {session && session.user.name ? session.user.name : 'Войти'}
                        </Typography>
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
