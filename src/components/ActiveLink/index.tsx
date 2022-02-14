import { cloneElement, FunctionComponent, ReactElement } from 'react';
import Link, { LinkProps } from 'next/link';

import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
  className: string;
}

export const ActiveLink: FunctionComponent<ActiveLinkProps> = ({
  children,
  activeClassName,
  className,
  ...rest
}) => {
  const { asPath } = useRouter();

  const styles = `${className} ${asPath === rest.href ? activeClassName : ''}`;

  return <Link {...rest}>{cloneElement(children, { className: styles })}</Link>;
};
