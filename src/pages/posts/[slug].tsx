import { FunctionComponent } from 'react';

import { getSession } from 'next-auth/react';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

import styles from './post.module.scss';

interface IPost {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface PostProps {
  post: IPost;
}

const Post: FunctionComponent<PostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className="max-w-lg mx-auto px-20">
        <article className="max-w-md mt-52 mx-auto">
          <h1 className="text-36 font-900">{post.title}</h1>
          <time className="block text-10 text-grey-A300 mt-16">
            {post.updatedAt}
          </time>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={styles.postContent}
          />
        </article>
      </main>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session || session.user.subscriptionStatus !== 'active') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID<any>('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };

  return {
    props: { post },
  };
};
