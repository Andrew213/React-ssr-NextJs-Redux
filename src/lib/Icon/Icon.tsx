import React, { SVGProps } from 'react';

type IconProps = {
    component: React.ComponentType<SVGProps<SVGElement>> | undefined | string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    width?: number;
    height?: number;
    color?: string;
};

const Icon: React.FC<IconProps> = props => {
    const { component: Component, className, color, onClick, width, height } = props;
    const svgProps: React.SVGProps<SVGSVGElement> = {};

    if (width) svgProps.width = width;
    if (height) svgProps.height = height;
    if (color) svgProps.fill = color;

    const handleOnClick = React.useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            onClick && onClick(e);
        },
        [onClick]
    );

    return (
        <span className={className} onClick={handleOnClick}>
            <Component {...svgProps} className={className} />
        </span>
    );
};

export default Icon;
