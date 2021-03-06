import React, { MouseEvent } from 'react';
import cn from 'classnames';
import Portal from '../Portal/Portal';

import styles from './styles.module.scss';

export type ModalProps = {
    children?: React.ReactNode;
    visible: boolean;
    className?: string;
    title?: string;
    onCancel?: (e: MouseEvent<HTMLElement>) => void;
    width?: number;
    maskClosable?: boolean;
};

const Modal: React.ForwardRefRenderFunction<unknown, ModalProps> = (
    { visible, className, title, onCancel, maskClosable = true, children, width = 600 },
    ref
) => {
    const [active, setActive] = React.useState(false);

    const classNames = cn(
        styles.modal,
        styles.modal__mask,
        { [styles.modal__mask_active]: active && visible },
        className
    );

    const contentStyle: React.CSSProperties = {
        width,
    };

    React.useEffect(() => {
        if (visible) {
            setTimeout(() => {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
                setActive(visible);
            }, 10);
        }
    }, [visible]);

    const transitionEnd = () => {
        setActive(visible);
    };

    const handleContentClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    const handleClose = React.useCallback(
        (e: MouseEvent<HTMLElement>) => {
            onCancel && onCancel(e);
        },
        [onCancel]
    );

    const handleMaskClick = (e: MouseEvent<HTMLElement>) => {
        if (!maskClosable) return;
        handleClose(e);
    };

    React.useEffect(() => {
        if (visible || active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [active, visible]);

    return (
        <>
            {(visible || active) && (
                <Portal>
                    <div className={classNames} onTransitionEnd={transitionEnd} onClick={handleMaskClick}>
                        <div className={styles.modal__content} style={contentStyle} onClick={handleContentClick}>
                            {children}
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default React.forwardRef<unknown, ModalProps>(Modal);
