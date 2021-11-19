import React, { useContext } from 'react';
import cn from 'classnames';
import DropDown from '@/lib/DropDown/DropDown';
import Chevron from '@img/icons/Desktop/chevron.svg';
import Rocket from '@img/icons/Desktop/rocket.svg';
import Mail from '@img/icons/Desktop/mail.svg';
import Anonim from '@img/icons/Desktop/anonim.svg';
import { useSession, signOut, session, signin } from 'next-auth/client';
import Typography from '@/lib/Typography/Typography';
import Icon from '@/lib/Icon/Icon';

import styles from './styles.module.scss';

type HeaderProps = {
    className?: string;
};

// const ss = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT_URI}&duration=permanent&scope=read submit identity`;

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [session, load] = useSession();

    const userAvatar = session?.user?.image.split('?')[0];

    return (
        <>
            <header className={cn(className, styles.header)}>
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
                    {session ? (
                        <>
                            <button className={styles.header__profileLink} onClick={() => signOut()}>
                                <img src={userAvatar} className={styles.header__avatar} />
                            </button>
                            <button className={styles.header__nickNameLink} onClick={() => signOut()}>
                                <Typography As="p" size={20} className={styles.header__nickName}>
                                    {session.user.name ? session.user.name : 'Аноним'}
                                </Typography>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={styles.header__profileLink} onClick={() => signin('reddit')}>
                                <Icon component={Anonim} className={styles.header__avatar} />
                            </button>
                            <button className={styles.header__nickNameLink} onClick={() => signin('reddit')}>
                                <Typography As="p" size={20} className={styles.header__nickName}>
                                    {'Войти'}
                                </Typography>
                            </button>
                        </>
                    )}
                    {/* <Link href={`#`}>
                        <a className={styles.header__profileLink}>
                            {user.avatar ? (
                                <img src={data.iconImg} className={styles.header__avatar} />
                            ) : (
                                <Icon component={Anonim} className={styles.header__avatar} />
                            )}
                        </a>
                    </Link>
                    <Link href={`#`}>
                        <a className={styles.header__nickNameLink}>
                            <Typography As="p" size={20} className={styles.header__nickName}>
                                {data.name ? data.name : 'Аноним'}
                            </Typography>
                        </a>
                    </Link> */}
                </div>
            </header>
        </>
    );
};

export default Header;
