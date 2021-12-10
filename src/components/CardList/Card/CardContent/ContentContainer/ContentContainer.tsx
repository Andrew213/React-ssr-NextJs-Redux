import { imgSizeT } from '@/interfaces/PostType';
import React, { ComponentProps, CSSProperties } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type Dimensions = { width: number; height: number };

const fractionToPercentage = (n: number) => n * 100;
const formatCssPercentage = (n: number) => `${n}%`;
const fractionToCssPercentage = (n: number) => formatCssPercentage(fractionToPercentage(n));

const numberToPixels = (n: number) => `${n}px`;

const getContainerStyles = ({ width, height }: Partial<Dimensions>): CSSProperties => ({
    ...(width !== undefined ? { width: numberToPixels(width) } : {}),
    ...(height !== undefined ? { height: numberToPixels(height) } : {}),
});

/**
 * Provides a `padding-bottom` percentage in proportion to the parent element's width.
 * This allows us to reserve space for where an image will load.
 * http://andyshora.com/css-image-container-padding-hack.html
 * https://css-tricks.com/aspect-ratio-boxes/
 */
const getImgContainerStyles = (intrinsicSize: Dimensions): CSSProperties => {
    const heightAsWidth = intrinsicSize.height / intrinsicSize.width;
    const heightAsPercentageOfWidthLength = fractionToCssPercentage(heightAsWidth);

    return {
        paddingBottom: heightAsPercentageOfWidthLength,
    };
};

type Props = ComponentProps<'div'> & {
    intrinsicSize: imgSizeT;
    className?: string;
    children: React.ReactElement;
} & Partial<Dimensions>;

const ContentContainer: React.FC<Props> = ({ children, intrinsicSize, className }) => {
    return (
        <div
            className={cn(styles.contentContainer, { [className]: className })}
            style={getImgContainerStyles(intrinsicSize)}
        >
            {/* <img {...imgProps} src={src} /> */}
            {children}
        </div>
    );
};

export default ContentContainer;
