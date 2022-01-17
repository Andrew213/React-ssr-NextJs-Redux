import React from 'react';
import cn from 'classnames';

import { ListContext } from './List';
import Li from './Li';

export type OptionProps = {
    value: string | number;
    className?: string;
    style?: React.CSSProperties;
    clickStopPropagation?: boolean;
    onMouseEnter?: (value: string) => void;
    disabled?: boolean;
    selected?: boolean;
    children?: React.ReactNode;
    liIcon?: string;
};

let foo: NodeJS.Timeout;

const Option: React.ForwardRefRenderFunction<unknown, OptionProps> = (props, ref) => {
    const { value, children, className, style, disabled, selected, clickStopPropagation, onMouseEnter, liIcon } = props;
    const { onOptionClick } = React.useContext(ListContext);

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        if (disabled) return;

        if (clickStopPropagation) e.stopPropagation();

        onOptionClick(value, children);
    };

    const handleMouseEnter = React.useCallback(() => {
        onMouseEnter && onMouseEnter(String(value));
    }, [onMouseEnter, value]);

    return (
        <Li
            className={className}
            style={style}
            ref={ref}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            liIcon={liIcon}
        >
            {children}
        </Li>
    );
};

export default React.forwardRef<unknown, OptionProps>(Option);
