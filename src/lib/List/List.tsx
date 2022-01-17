import React from 'react';
import cn from 'classnames';
import Icon from '@/lib/Icon/Icon';

import style from './styles.module.scss';
import Li from './Li';
import Option from './Option';

export type ListProps = {
    // id: string;
    // text: string;
    className?: string;
    // As?: 'a' | 'li' | 'button' | 'div';
    href?: string;
    smthToSend?: string | number | Record<string, any>;
    liIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children?: React.ReactNode;
    onChange?: (value: string | number, labeledValue: React.ReactNode) => void;
    onMouseEnter?: (id?: string) => void;
};

type ListContext = {
    // width: number | string;
    onOptionClick: (value: string | number, labeledValue: React.ReactNode) => void;
};

export const ListContext = React.createContext<ListContext>({ onOptionClick: () => undefined });

function List(props: ListProps): React.ReactElement {
    const { children, className, href, liIcon, onChange, onMouseEnter, smthToSend } = props;

    const onOptionClick = React.useCallback(
        (value: string | number, labeledValue: React.ReactNode) => {
            onChange && onChange(value, labeledValue);
        },
        [onChange]
    );

    const providerValue = {
        onOptionClick,
    };
    // const handleClick = React.useCallback(() => onClick && onClick(id, smthToSend), [id, onClick, smthToSend]);

    return (
        <ListContext.Provider value={providerValue}>
            <ul className={className}>{children}</ul>
            {/* <As className={className} onClick={handleClick} key={id} href={href} onMouseEnter={handleMouseEnter}>
                {liIcon && <Icon component={liIcon} />}
                <p className={cn({ [style.text]: liIcon })}>{text}</p>
            </As> */}
        </ListContext.Provider>
    );
}

List.Li = Li;
List.Option = Option;

export default List;
