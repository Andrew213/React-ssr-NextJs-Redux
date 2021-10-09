import React from 'react';
import cn from 'classnames';

import styles from './style.module.scss';

type Tsizes = 28 | 20 | 16 | 14 | 12 | 10;
type Tweight = 400 | 600 | 500;

type TypographyProps = {
    As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
    size: Tsizes;
    weight?: Tweight;
    mobileSize?: Tsizes;
    tabletSize?: Tsizes;
    desktopSize?: Tsizes;
    className?: string;
};

const Typography: React.FC<TypographyProps> = props => {
    const { As = 'span', children, size, mobileSize, tabletSize, desktopSize, weight, className } = props;

    const classes = cn(
        styles[`s${size}`],
        { [styles[`m${mobileSize}`]]: mobileSize },
        { [styles[`t${tabletSize}`]]: tabletSize },
        { [styles[`d${desktopSize}`]]: desktopSize },
        { [styles[`w${weight}`]]: weight },
        { [className]: className }
    );

    return <As className={classes}>{children}</As>;
};

export default Typography;
