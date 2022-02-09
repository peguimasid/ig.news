import { FunctionComponent } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export const SignInButton: FunctionComponent = () => {
  const isUserLoggedIn = true;

  return (
    <button className="h-32 rounded-32 flex bg-grey-A850 justify-center items-center font-semibold px-14 text-white hover:brightness-75 transition">
      <FaGithub
        color={isUserLoggedIn ? '#04D361' : '#EBA417'}
        className="w-12 h-12 mr-10"
      />
      {isUserLoggedIn ? 'Guilhermo Masid' : 'Sign in with Github'}
      {isUserLoggedIn && <FiX color="#737380" className="w-12 h-12 ml-10" />}
    </button>
  );
};
