import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

import Typography from '../Typography/Typography';
import Icon from '../Icon/Icon';

export type LiProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    liIcon?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLLIElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLLIElement>;
};

const Li: React.ForwardRefRenderFunction<unknown, LiProps> = (props, ref) => {
    const { children, liIcon, className, style, onClick, onMouseEnter, onMouseLeave } = props;
    return (
        <li
            className={className}
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={ref as React.MutableRefObject<HTMLLIElement>}
        >
            {liIcon && <Icon component={liIcon} />}
            <p className={cn({ [styles.text]: liIcon })}>{children}</p>
        </li>
    );
};

export default React.forwardRef<unknown, LiProps>(Li);
