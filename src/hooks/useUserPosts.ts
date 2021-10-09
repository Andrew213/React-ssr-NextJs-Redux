import { tokenContext } from '@/hooks/tokenContext';
import { useState, useEffect, useContext } from 'react';

const useUserPosts = () => {
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

export default useUserPosts;
