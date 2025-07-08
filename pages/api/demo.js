import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, company, businessType } = req.body;

  if (!email || !company || !businessType) {
    return res.status(400).json({ message: "All fields are required" });
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
      from: 'AIExpand Demo <kjfiiibusiness@gmail.com>',
      to: "kjfiiibusiness@gmail.com",
      subject: "New Demo Request",
      text: `${company} wants a demo, their email is ${email}, they work in ${businessType}`,
    });
    return res.status(200).json({ message: "Demo request sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send demo request", error: error.message });
  }
} 