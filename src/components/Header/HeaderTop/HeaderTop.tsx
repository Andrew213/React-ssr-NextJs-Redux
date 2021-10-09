import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';
import Info from './Info/Info';
import Profile from './Search/Profile/Profile';
import Search from './Search/Search';

import style from './styles.module.scss';

type HeaderTopT = {
    token?: string;
};

const HeaderTop: React.FC<HeaderTopT> = ({ token }) => {
    const { width, height } = useWindowSize();
    console.log(width);
    // console.log(`size `, size);
    return (
        <div className={style.headerTopContainer}>
            {width > 1122 && <Info />}
            <Search token={token} />
            {/* <h1 className={style.f}>Хедер</h1> */}
        </div>
    );
};

export default HeaderTop;
