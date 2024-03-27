import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  host: config.email.email_host,
  port: 587,
  secure: false,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

export const sendEmail = async (from, to, subject, body) => {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
};
