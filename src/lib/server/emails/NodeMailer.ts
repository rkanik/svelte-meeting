import nodemailer from "nodemailer";

const Mailer = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e634df84c7f14e",
    pass: "51b9eb3f350bef",
  },
});

export { Mailer };
