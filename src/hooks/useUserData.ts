import { tokenContext } from '@/hooks/tokenContext';
import { useEffect, useState, useContext } from 'react';

export interface IUserData {
    name?: string;
    iconImg?: string;
}

const useUserdata = () => {
    const [data, setData] = useState<IUserData>({});
    const token = useContext(tokenContext);

    useEffect(() => {
        async function getUserData() {
            if (token) {
                const resp = await fetch('https://oauth.reddit.com/api/v1/me?raw_json=1', {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                });
                const foo = await resp.json();
                setData({
                    name: foo.name,
                    iconImg: foo.icon_img,
                });
            }
        }
        void getUserData();
    }, []);

    return [data];
};

export default useUserdata;
