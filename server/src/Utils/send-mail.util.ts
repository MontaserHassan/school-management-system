import nodemailer from 'nodemailer';



export default function sendEmail(to: string, subject: string, message: string, paymentInfo?: any) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
    });
    if (paymentInfo) {
        message = message
            .replace('[currency]', paymentInfo.currency || '')
            .replace('[amount]', paymentInfo.amount || '')
            .replace('[userName]', paymentInfo.name || '')
            .replace('[paidDate]', paymentInfo.paidDate || '')
            .replace('[transactionId]', paymentInfo.transactionId || '');
    }
    const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: to,
        subject: subject,
        text: subject,
        html: message,
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(`Error sending email to: ${to}`);
        } else {
            console.log(`Message sent to: ${to}`);
        };
    });
};