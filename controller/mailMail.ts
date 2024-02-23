import { Request, Response } from 'express'; 
const nodeMail = require("nodemailer");

export async function mainMail(req:Request, res:Response) {
    const {name ,email ,subject ,number, message} = req.body;
    const transporter = await nodeMail.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: `You got a message from 
      Email : ${email}
      Name: ${name}
      Number: ${number}
      Message: ${message}`,
    };
    try {
      await transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }
