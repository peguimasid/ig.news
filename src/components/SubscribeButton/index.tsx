import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { api } from '../../services/api';
import { getStripe } from '../../services/stripe-js';

export const SubscribeButton: FunctionComponent = () => {
  const [subscribing, setSubscribing] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const isUserLoggedIn = useMemo(() => {
    return status === 'authenticated';
  }, [status]);

  const handleSubscribe = useCallback(async () => {
    if (!isUserLoggedIn) return signIn('github');
    if (data.user.subscriptionStatus === 'active') return router.push('/posts');

    setSubscribing(true);

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripe();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
    setSubscribing(false);
  }, [data, isUserLoggedIn, router]);

  const subscribeButtonDisabled = useMemo(() => {
    return subscribing;
  }, [subscribing]);

  return (
    <button
      onClick={handleSubscribe}
      disabled={subscribeButtonDisabled}
      className="w-160 h-40 rounded-20 bg-yellow-A500 text-grey-A900 text-13 font-semibold flex items-center justify-center hover:brightness-75 transition disabled:bg-grey-700 disabled:brightness-100"
    >
      Subscribe now
    </button>
  );
};
