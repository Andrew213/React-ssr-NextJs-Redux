import { imgSizeT } from '@/interfaces/PostType';
import React, { ComponentProps } from 'react';
import ReactPlayer from 'react-player';
import { Dimensions, getImgContainerStyle } from '../ImgContent/ImgContent';

import styles from './styles.module.scss';

type DivProps = ComponentProps<'div'> & {
    intrinsicSize: imgSizeT;
    className?: string;
    src: string;
} & Partial<Dimensions>;

const VideoContent: React.FC<DivProps> = ({ intrinsicSize, src, className, ...divProps }) => {
    const { width, height } = intrinsicSize;
    return (
        <div style={getImgContainerStyle(intrinsicSize)}>
            <div className={styles.videoContainer}>
                <ReactPlayer url={src} playing muted controls />
            </div>
        </div>
    );
};

export default VideoContent;
