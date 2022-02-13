import { FunctionComponent } from 'react';

import Head from 'next/head';
import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';

const Posts: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className="max-w-lg mx-auto px-20">
        <div className="max-w-sm mt-48 mx-auto">
          {[1, 2, 3].map((item) => (
            <a
              key={item}
              href="#"
              className="block mt-20 pt-20 border-t-1 border-t-grey-A700 first:mt-0 first:p-0 first:border-0 group"
            >
              <time className="text-10 flex items-center text-grey-A300">
                12 de março de 2021
              </time>
              <strong className="block text-15 mt-10 leading-5 group-hover:text-yellow-A500 transition">
                Create a monorepo with Lerna & Yarn worksparces
              </strong>
              <p className="text-grey-A300 mt-5 leading-4">
                Protocolos e diretrizes orientam o desenvolvimento de
                tecnologias acessíveis, mas é preciso olhar para além de tudo
                isso
              </p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  );

  console.log(response);

  return {
    props: {},
    revalidate: 60 * 60, // 1 hour
  };
};
