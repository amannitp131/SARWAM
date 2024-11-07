import { loadEnv } from "../config/dotenv.config";
import * as nodemailer from 'nodemailer';

export const mailSender = async (
    email: string,
    subject: string,
    message: string,
): Promise<void> => {
    loadEnv();
    
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass:'ywdx iadz wexi ozho',
            },
            tls: {
                rejectUnauthorized: false, 
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
