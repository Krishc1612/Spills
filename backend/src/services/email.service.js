
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

async function sendEmail(fullName, email, medName) {
    const msg = {
        to: email, // Change to your recipient
        from: process.env.EMAIL_SENDER, // Change to your verified sender
        subject: 'Regarding pending medications.',
        text: `Hey there ${fullName} time to take the ${medName}`,
    }
    // sgMail.send(msg).then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error) => {
    //         throw new Error(`Failed to send the email to ${email} for medication ${medName}`);
    //     }
    // ) this would fail because catch here does not propagate the error to the caller.

    try {
        await sgMail.send(msg);
        console.log('Email sent to', email);
    } catch (err) {
        throw new Error(
          `EMAIL_SEND_FAILED: ${email} | ${medName}`
        );
    }
}

module.exports = {
    sendEmail
};