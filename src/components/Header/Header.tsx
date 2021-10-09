import React from 'react';
import cn from 'classnames';
import HeaderTop from './HeaderTop/HeaderTop';

import styles from './styles.module.scss';
import useWindowSize from '@/hooks/useWindowSize';

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={cn(styles.header, { [className]: className })}>
            <h1 className={styles.visuallyHidden}>{'Самый крутой сайт'}</h1>
            <HeaderTop />
            {/* <HeaderSort /> */}
        </header>
    );
};

export default Header;
