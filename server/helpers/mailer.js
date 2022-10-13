const nodemailer = require('nodemailer');

function mailer(email) {
  let mailTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "webmail.auto.sender@gmail.com",
      pass: "mhrztczzwoimzmxs", //! ini passwordnya di simpan di env
    },
    tls: {
      rejectUnauthorized: true
    }
  })

  let detail = {
    from : 'dont-reply@finanza-team',
    to : email,
    subject : 'Hello',
    text : 'Welcome to Finanza'
  }

  mailTransport.sendMail(detail, (err) => {
    if (err) {
      console.log(`Something went wrong!`, err);
    }
    else {
      console.log('Succes send email');
    }
  })
}

module.exports = mailer