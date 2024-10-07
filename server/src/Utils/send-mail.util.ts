import nodemailer from 'nodemailer';



export function sendEmail(to: string, subject: string, message: string) {
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
    const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: to,
        subject: subject,
        text: subject,
        html: message,
    };
    let responseMessage: string;
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(`Error sending email to: ${to}`);
        } else {
            console.log(`Message sent to: ${to}`);
        };
    });
};