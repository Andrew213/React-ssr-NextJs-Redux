import PostType from '@/interfaces/PostType';
import React, { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import ContentContainer from './ContentContainer/ContentContainer';
import { splitUrl } from '@/utils/postTransform';
import parse from 'html-react-parser';
import ParserOptions from 'html-react-parser';
import domToReact, { HTMLReactParserOptions } from 'html-react-parser/lib/dom-to-react';
import { Element } from 'domhandler/lib/node';
import styles from './styles.module.scss';

const CardContent: React.FC<PostType> = ({ content, content_size }) => {
    const { type, url } = content;

    const switchContent = (type: string): ReactElement => {
        let selfHtmlText;

        if (type === 'Self') {
            // console.log(url);
            selfHtmlText = parse(url, {
                replace: domnode => {
                    if (domnode instanceof Element && domnode.attribs && domnode.name === 'a') {
                        const [domain, rest] = splitUrl(domnode.attribs.href);
                        const lowerDomain = domain.toLocaleLowerCase();
                        if (/(reddit\.com)/.exec(lowerDomain)) {
                            return (
                                <a href={rest} target="_blank" rel="noreferrer">
                                    {(domnode.children[0] as any).data}
                                </a>
                            );
                        }
                        if (domnode.attribs.href.includes('.png')) {
                            return (
                                <div className={styles.contentContainer}>
                                    <img src={domnode.attribs.href} alt="" />
                                </div>
                            );
                        }
                        if (domnode.attribs.href.startsWith('/r/')) {
                            return (
                                <a href={domnode.attribs.href} target="_blank" rel="noreferrer">
                                    {domnode.attribs.href}
                                </a>
                            );
                        }
                    }
                    return domnode;
                },
            });
        }

        switch (type) {
            case 'Image':
                return (
                    <div className={styles.contentContainer}>
                        <ContentContainer intrinsicSize={content_size}>
                            <Image src={url} layout="fill" quality={80} objectFit="contain" />
                        </ContentContainer>
                    </div>
                );
            case 'Gif':
                return (
                    <div className={styles.contentContainer}>
                        <ContentContainer intrinsicSize={content_size}>
                            <iframe
                                src={url}
                                className={styles.gfycat}
                                scrolling="no"
                                allowFullScreen={true}
                                allow="autoplay; fullscreen"
                            />
                        </ContentContainer>
                    </div>
                );
            case 'Video':
                return (
                    <div className={styles.contentContainer}>
                        <ContentContainer intrinsicSize={content_size}>
                            <ReactPlayer url={url} playing={!content?.isGif} muted controls />
                        </ContentContainer>
                    </div>
                );
            // case 'GifV':
            //     return (
            //         <div className={styles.contentContainer}>
            //             <ContentContainer intrinsicSize={content_size}>
            //                 <ReactPlayer url={url} playing={!content?.isGif} muted controls />
            //             </ContentContainer>
            //         </div>
            //     );
            case 'justLink':
                return (
                    <a href={url} target="_blank" rel="noreferrer" className={styles.justLink}>
                        {url}
                    </a>
                );
            case 'RichVideo':
                return (
                    <div className={styles.contentContainer}>
                        <ContentContainer intrinsicSize={content_size}>
                            <div dangerouslySetInnerHTML={{ __html: url }} className={styles.rich} />
                        </ContentContainer>
                    </div>
                );
            case 'Self':
                return <>{selfHtmlText}</>;
            default:
                return <div>{'ad'}</div>;
        }
    };

    return <>{switchContent(type)}</>;
};

export default CardContent;
