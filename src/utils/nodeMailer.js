import nodemailer from "nodemailer";
// smtp configurations

export const accountVerificationEmail = async (user, link) => {
  const { email, fName, lName } = user;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"CFW" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "VERIFICATION REQUIRED ✔", // Subject line
    text: "Hello ?" + fName + "follow the link to activate your account" + link,
    html: `
    <p>
    Hello ${fName.toUpperCase()}${lName.toUpperCase()}
</p>
<p>
please follow the link below to activate your account.
</p>
<br />
<br />
<p>
   <a href=${link}>  ${link} </a>
</p>
<br />
<br />

<p>
    Regareds, <br />
    EST Store <br />
    Customer Support Team
</p>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
export const orderConfirmationEmail = async (user, result) => {
  const { email, fName, lName } = user;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"CFW" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Order received ✔", // Subject line
    text: `Dear ${fName} ${lName}. We have received your order.
    Your Order ID is : ${result._id}`,
    html: `
    <p>
    Dear ${fName}.${lName}
</p>
<p>
We have  received your order.
</p>
<br />
<br />
<p>
Your Order ID is : ${result._id}
</p>
<br />
<br />

<p>
    Regareds, <br />
    EST Store <br />
    Customer Support Team
</p>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

export const sendPasswordResetLink = async (user, link) => {
  const { email, fName, lName } = user;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"CFW" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: `Dear ${fName} ${lName}.
    You requested to reset your password for your ICONIC account.

    Follow the link below to create a new password:  ${link}`,
    html: `
    <p>
    Dear ${fName}.${lName}
</p>
<p>
You requested to reset your password for your ICONIC account.

 Follow the link below to create a new password:
</p>
<br />
<br />
<a href=${link}>
<button>Reset Password</button></a>
<br />
<br />

<p>
    Regareds, <br />
    EST Store <br />
    Customer Support Team
</p>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
