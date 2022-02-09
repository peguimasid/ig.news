import { FunctionComponent } from 'react';

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton: FunctionComponent<SubscribeButtonProps> = ({
  priceId,
}) => {
  console.log(priceId);
  return (
    <button className="w-160 h-40 rounded-20 bg-yellow-A500 text-grey-A900 text-13 font-semibold flex items-center justify-center hover:brightness-75 transition">
      Subscribe
    </button>
  );
};
