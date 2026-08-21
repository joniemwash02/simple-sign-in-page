import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  const { data, error } = await resend.emails.send({
    from: "Murang'a County <onboarding@resend.dev>",

    to: [email],

    subject: "Reset Your Password",

    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Reset Your Password</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: 40px auto;
              background-color: white;
              padding: 30px;
              border-radius: 10px;
            "
          >

            <h2
              style="
                color: #166534;
                margin-bottom: 20px;
              "
            >
              Murang'a County
            </h2>

            <h3>
              Reset Your Password
            </h3>

            <p>
              Hello,
            </p>

            <p>
              We received a request to reset the
              password for your account.
            </p>

            <p>
              Click the button below to create a
              new password.
            </p>

            <div style="margin: 30px 0;">
              <a
                href="${resetUrl}"
                style="
                  display: inline-block;
                  background-color: #166534;
                  color: white;
                  padding: 12px 24px;
                  border-radius: 6px;
                  text-decoration: none;
                  font-weight: bold;
                "
              >
                Reset Password
              </a>
            </div>

            <p>
              If you did not request a password reset,
              you can safely ignore this email.
            </p>

            <p
              style="
                color: #6b7280;
                font-size: 13px;
              "
            >
              For security reasons, this password
              reset link will expire.
            </p>

            <hr
              style="
                margin: 30px 0;
                border: none;
                border-top: 1px solid #e5e7eb;
              "
            />

            <p
              style="
                color: #9ca3af;
                font-size: 12px;
              "
            >
              Murang'a County Management System
            </p>

          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error(
      "Resend email error:",
      error
    );

    throw new Error(
      "Failed to send password reset email."
    );
  }

  console.log(
    "Password reset email sent:",
    data
  );

  return data;
}