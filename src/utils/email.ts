import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL!, // must be verified in SendGrid
      subject,
      html,
    });

    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const changePasswordEmail = async (email: string, code: string) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL!,
      subject: "Change Password",
      text: `Your OTP for password change is: ${code}. It expires in 10 minutes.`,
    });
    console.log(`Password change email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password change email:", error);
  }
};
