import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  //   secure: true, // true for 465, false for other ports
  auth: {
    user: "showravdas8@gmail.com",
    pass: "fheraacjawpfqygo",
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  // Create verification URL
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`;
;
  // Email template
  const mailOptions = {
    from: "showravdas8@gmail.com",
    to: email,
    subject: "Verify your email address",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Verify Your Email Address</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin-bottom: 20px;">Thank you for registering! Please click the button below to verify your email address:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; 
                        background-color: #007bff; 
                        color: white; 
                        padding: 12px 24px; 
                        text-decoration: none; 
                        border-radius: 5px;
                        font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              If the button doesn't work, you can copy and paste this link into your browser:
              <br>
              <a href="${verificationUrl}" style="color: #007bff; word-break: break-all;">
                ${verificationUrl}
              </a>
            </p>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      `,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    // console.log("res", res);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
