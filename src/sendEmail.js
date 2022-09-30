const nodemailer = require("nodemailer");
const {email} = require('../config/default')

const sendEmail = async ({to, from, body}) => {
    try{
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: email.auth.user, // generated ethereal user
                pass: email.auth.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from, // sender address
            to, // list of receivers "email1, email2, email3..."
            subject: "💡 There are new available Seats!", // Subject line
            text: body, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (e) {
        console.error(e);
    }
}

module.exports = sendEmail;