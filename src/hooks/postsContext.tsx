import React, { useContext, useEffect, useState } from 'react';
import { tokenContext } from './userContext';

export const postsContext = React.createContext([]);

export const useUserPosts = () => {
    const [posts, setPosts] = useState([]);
    const token = useContext(tokenContext);
    useEffect(() => {
        const foo = async () => {
            const response = await fetch('https://oauth.reddit.com/best?sr_detail=true', {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            const postsFromAPI = await response.json();
            setPosts([...posts, postsFromAPI]);
        };
        void foo();
    }, []);
    return [posts];
};

export const PostsContextProvider: React.FC = ({ children }) => {
    const [posts] = useUserPosts();
    return <postsContext.Provider value={posts}>{children}</postsContext.Provider>;
};
