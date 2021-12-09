import PostType, { ContentT } from '@/interfaces/PostType';
import React, { ReactElement } from 'react';
import ImgContent from './ImgContent/ImgContent';

import styles from './styles.module.scss';

const CardContent: React.FC<PostType> = ({ content, content_size }) => {
    const { type, url } = content;

    const switchContent = (type: string): ReactElement => {
        switch (type) {
            case 'Image':
                return (
                    <div className={styles.imgContainer}>
                        <ImgContent src={url} intrinsicSize={content_size} />
                    </div>
                );
                break;
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
