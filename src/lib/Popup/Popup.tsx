import React from 'react';

import Portal from '../Portal/Portal';

export type PopupTrigger = 'hover' | 'click';

export type PopupProps = {
    content: React.ReactNode;
    children?: React.ReactNode;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    getPopupContainer?: (node: Element) => Element;
    className?: string;
    trigger?: PopupTrigger;
    minWidth?: string | number;
    maxWidth?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    offsetX?: number;
    offsetY?: number;
    style?: React.CSSProperties;
    destroyOnHide?: boolean;
};

const Popup: React.ForwardRefRenderFunction<unknown, PopupProps> = (props, ref) => {
    const {
        content,
        children,
        visible,
        className,
        trigger = 'click',
        maxHeight = 120,
        minHeight = 40,
        maxWidth = 200,
        minWidth = 100,
        offsetX = 0,
        getPopupContainer,
        onVisibleChange,
        offsetY = 0,
        destroyOnHide,
        style,
    } = props;

    const isMounted = React.useRef(false);

    const delayTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const domNodeRef = React.useRef<Element>();
    const popupRef = React.useRef<HTMLDivElement>(null);
    const mountNodeRef = React.useRef<Element>(document.body);

    const defaultState: React.CSSProperties = React.useMemo(() => {
        return {
            visibility: 'hidden',
        };
    }, []);

    const [popupVisible, setPopupVisible] = React.useState(Boolean(visible));

    const popupStyle: React.CSSProperties = {
        position: 'absolute',
        minWidth,
        minHeight,
        maxWidth: maxWidth || undefined,
        maxHeight: maxHeight || undefined,
        zIndex: 100,
    };

    let childElement = children;

    React.Children.only(children);

    React.useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (visible === undefined) return;
        setPopupVisible(visible);
    }, [visible]);

    const setVisible = React.useCallback(
        (isVisible: boolean) => {
            if (!isMounted.current) return;
            if (visible !== undefined) {
                onVisibleChange && onVisibleChange(isVisible);
                return;
            }
            setPopupVisible(isVisible);
        },
        [visible, onVisibleChange]
    );

    if (React.isValidElement(children)) {
        childElement = React.cloneElement(children, { ref: domNodeRef });
    }

    const clearDelayTimer = () => {
        if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = null;
        }
    };

    const onClick = React.useCallback(
        (e: Event) => {
            e.preventDefault();
            setVisible(!popupVisible);
        },
        [popupVisible, setVisible]
    );

    /**
     * Обработчик события при клике на документ
     * Используется, чтобы закрыть компонент Popup при клике на свободную зону
     */

    const onBodyClick = React.useCallback(
        (e: Event) => {
            const { current: domNode } = domNodeRef;
            const { current: popupNode } = popupRef;
            // Проверка, что event.target является сущностью Element, или что дочерний компонент содержит event.target
            if (
                !popupVisible ||
                !(e.target instanceof Element) ||
                domNode?.contains(e.target) ||
                popupNode?.contains(e.target)
            ) {
                return;
            }

            setTimeout(() => {
                setVisible(false);
            });
        },
        [popupVisible, setVisible]
    );

    React.useEffect(() => {
        const { current: domNode } = domNodeRef;
        if (!domNode) return;
        if (ref && 'current' in ref) {
            ref.current = domNode;
        }
        if (getPopupContainer) mountNodeRef.current = getPopupContainer(domNode);

        if (trigger === 'click') {
            domNode.addEventListener('click', onClick);

            if (popupVisible) {
                document.addEventListener('click', onBodyClick);
            }
        }

        return () => {
            if (trigger === 'click') {
                domNode.removeEventListener('click', onClick);
                document.removeEventListener('click', onBodyClick);
            }
        };
    }, [getPopupContainer, onBodyClick, onClick, popupVisible, ref, trigger]);

    /**
     * Эффект, чтобы навешивать события управления видимостью на dom-элемент компонента Popup в зависимости от выбранного trigger
     * Мы можем получить dom-элемент компонента Popup, только после того как он отрендерится и будет видимым
     * Используем такой механизм, а не вешаем синтетические React-события сразу на компонент, т.к. важен порядок привязки событий
     */

    React.useEffect(() => {
        const { current: domNode } = domNodeRef;
        const { current: popupNode } = popupRef;
    });

    const isVisible = popupVisible || !destroyOnHide;

    return (
        <>
            {childElement}
            <>
                {isVisible && (
                    <Portal parent={mountNodeRef.current}>
                        <div ref={popupRef} className={className} style={{ ...style, ...popupStyle }}>
                            {content}
                        </div>
                    </Portal>
                )}
            </>
        </>
    );
};
