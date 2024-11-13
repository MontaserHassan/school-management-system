import { stripe } from 'Config/stripe.config';



export const createCheckoutSession = async (items: { name: string; amount: number; currency: string; quantity: number }[]) => {
    try {
        const lineItems = items.map((item: { name: string; amount: number; currency: string; quantity: number }) => ({
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.amount,
            },
            quantity: item.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CANCEL_URL}`,
        });
        if (!session) return false;
        return session
    } catch (err) {
        throw err;
    };
};