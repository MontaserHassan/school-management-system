import { Payment, PaymentModel } from "../Models/payment.model";
import { stripe, calculateExpirationDate } from "../Utils/index.util";



// ----------------------------- create payment -----------------------------


const createPayment = async (name: string, amount: number, currency: string) => {
    const newPayment = await stripe.createCheckoutSession(name, amount, currency);
    return newPayment;
};


// ----------------------------- save payment -----------------------------


const savePaymentTransaction = async (schoolId: string, invoiceId: string, userId: string, paymentId: string, name: string, amount: number, currency: string, service: number, serviceName: string, studentId?: string) => {
    const expirationDate = calculateExpirationDate('30t');
    const newPayment: PaymentModel = new Payment({
        schoolId: schoolId,
        invoiceId: invoiceId,
        userId: userId,
        paymentId: paymentId,
        name: name,
        amount: amount,
        currency: currency,
        service: service,
        serviceName: serviceName,
        expirationDate: expirationDate,
        studentId: studentId
    });
    await newPayment.save();
    return newPayment;
};


// ----------------------------- retrieve payment -----------------------------


const retrievePayment = async (id: string) => {
    const payment = await stripe.retrieveCheckoutSession(id);
    return payment;
};


// ----------------------------- get payment -----------------------------


const getPayment = async (id: string) => {
    const payment = await Payment.findOne({ paymentId: id });
    return payment;
};


// ----------------------------- update payment -----------------------------


const updatePayment = async (id: string, updatedData: any) => {
    const payment = await Payment.findByIdAndUpdate(id, updatedData, { new: true });
    return payment;
};



export default {
    createPayment,
    savePaymentTransaction,
    retrievePayment,
    getPayment,
    updatePayment,
};