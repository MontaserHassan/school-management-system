import nodemailer from 'nodemailer';



export function sendEmail(from: string, to: string, subject: string, message: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        requireTLS: true,
        // auth: {
        //     user: process.env.SENDER_EMAIL,
        //     pass: process.env.SENDER_PASSWORD
        // },
    });
    const mailOption = {
        from: "montaser.hassan.bns@gmail.com",
        to: to,
        subject: subject,
        text: subject,
        html: message
    };
    console.log('mailOption: ', mailOption);
    transporter.sendMail(mailOption, (err, _) => {
        if (err) return console.log('error through send mail');
        console.log('Message sent: %s', from);
    });
    return true;
};