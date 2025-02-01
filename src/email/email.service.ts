import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
    emailTransport() {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: "587",
            secure: false,
            auth: {
                user: "kachanan.kcn@gmail.com",
                pass: "cofe irzm iwgx vjbi"
            }
        });
        return transporter;
                
    }

    async sendEmail(emailDto: EmailDto) {
        const {recipient, subject, html, text} = emailDto;
        const transporter = this.emailTransport();
        const options: nodemailer.SendMailOptions = {
            from: "kachanan.kcn@gmail.com",
            to: recipient,
            subject: subject,
            html: html,
            text: text
        };
        try {
            await transporter.sendMail(options);
            return {message: "Email sent successfully"};
        } catch (error) {
            throw new Error(`Error sending email: ${error}`);
        }
    }

}
