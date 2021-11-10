import React from 'react';
import cn from 'classnames';
import authorAvatar2 from '@img/avatar2.png';
import Typography from '@/lib/Typography/Typography';
import Image from 'next/image';

import styles from './styles.module.scss';
import { authorT } from '@/interfaces/PostType';

type User_infoProps = {
    created?: string | number;
    author?: authorT;
    className?: string;
    subreddit?: string;
};

const User_info: React.FC<User_infoProps> = ({ subreddit, className, created, author }) => {
    return (
        <div className={cn(styles.userInfo, { [className]: className })}>
            <Typography As="p" size={14} className={styles.userInfo__published}>
                {created}
            </Typography>
            <button className={styles.userInfo__profile}>
                <Image
                    src={author.icon_img ? author.icon_img : authorAvatar2}
                    width={20}
                    height={20}
                    className={styles.userInfo__authorAvatar}
                    objectFit="contain"
                    objectPosition="center"
                />
                <Typography As="p" size={14} className={styles.userInfo__author}>
                    {author.name ? author.name : 'Anonim Anonim'}
                </Typography>
            </button>
            {subreddit && <button className={styles.userInfo__subreddit}>{`${subreddit}`}</button>}
        </div>
    );
};

export default User_info;
