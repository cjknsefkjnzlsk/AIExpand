import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kjfiiibusiness@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // Use an App Password, not your main password!
    },
  });

  try {
    await transporter.sendMail({
      from: 'AIExpand Contact <kjfiiibusiness@gmail.com>',
      to: "kjfiiibusiness@gmail.com",
      subject: "New Contact Request",
      text: `${email} wants to work with you!`,
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
} 