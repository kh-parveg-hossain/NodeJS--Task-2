import nodemailer from "nodemailer";
import config from "../config/config";

// Configure transporter
const transporter = nodemailer.createTransport({
  host: config.smtp_host, // or your SMTP host
  port: config.smtp_port, // 587 for TLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.smtp_user, // your email
    pass: config.smtp_pass, // email password or app password
  },
});

// Send email function
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: config.smtp_from, // sender address
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
};
