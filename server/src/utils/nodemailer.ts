import { EMAIL, PASSWORD } from "../constants";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

export function sendEmail(html: string, email: string, subject: string) {
  const mailConfigurations = {
    from: EMAIL,
    to: email,
    subject: subject,
    html,
  };
  return transporter.sendMail(mailConfigurations);
}
