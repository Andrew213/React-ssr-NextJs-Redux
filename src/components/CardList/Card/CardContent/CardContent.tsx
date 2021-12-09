import PostType, { ContentT } from '@/interfaces/PostType';
import React, { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import GfycatContent from './GfycatContent/GfycatContent';
import ImgContent from './ImgContent/ImgContent';

import styles from './styles.module.scss';
import VideoContent from './VideoContent/VideoContent';

const CardContent: React.FC<PostType> = ({ content, content_size }) => {
    const { type, url } = content;
    // const { height: contentHeight, width: ContentWidth } = content_size;

    const switchContent = (type: string): ReactElement => {
        switch (type) {
            case 'Image':
                return (
                    <div className={styles.imgContainer}>
                        <ImgContent className={styles.contentContainer} src={url} intrinsicSize={content_size} />
                    </div>
                );
            case 'Gif':
                return (
                    <div className={styles.imgContainer}>
                        <GfycatContent src={url} intrinsicSize={content_size} />
                        {/* <iframe
                            src={url}
                            className={styles.gfycat}
                            scrolling="no"
                            allowFullScreen={true}
                            allow="autoplay; fullscreen"
                            height={content_size.height}
                            width={content_size.width}
                            //   title={post.title}
                        /> */}
                    </div>
                );
            case 'Video':
                return (
                    <div className={styles.imgContainer}>
                        <VideoContent src={url} className={styles.contentContainer} intrinsicSize={content_size} />
                    </div>
                );
            default:
                return <div>{'ad'}</div>;
            // ImgPreviewContainer
            // case 'Gif':
            //     return (
            //         <ul>
            //             <li>
            //                 <h1>{`Пост с типом: ${post.content.type}`}</h1>
            //                 <h1>{`Aвтор: ${post.authorName}`}</h1>
            //             </li>
            //             <li>{`Заголовок поста: ${post.title}`}</li>
            //             <li>{`Данные поста: ${post.content.url}`}</li>
            //         </ul>
            //     );
            // case 'Video':
            //     return (
            //         <ul>
            //             <li>
            //                 <h1>{`Пост с типом: ${post.content.type}`}</h1>
            //                 <h1>{`Aвтор: ${post.authorName}`}</h1>
            //             </li>
            //             <li>{`Заголовок поста: ${post.title}`}</li>
            //             <li>{`Данные поста: ${post.content.url}`}</li>
            //         </ul>
            //     );
            // case 'Self':
            //     return (
            //         <ul>
            //             <li>
            //                 <h1>{`Пост с типом: ${post.content.type}`}</h1>
            //                 <h1>{`Aвтор: ${post.authorName}`}</h1>
            //             </li>
            //             <li>{`Заголовок поста: ${post.title}`}</li>
            //             <li>{`Данные поста: ${post.selfTextHtml}`}</li>
            //         </ul>
            //     );
            // case 'GifV':
            //     return (
            //         <ul>
            //             <li>
            //                 <h1>{`Пост с типом: ${post.content.type}`}</h1>
            //                 <h1>{`Aвтор: ${post.authorName}`}</h1>
            //             </li>
            //             <li>{`Заголовок поста: ${post.title}`}</li>
            //             <li>{`Данные поста: ${post.content.url}`}</li>
            //         </ul>
            //     );
            // case 'RichVideo':
            //     return (
            //         <ul>
            //             <li>
            //                 <h1>{`Пост с типом: ${post.content.type}`}</h1>
            //                 <h1>{`Aвтор: ${post.authorName}`}</h1>
            //             </li>
            //             <li>{`Заголовок поста: ${post.title}`}</li>
            //             <li>{`Данные поста: ${post.content.url}`}</li>
            //         </ul>
            //     );
            // case 'justLink':
            //     return (
            //         <ul>
            //             <li>
            //                 <h1>{`Пост с типом: ${post.content.type}`}</h1>
            //                 <h1>{`Aвтор: ${post.authorName}`}</h1>
            //             </li>
            //             <li>{`Заголовок поста: ${post.title}`}</li>
            //             <li>{`Данные поста: ${post.content.url}`}</li>
            //         </ul>
            //     );
        }
    };

    return <>{switchContent(type)}</>;
};

export default CardContent;
