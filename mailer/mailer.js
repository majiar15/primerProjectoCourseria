const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;
if(process.env.NODE_ENV === "production"){
    const option ={
        auth:{
            api_key: process.env.SENDGRID_API_KEY
        }
    }
    mailConfig = sgTransport(option);
}else{
    if(process.env.NODE_ENV === "starting"){
        console.log('XXXXXXXXXXXX');
        const option = {
            auth:{
                api_key: process.env.SENDGRID_API_KEY
            }
        }
        mailConfig = sgTransport(option);
    }else{
        //all main send ethereal 
        
        mailerConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASSWORD
            }
        }
    }

}



module.exports = nodemailer.createTransport(mailerConfig);