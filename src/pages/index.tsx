import Head from 'next/head';

import { FunctionComponent } from 'react';

const Home: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <div className="bg-black w-full h-screen flex justify-center items-center font-sans">
        <h1 className="text-20 text-white">Hello world</h1>
      </div>
    </>
  );
};

export default Home;
