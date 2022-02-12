/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

const buffer = async (readable: Readable) => {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set(['checkout.session.completed']);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);

    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'checkout.session.completed':
            const { subscription, customer } = event.data
              .object as Stripe.Checkout.Session;
            await saveSubscription(
              subscription.toString(),
              customer.toString()
            );
            break;
          default:
            throw new Error(`Unhandled event type: ${event.type}`);
        }
      } catch (err) {
        return res.json({ error: 'Webkooh handler failed' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
