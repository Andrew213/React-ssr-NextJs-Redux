import React from 'react';

type commentContextType = {
    value: string;
    onChange: (value: string) => void;
};

export const commentContext = React.createContext<commentContextType>({
    value: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
});
