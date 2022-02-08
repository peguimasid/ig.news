import Head from 'next/head';

import { FunctionComponent } from 'react';

const Home: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <div>
        <h1 className="text-20 text-yellow-A500">Hello world</h1>
      </div>
    </>
  );
};

export default Home;
