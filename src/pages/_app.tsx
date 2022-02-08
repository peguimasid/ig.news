import '../styles/globals.css';

import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import Header from '../components/Header';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
