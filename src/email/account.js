const sgMail  = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rprakash8298@gmail.com',
        subject: 'thnaks for joining in',
        text:`welcome to the app, ${name}. let me know how you feel about app`
    })
}

const cancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rprakash8298@gmail.com',
        subject: 'good bye, i hope we join again',
        text:`thanks for spent your time mr ${name} to this app. please visit again`
    })
}
module.exports = {
    welcomeEmail,
    cancellationEmail
}