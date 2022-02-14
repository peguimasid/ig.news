import { FunctionComponent } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export const Header: FunctionComponent = () => {
  return (
    <header className="h-52 border border-grey-800 shadow">
      <div className="flex items-center max-w-lg h-52 mx-auto px-20">
        <Image src="/images/logo.svg" alt="ig.news" width="110" height="31" />
        <nav className="ml-52 h-52">
          <Link href="/">
            <a
              className={clsx(
                styles.active,
                'inline-block relative px-5 h-52 leading-13 text-grey-A300 hover:text-white transition'
              )}
            >
              Home
            </a>
          </Link>
          <Link href="/posts" prefetch>
            <a className="inline-block relative px-5 h-52 leading-13 text-grey-A300 hover:text-white transition ml-20">
              Posts
            </a>
          </Link>
        </nav>
        <div className="ml-auto">
          <SignInButton />
        </div>
      </div>
    </header>
  );
};
