import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
    className?: string;
    parent?: Element;
};

const Portal: React.FC<PortalProps> = ({ children, parent, className }) => {
    const el = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        const target = parent && parent.appendChild ? parent : document.body;
        const classList: string[] = ['portal'];

        if (className) {
            className.split(' ').forEach(cn => classList.push(cn));
        }
        classList.forEach(cn => el.classList.add(cn));

        target.appendChild(el);

        return () => {
            target.removeChild(el);
        };
    }, [className, el, el.classList, parent]);

    return createPortal(children, el);
};

export default Portal;
