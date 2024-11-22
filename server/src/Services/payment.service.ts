import { stripe } from "../Utils/index.util";



// ----------------------------- create payment -----------------------------


const createPayment = async (name: string, amount: number, currency: string) => {
    const newPayment = await stripe.createCheckoutSession(name, amount, currency);
    return newPayment;
};


// ----------------------------- retrieve payment -----------------------------


const retrievePayment = async (id) => {
    const payment = await stripe.retrieveCheckoutSession(id);
    return payment;
};



export default {
    createPayment,
    retrievePayment,
};