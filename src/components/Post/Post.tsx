import React, { useCallback, useEffect, useRef } from 'react';
import Typography from '@/lib/Typography/Typography';
import Image from 'next/image';
import Karma from '../CardList/Card/Karma/Karma';
import banner2 from '@img/banner.jpg';
import pic1 from '@img/gallery_1_1.jpg';
import pic2 from '@img/gallery_1_2.jpg';
import pic3 from '@img/gallery_2_1.jpg';
import pic4 from '@img/gallery_2_2.jpg';
import pic5 from '@img/gallery_2_3.jpg';
import pic6 from '@img/gallery_3_1.jpg';
import pic7 from '@img/gallery_3_2.jpg';
import CommentsForm from './Comment/CommentForm/CommentForm';
import Comment from './Comment/Comment';
import cn from 'classnames';
import User_info from '../CardList/Card/User_info/User_info';
import Portal from '@/lib/Portal/Portal';
import List from '@/lib/List/List';
import { dropDownList } from '@/utils/dropDownList';

import styles from './styles.module.scss';

type PostProps = {
    title?: string;
    avatar?: string;
    nickName?: string;
    onClose?: () => void;
    publicTime?: string;
    className?: string;
    subreddit?: string;
    banner?: string;
    triggerNode?: React.RefObject<HTMLButtonElement>;
};

const Post: React.FC<PostProps> = ({
    triggerNode,
    title,
    nickName,
    publicTime,
    avatar,
    subreddit,
    onClose,
    className,
    banner,
}) => {
    const getAnswer = useCallback((value: string) => {
        console.log(value);
    }, []);

    const handleCommentChange = useCallback((value: string) => {
        switch (value) {
            case 'Answer':
                getAnswer(value);
                break;
        }
    }, []);

    const postRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerBtn = triggerNode.current.children[0];
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && e.target !== triggerBtn && !postRef.current?.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <Portal className={className}>
            <div className={styles.post} ref={postRef}>
                <div className={styles.post__header}>
                    <Karma />
                    <div className={styles.post__user}>
                        <Typography As="h2" size={20} weight={400} className={styles.post__title}>
                            {title ? title : 'Here is any Title'}
                        </Typography>
                        <User_info subreddit={subreddit} nickName={nickName} publicTime={publicTime} avatar={avatar} />
                    </div>
                </div>
                <Typography As="p" className={styles.post__text} size={14} weight={400}>
                    Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное, как
                    квинтэссенцию победы маркетинга над разумом и должны быть ассоциативно распределены по отраслям.
                    Прежде всего, начало повседневной работы по формированию позиции однозначно фиксирует необходимость
                    кластеризации усилий. Но сторонники тоталитаризма в науке и по сей день остаются уделом либералов,
                    которые жаждут быть превращены в посмешище, хотя само их существование приносит несомненную пользу
                    обществу.
                </Typography>
                <figure className={styles.post__imgWrapper}>
                    <Image src={banner ? banner : banner2} width={840} height={494} className={styles.post__banner} />
                    <figcaption className={styles.post__imgCaption}>
                        Учитывая ключевые сценарии поведения, социально-экономическое развитие играет определяющее
                        значение.
                    </figcaption>
                </figure>
                <Typography As="p" className={styles.post__text} size={14} weight={400}>
                    Безусловно, глубокий уровень погружения создаёт необходимость включения в производственный план
                    целого ряда внеочередных мероприятий с учётом комплекса системы массового участия. Внезапно,
                    сделанные на базе интернет-аналитики выводы освещают чрезвычайно интересные особенности картины в
                    целом, однако конкретные выводы, разумеется, описаны максимально подробно.
                </Typography>
                <div className={cn(styles.post__gallery, styles.post__gallery_first)}>
                    <figure className={styles.post__imgWrapper}>
                        <div className={styles.post__gallery2_img}>
                            <Image quality={100} src={pic1} layout="responsive" />
                        </div>
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Господа, высококачественный прототип будущего проекта играет определяющее значение для как
                            самодостаточных, так и внешне зависимых концептуальных решений.
                        </figcaption>
                    </figure>
                    <figure className={styles.post__imgWrapper}>
                        <div className={styles.post__gallery2_img}>
                            <Image quality={100} src={pic2} layout="responsive" />
                        </div>
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Принимая во внимание показатели успешности, разбор внешних противодействий обеспечивает
                            актуальность форм воздействия.
                        </figcaption>
                    </figure>
                </div>
                <Typography As="p" className={styles.post__text} size={14} weight={400}>
                    Разнообразный и богатый опыт говорит нам, что выбранный нами инновационный путь обеспечивает
                    широкому кругу (специалистов) участие в формировании новых принципов формирования
                    материально-технической и кадровой базы. Также как существующая теория в значительной степени
                    обусловливает важность благоприятных перспектив. Для современного мира консультация с широким
                    активом однозначно определяет каждого участника как способного принимать собственные решения касаемо
                    приоритизации разума над эмоциями!
                </Typography>
                <div className={cn(styles.post__gallery, styles.post__gallery_second)}>
                    <figure className={styles.post__imgWrapper}>
                        <Image src={pic3} width={267} height={193} />
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Таким образом, разбавленное изрядной долей эмпатии, рациональное мышление играет важную
                            роль.
                        </figcaption>
                    </figure>
                    <figure className={styles.post__imgWrapper}>
                        <Image src={pic4} width={267} height={193} />
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Не следует, однако, забывать, что глубокий уровень способствует.
                        </figcaption>
                    </figure>

                    <figure className={styles.post__imgWrapper}>
                        <Image src={pic5} width={267} height={193} />
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Но сторонники тоталитаризма в науке, инициированные исключительно.
                        </figcaption>
                    </figure>
                </div>
                <Typography As="p" className={styles.post__text} size={14} weight={400}>
                    Вот вам яркий пример современных тенденций - постоянный количественный рост и сфера нашей активности
                    обеспечивает актуальность глубокомысленных рассуждений! Не следует, однако, забывать, что
                    высококачественный прототип будущего проекта предполагает независимые способы реализации дальнейших
                    направлений развития.
                </Typography>
                <div className={cn(styles.post__gallery, styles.post__gallery_third)}>
                    <figure className={styles.post__imgWrapper}>
                        <Image src={pic6} width={410} height={297} />
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Значимость этих проблем настолько очевидна, что разбавленное изрядной долей эмпатии,
                            рациональное мышление говорит о возможностях вывода текущих активов.
                        </figcaption>
                    </figure>

                    <figure className={styles.post__imgWrapper}>
                        <Image src={pic7} width={410} height={297} />
                        <figcaption className={cn(styles.post__imgCaption, styles.post__imgCaption_first)}>
                            Господа, понимание сути ресурсосберегающих технологий обеспечивает актуальность новых
                            принципов формирования материально-технической и кадровой базы!
                        </figcaption>
                    </figure>
                </div>
                <div className={styles.post__control}>
                    {dropDownList.map((el, i) => {
                        if (el.id === 'Close') {
                            delete dropDownList[i];
                        }
                        return (
                            <List
                                id={el.id}
                                key={el.id}
                                As={el.As}
                                text={el.text}
                                className={styles.listItem}
                                liIcon={el.liIcon}
                            />
                        );
                    })}
                </div>
                <CommentsForm nickName={nickName} />
                <Comment
                    onChange={handleCommentChange}
                    avatar={avatar}
                    nickName={nickName}
                    published={publicTime}
                    subreddit={subreddit}
                />
            </div>
        </Portal>
    );
};

export default Post;
