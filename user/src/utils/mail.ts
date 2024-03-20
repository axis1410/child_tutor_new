import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adityamailer1410@gmail.com",
    pass: "cxom xbmf stxf tjvd",
  },
});

export async function sendMail(toEmail: string, token: string) {
  const htmlString = `
  <a target="_blank" href="http://127.0.0.1:3333/api/users/verify/${token}">
    <b>
      Click here to verify
    </b>
  </a>
  If the link does not work, then paste the following text in a new browser tab:
  http://127.0.0.1:3333/api/users/verify/${token}
  `;
  const messageData = {
    from: "adityamailer1410@gmail.com",
    to: toEmail,
    subject: "Verify Email ✔",
    text: "Click the link to verify email. The link is valid for 1 day.",
    html: htmlString,
  };

  await transport.sendMail(messageData);
}
