import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { Html } from 'next/document';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpire: Date.now() + 3600000
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpire: Date.now() + 3600000
            });
        }

        // const transport = nodemailer.createTransport({
        //     host: process.env.SMTP_HOST,
        //     port: 2525,
        //     auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASS
        //     }
        // });

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "625730bf75f9bf",
            pass: "c04c81fbd9a27c"
          }
        });

        const mailOptions = {
            from: "AbhaySingh@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `<a href="http://localhost:3000/verifyemail?token=${hashedToken}">Click here to verify your email</a>` : `<a href="http://localhost:3000/resetpassword?token=${hashedToken}">Click here to reset your password</a>`
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}