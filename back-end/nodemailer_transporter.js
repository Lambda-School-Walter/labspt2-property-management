const nodemailer = require('nodemailer');
const creds = require('./api/config/keys');

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.nodemailer.USER,
    pass: creds.nodemailer.PASS
  }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});