import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await stripe.products.list({
            active: true, // Filter to fetch only active products
        });

        // Fetch additional details for each product to include amount
        const productsWithAmount = await Promise.all(
            products.data.map(async (product) => {
                const prices = await stripe.prices.list({
                    product: product.id!,
                    active: true,
                    limit: 1, // Assuming you want to fetch the most recent active price
                });
                const amount = prices.data.length > 0 ? prices.data[0].unit_amount! : 0; // Fetch the unit amount (in cents)

                return {
                    ...product,
                    amount: amount / 100, // Convert cents to dollars
                };
            })
        );

        res.json(productsWithAmount);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
