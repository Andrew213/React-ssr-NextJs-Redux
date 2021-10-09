import React from 'react';

export type IconProps = {
    component: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined | string;
    iconClassName?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    size?: number;
};

const Icon: React.FC<IconProps> = props => {
    const { component: Component, onClick, iconClassName, size } = props;

    const svgProps: React.SVGProps<SVGSVGElement> = {};

    if (size) {
        svgProps.width = size;
        svgProps.height = size;
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        onClick && onClick(e);
    };

    return (
        <span className={iconClassName} onClick={handleClick}>
            <Component {...svgProps} />
        </span>
    );
};

export default Icon;
