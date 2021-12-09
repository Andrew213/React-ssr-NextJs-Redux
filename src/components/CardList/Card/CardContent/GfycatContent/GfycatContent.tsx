import { imgSizeT } from '@/interfaces/PostType';
import React, { ComponentProps } from 'react';
import { Dimensions, getImgContainerStyle } from '../ImgContent/ImgContent';

import styles from './styles.module.scss';

type Props = ComponentProps<'iframe'> & {
    intrinsicSize: imgSizeT;
    className?: string;
    src: string;
} & Partial<Dimensions>;

const GfycatContent: React.FC<Props> = ({ intrinsicSize, src, className, ...restProps }) => {
    return (
        <div style={getImgContainerStyle(intrinsicSize)}>
            <iframe
                src={src}
                className={styles.gfycat}
                scrolling="no"
                allowFullScreen={true}
                allow="autoplay; fullscreen"
                {...restProps}
            />
        </div>
    );
};

export default GfycatContent;
