import { FunctionComponent, useEffect } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { useSession } from 'next-auth/react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getPrismicClient } from '../../../services/prismic';
import { RichText } from 'prismic-dom';

import styles from '../post.module.scss';
import clsx from 'clsx';

interface IPost {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface PostPreviewProps {
  post: IPost;
}

const PostPreview: FunctionComponent<PostPreviewProps> = ({ post }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user?.subscriptionStatus === 'active') {
      router.push(`/posts/${post.slug}`);
    }
  }, [post, router, session]);

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
            className={clsx(styles.postContent, styles.previewContent)}
          />

          <div className="p-20 text-center bg-grey-A850 rounded-full text-12 font-semibold mt-40 mb-20">
            Wanna continue reading?
            <Link href="/">
              <a className="text-yellow-A500 ml-5 hover:underline">
                Subscribe now 🤗
              </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default PostPreview;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
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
    revalidate: 60 * 30, // 30 minutes
  };
};
