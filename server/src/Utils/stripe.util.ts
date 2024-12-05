import { stripe } from '../Config/index.config';



// ----------------------------- create checkout session -----------------------------


async function createCheckoutSession(name: string, amount: number, currency: string) {
    try {
        const lineItems = [
            {
                price_data: {
                    currency: currency.toLowerCase(),
                    product_data: { name: name.toLowerCase(), },
                    unit_amount: Math.round(Number(amount) * 100),
                },
                quantity: 1,
            },
        ];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CANCEL_URL}?session_id={CHECKOUT_SESSION_ID}`,
        });
        if (!session) return false;
        return session;
    } catch (err) {
        throw err;
    };
};


// ----------------------------- retrieve checkout session -----------------------------


async function retrieveCheckoutSession(sessionId: string) {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) return false;
        return session;
    } catch (err) {
        throw err;
    };
};



export default {
    createCheckoutSession,
    retrieveCheckoutSession,
};