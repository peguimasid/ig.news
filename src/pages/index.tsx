import Head from 'next/head';
import Image from 'next/image';

import { GetServerSideProps } from 'next';

import { stripe } from '../services/stripe';

import { FunctionComponent } from 'react';
import { SubscribeButton } from '../components/SubscribeButton';

import { formatPrice } from '../utils/formatPrice';

interface HomeProps {
  priceId: string;
  amount: number;
}

const Home: FunctionComponent<HomeProps> = ({ amount, priceId }) => {
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
              For {formatPrice(amount)} month
            </span>
          </p>
          <div className="mt-24">
            <SubscribeButton priceId={priceId} />
          </div>
        </section>
        <Image
          src="/images/avatar.svg"
          alt="Girl coding"
          width="500"
          height="500"
          loading="eager"
        />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KRO1yEOFAGk2toh4CSsiLyh');

  return {
    props: {
      priceId: price.id,
      amount: price.unit_amount / 100,
    },
  };
};
