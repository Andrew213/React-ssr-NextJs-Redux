import React from 'react';
import cn from 'classnames';
import avatar2 from '@img/avatar.png';
import Typography from '@/lib/Typography/Typography';
import Image from 'next/image';

import styles from './styles.module.scss';

type User_infoProps = {
    publicTime?: string;
    avatar?: string;
    nickName?: string;
    className?: string;
    subreddit?: string;
};

const User_info: React.FC<User_infoProps> = ({ subreddit, className, publicTime, nickName, avatar }) => {
    return (
        <div className={cn(styles.userInfo, { [className]: className })}>
            <Typography As="p" size={14} className={styles.userInfo__published}>
                {publicTime}
            </Typography>
            <button className={styles.userInfo__profile}>
                <Image
                    src={avatar ? avatar : avatar2}
                    width={20}
                    height={20}
                    className={styles.userInfo__avatar}
                    objectFit="contain"
                    objectPosition="center"
                />
                <Typography As="p" size={14} className={styles.userInfo__nickName}>
                    {nickName ? nickName : 'Anonim Anonim'}
                </Typography>
            </button>
            {subreddit && <button className={styles.userInfo__subreddit}>{`${subreddit}`}</button>}
        </div>
    );
};

export default User_info;
