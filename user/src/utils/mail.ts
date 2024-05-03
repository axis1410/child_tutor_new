import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMail(toEmail: string, token: string) {
  const url = process.env.PUBLIC_URL!;

  const htmlString = `
  <a target="_blank" href="${url}/api/users/verify/${token}">
    <b>
      Click here to verify
    </b>
  </a>
  If the link does not work, then paste the following text in a new browser tab:
  ${url}/api/users/verify/${token}
  `;

  const messageData = {
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: "Verify Email ✔",
    text: "Click the link to verify email. The link is valid for 1 day.",
    html: htmlString,
  };

  await transport.sendMail(messageData);
}
