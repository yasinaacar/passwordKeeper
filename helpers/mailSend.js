const nodemailer=require("nodemailer");
const config=require("../config");

const transporter= nodemailer.createTransport({
    //this settings are for outlook, u can design by your project
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    tls:{
        ciphers: "SSLv3"
    },
    auth:{
        //this information coming from config.js
        user: config.email.from,
        pass: config.email.password
    }
})

module.exports=transporter;