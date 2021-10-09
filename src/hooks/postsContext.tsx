import { createContext } from 'react';
import useUserPosts from './useUserPosts';

export const postsContext = createContext([]);

type postsContextT = {
    children: React.ReactNode;
};

const PostsContextProvider: React.FC<postsContextT> = ({ children }) => {
    const [data] = useUserPosts();
    return <postsContext.Provider value={data}>{children}</postsContext.Provider>;
};

export default PostsContextProvider;
