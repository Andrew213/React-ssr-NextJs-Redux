import React from 'react';
import useUserdata, { IUserData } from './useUserData';

export const userContext = React.createContext<IUserData>({});

type UserContextProviderT = {
    children: React.ReactNode;
};

const UserContextProvider: React.FC<UserContextProviderT> = ({ children }) => {
    const [data] = useUserdata();

    return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export default UserContextProvider;
