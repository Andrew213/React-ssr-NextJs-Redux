import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import Icon from '../Icon/Icon';

type DropDownProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onTriggerClick?: (isOpen: boolean) => void;
    className?: string;
    triggerActive?: string;
    prefix?: React.ComponentType<React.SVGProps<SVGSVGElement>> | string | undefined;
    suffix?: React.ComponentType<React.SVGProps<SVGSVGElement>> | string | undefined;
    prefixSize?: number;
    suffixSize?: number;
};

const DropDown: React.FC<DropDownProps> = props => {
    const {
        trigger,
        children,
        isOpen,
        onClose,
        onOpen,
        onTriggerClick,
        className,
        prefixSize,
        suffixSize,
        triggerActive,
        prefix,
        suffix,
    } = props;
    const rootEl = React.useRef(null);
    const [isDropDownOpen, setIsDropDownOpen] = React.useState<boolean>(false);

    const handleOpen = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!isOpen) setIsDropDownOpen(!isDropDownOpen);
        },
        [isDropDownOpen, isOpen]
    );

    const handleOnItemClick = React.useCallback(() => setIsDropDownOpen(false), []);

    React.useEffect(() => onTriggerClick && onTriggerClick(isDropDownOpen), [isDropDownOpen, onTriggerClick]);

    React.useEffect(() => {
        const onClick = (e: MouseEvent) => rootEl.current.contains(e.target) || setIsDropDownOpen(false);
        document.addEventListener('click', onClick);
        return document.removeEventListener('click', onClick);
    }, []);

    return (
        <div className={styles.dropDown}>
            <div
                className={cn(styles.dropDown__trigger, { [styles.dropDown__trigger_flex]: prefix || suffix })}
                ref={rootEl}
                onClick={handleOpen}
            >
                {prefix && (
                    <Icon
                        component={prefix}
                        width={prefixSize}
                        height={prefixSize}
                        className={styles.dropDown__prefix}
                    />
                )}
                {trigger}
                {suffix && (
                    <Icon
                        component={suffix}
                        width={suffixSize}
                        height={suffixSize}
                        className={styles.dropDown__suffix}
                    />
                )}
            </div>
            {isDropDownOpen && (
                <div className={styles.dropDown__listContainer}>
                    <div className={cn(styles.dropDown__list, className)} onClick={handleOnItemClick}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
