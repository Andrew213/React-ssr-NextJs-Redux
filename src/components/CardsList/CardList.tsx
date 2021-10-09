import React, { useContext } from 'react';
import useMountEffect from '@/hooks/useMountEffect';
import Loader from 'react-loader-spinner';
import nanoid from 'nanoid';
import pic from '@img/pic.jpg';
import pic2 from '@img/pic2.jpg';
import avatar from '@img/avatar.png';
import avatar2 from '@img/avatar2.png';
import { postsContext } from '@/hooks/postsContext';
import Card from './Card/Card';

import styles from './styles.module.scss';

const users: UserT[] = [
    {
        userName: 'Констанин Кодов',
        title: 'Реплицированные с зарубежных источников возможности',
        publicTime: 1,
        id: nanoid(5),
        img: pic,
        avatar,
    },
    {
        userName: 'Петров Владимир',
        title: 'Следует отметить, что новая модель организационной деятельности...',
        publicTime: 5,
        id: nanoid(5),
        img: pic2,
        avatar: avatar2,
    },
];

type UserT = {
    userName: string;
    title: string;
    publicTime: number;
    id: number | string;
    img: string;
    avatar: string;
};

const CardsList: React.FC = () => {
    useMountEffect(() => {
        console.log(1);
    });
    const [posts, setPosts] = React.useState([]);
    const postsData = useContext(postsContext)[0];

    React.useEffect(() => {
        if (postsData) {
            const postsArr = postsData.data.children;
            const postsCopy = posts.slice();
            for (let i = 0; i <= 1; i++) {
                postsCopy.splice(i, 1);
                postsCopy.push(postsArr[Math.floor(Math.random() * postsData.data.children.length)]);
            }
            setPosts(postsCopy);
        }
    }, [postsData]);

    return (
        <>
            {posts.length > 0 ? (
                <ul className={styles.cardsList}>
                    {posts.map(({ data }, i) => (
                        <Card
                            key={i}
                            userName={data.author}
                            title={data.title}
                            publicTime={5}
                            id={i}
                            img={data.sr_detail.banner_img}
                            avatar={data.sr_detail.icon_img}
                        />
                    ))}
                </ul>
            ) : (
                <div className={styles.cardsList__load}>
                    <Loader type="Circles" color="#cc6633" height={100} width={100} timeout={3000} />
                </div>
            )}
        </>
    );
};

export default CardsList;
