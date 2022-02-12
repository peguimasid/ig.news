import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: 'https://github.com/login/oauth/authorize?scope=read:user',
    }),
  ],
  callbacks: {
    async signIn({ user: { email } }) {
      try {
        await fauna.query(q.Create(q.Collection('users'), { data: { email } }));
        return true;
      } catch {
        return false;
      }
    },
  },
});
