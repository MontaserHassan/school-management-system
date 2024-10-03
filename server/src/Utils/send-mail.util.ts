import nodemailer from 'nodemailer';

import Logger from '../Config/logging.config';


function sendEmail(to: string, subject: string, message: string, id: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
    });
    const mailOption = {
        from: `"Fred Foo 👻" <${process.env.SENDER_EMAIL}>`,
        to: to,
        subject: subject,
        text: subject,
        html: message
    }
    transporter.sendMail(mailOption, (err, _) => {
        if (err) {
            console.log('error through send mail');
        }
        console.log('Message sent: %s', id);
    });
};



export {
    sendEmail,
};