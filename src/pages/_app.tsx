import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
