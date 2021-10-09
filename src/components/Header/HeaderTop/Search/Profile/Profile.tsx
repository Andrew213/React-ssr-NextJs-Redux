import React, { useContext } from 'react';
import anonim from '@icons/Desktop/anonim.svg';
import Icon from '@/lib/Icon/Icon';
import Typography from '@/lib/Typography/Typography';
import Link from 'next/link';
import { userContext } from '@/hooks/userContext';

import style from './styles.module.scss';
import { postsContext } from '@/hooks/postsContext';

const REDIRECT_URI = 'http://localhost:8080/auth';

type ProfileT = {
    token?: string;
};

const Profile: React.FC<ProfileT> = () => {
    const data = useContext(userContext);
    // console.log(data);

    return (
        <div>
            <Link
                href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.USER_ID}&response_type=code&state=random_string&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=read submit identity`}
            >
                <a className={style.profile}>
                    {data.iconImg ? (
                        <img src={data.iconImg} className={style.profile__avatar} />
                    ) : (
                        <Icon component={anonim} iconClassName={style.profile__avatar} />
                    )}
                    <Typography className={style.profile__text} As="span" weight={500} size={20}>
                        {data.name ? data.name : 'Аноним'}
                    </Typography>
                </a>
            </Link>
        </div>
    );
};

export default Profile;
