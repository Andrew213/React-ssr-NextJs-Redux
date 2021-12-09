import { imgSizeT } from '@/interfaces/PostType';
import React, { ComponentProps, CSSProperties } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

const fractionToPercentage = (n: number) => n * 100;
const formatCssPercentage = (n: number) => `${n}%`;
const fractionToCssPercentage = (n: number) => formatCssPercentage(fractionToPercentage(n));

export const getImgContainerStyle = (intrinsicSize: imgSizeT) => {
    const { width, height } = intrinsicSize;
    const heightAsWidth = height / width;
    const heightAsPercentageOfWidthLength = fractionToCssPercentage(heightAsWidth);

    return {
        paddingBottom: heightAsPercentageOfWidthLength,
    };
};

// const numberToPixels = (n: number) => `${n}px`;

export type Dimensions = { width: number; height: number };

// export const getContainerStyles = ({ width, height }: Partial<Dimensions>): CSSProperties => ({
//     ...(width !== undefined ? { width: numberToPixels(width) } : {}),
//     ...(height !== undefined ? { height: numberToPixels(height) } : {}),
// });

type Props = ComponentProps<'img'> & {
    intrinsicSize: imgSizeT;
    className?: string;
} & Partial<Dimensions>;

const ImgContent: React.FC<Props> = ({ intrinsicSize, src, width, height, ...imgProps }) => {
    return (
        // <div style={getContainerStyles({ width, height })}>
        <div style={getImgContainerStyle(intrinsicSize)}>
            {/* <img {...imgProps} src={src} /> */}
            <Image src={src} layout="fill" quality={80} />
        </div>
        // </div>
    );
};

export default ImgContent;
