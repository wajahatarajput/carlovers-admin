import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
        const deletedProduct = await stripe.products.del(id as string);
        res.json(deletedProduct);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
