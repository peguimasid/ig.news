import { FunctionComponent } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export const SignInButton: FunctionComponent = () => {
  const isUserLoggedIn = true;

  if (isUserLoggedIn)
    return (
      <button className="h-32 rounded-32 flex bg-grey-A850 justify-center items-center font-semibold px-14 text-white hover:brightness-90">
        <FaGithub color="#04D361" className="w-12 h-12 mr-10" />
        Guilhermo Masid
        <FiX color="#737380" className="w-12 h-12 ml-10" />
      </button>
    );

  return (
    <button className="h-32 rounded-32 flex bg-grey-A850 justify-center items-center font-semibold px-14 text-white hover:brightness-90">
      <FaGithub color="#EBA417" className="w-12 h-12 mr-10" />
      Sign in with Github
    </button>
  );
};
