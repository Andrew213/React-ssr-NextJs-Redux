import React from 'react';
import cn from 'classnames';
import Icon from '@/lib/Icon/Icon';

import style from './styles.module.scss';

export type ListProps = {
    id: string;
    text: string;
    className?: string;
    As?: 'a' | 'li' | 'button' | 'div';
    href?: string;
    liIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: (id: string) => void;
    onMouseEnter?: (id?: string) => void;
};

const List: React.FC<ListProps> = props => {
    const { id, text, className, As, href, liIcon, onClick, onMouseEnter } = props;

    const handleMouseEnter = React.useCallback(() => onMouseEnter && onMouseEnter(id ? id : undefined), [
        id,
        onMouseEnter,
    ]);

    const handleClick = React.useCallback(() => onClick && onClick(id), [id, onClick]);

    return (
        <As className={className} onClick={handleClick} key={id} href={href} onMouseEnter={handleMouseEnter}>
            {liIcon && <Icon component={liIcon} />}
            <p className={cn({ [style.text]: liIcon })}>{text}</p>
        </As>
    );
};

export default List;
