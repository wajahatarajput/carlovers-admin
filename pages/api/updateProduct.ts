import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

interface UpdateProductRequest {
    name?: string;
    description?: string;
    active?: boolean;
    amount: number;
    recurring: string | number | null;
    billing_period: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { name, description, active, amount, recurring, billing_period }: UpdateProductRequest = req.body;

    try {
        const product = await stripe.products.update(id as string, {
            name,
            description,
            active,
            metadata: {
                amount,
                recurring,
                billing_period,
            },
        });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
