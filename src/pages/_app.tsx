import { ReactElement } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { useStore } from '@/store/store';
import { Session } from 'next-auth';
import { getSession, GetSessionOptions, Provider as SessionProvider } from 'next-auth/client';

import '@styles/global.scss';

interface AppType extends AppProps {
    session: Session;
}

const MyApp = ({ Component, pageProps, session }: AppType): ReactElement => {
    return (
        <Provider store={store}>
            <SessionProvider session={session} options={{ baseUrl: process.env.NEXTAUTH_URL }}>
                <Component {...pageProps} />
            </SessionProvider>
        </Provider>
    );
};

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);
    const session = await getSession(context as GetSessionOptions);

    return {
        ...appProps,
        session,
    };
};

export default MyApp;
