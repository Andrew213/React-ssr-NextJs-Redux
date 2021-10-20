import React, { useContext, useEffect, useState } from 'react';

export const tokenContext = React.createContext('');
export const userContext = React.createContext({});

export const useUserData = () => {
    const [data, setData] = useState({});
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

export const UserContextProvider: React.FC = ({ children }) => {
    const [data] = useUserData();
    return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
