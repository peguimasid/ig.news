import { FunctionComponent } from 'react';

import Head from 'next/head';
import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

interface IPost {
  slug: number;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsPageProps {
  posts: IPost[];
}

const Posts: FunctionComponent<PostsPageProps> = ({ posts }) => {
  console.log(posts);
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className="max-w-lg mx-auto px-20">
        <div className="max-w-sm mt-48 mx-auto">
          {posts.map(({ slug, title, excerpt, updatedAt }) => (
            <a
              key={slug}
              href="#"
              className="block mt-20 pt-20 border-t-1 border-t-grey-A700 first:mt-0 first:p-0 first:border-0 group"
            >
              <time className="text-10 flex items-center text-grey-A300">
                {updatedAt}
              </time>
              <strong className="block text-15 mt-10 leading-5 group-hover:text-yellow-A500 transition">
                {title}
              </strong>
              <p className="text-grey-A300 mt-5 leading-4 group-hover:text-grey-A500 transition">
                {excerpt}
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

  const response = await prismic.query<any>(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  );

  const posts = response.results.map(({ uid, data, last_publication_date }) => {
    return {
      slug: uid,
      title: RichText.asText(data.title),
      excerpt:
        data.content.find((content) => content.type === 'paragraph')?.text ??
        '',
      updatedAt: new Date(last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
