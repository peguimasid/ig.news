import '../styles/globals.css';

import { FunctionComponent } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
