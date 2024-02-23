import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserInputType } from '../zodValidation/contactUser.schema';

const nodeMail = require("nodemailer");
const prisma = new PrismaClient();

export const createContactUser = async (req: Request<{}, {}, UserInputType["body"]>, res: Response) => {
    const { name, email, subject, number, message } = req.body;

    // Check if the email already exists in the database
    const existingContact = await prisma.contact.findUnique({
        where: { email: email },
    });

    if (existingContact) {
        // If email exists, send an email directly and do not store in the database
        const transporter = await nodeMail.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.PASSWORD,
            },
        });

        const mailOption = {
            from: email,
            to: "kalaiarsankan1426@gmail.com", // Sending email to your own address
            subject: ` ${subject}`,
            html: `You got a message from 
            Email : ${email}
            Name: ${name}
            Number: ${number}
            Message: ${message}`,
        };

        await transporter.sendMail(mailOption);

        res.status(200).json({ msg: "Email sent successfully. Contact not stored in the database." });
    } else {
        // If email does not exist, store contact in the database and send an email
        try {
            const contactsUser = await prisma.contact.create({
                data: {
                    name,
                    email,
                    subject,
                    number,
                    message
                }
            });

            // Send email directly to process.env.GMAIL_USER
            const transporter = await nodeMail.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.PASSWORD,
                },
            });

            const mailOption = {
                from: email,
                to: "kalaiarsankan1426@gmail.com", // Sending email to your own address
                subject: `${subject}`,
                html: `You got a message from 
                Email : ${email}
                Name: ${name}
                Number: ${number}
                Message: ${message}`,
            };

            await transporter.sendMail(mailOption);

            res.status(201).json({ contactUser: contactsUser, msg: "Contact User Added Successfully" });
        } catch (error) {
            console.log('Error Creating Contact User:', error);
            res.status(500).json({ error: "An error occurred" });
        }
    }
};
