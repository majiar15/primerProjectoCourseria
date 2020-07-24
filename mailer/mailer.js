const nodemailer = require('nodemailer');

const mailerConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jimmie.trantow14@ethereal.email',
        pass: 'ZJMg4P7yBukWMCYWtS'
    }
}

module.exports = nodemailer.createTransport(mailerConfig);