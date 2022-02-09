import Head from 'next/head';
import Image from 'next/image';

import { FunctionComponent } from 'react';

const Home: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className="max-w-lg mx-auto h-[calc(100vh-5.2rem)] flex flex-col md:flex-row items-center justify-between text-white">
        <section className="max-w-sm">
          <span className="text-15 font-semibold">👏 Hey, welcome</span>
          <h1 className="text-44 leading-11 font-900 mt-24">
            News about the <br />
            <span className="text-cyan-A500">React</span> world.
          </h1>
          <p className="text-15 leading-6 mt-16">
            Get access to all the publications <br />
            <span className="text-cyan-A500 font-semibold">
              For $9.90 month
            </span>
          </p>
        </section>
        <Image
          src="/images/avatar.svg"
          alt="Girl coding"
          width="400"
          height="400"
        />
      </main>
    </>
  );
};

export default Home;
