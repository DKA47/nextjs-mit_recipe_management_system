import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { subject, msg, payment } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.NEXT_PUBLIC_PASSWORD, // Your Gmail password or app-specific password            }
            }
        });

const mailOptions = {
    from: 'mit@gmail.com',
    to: 'mwalevertas@gmail.com', // Replace with the recipient's email address (customer's email)
    subject: 'Payment Confirmation', // Subject of the email
    html: `
        <h2>Payment Confirmation</h2>
        <p>Dear Customer,</p>
        <p>We are pleased to inform you that your payment was successful.</p>
        <p>Payment Details:</p>
        <ul>
            <li><strong>Payment ID: ${payment.id}</strong></li>
            <li><strong>Amount: ${payment.amount}</strong></li>

        </ul>
        <p>Thank you for your business!</p>
        <p>Best Regards,</p>
        <p>Malawi Institute of Tourism</p>
    `
};
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
    }
}
