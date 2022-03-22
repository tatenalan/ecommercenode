const { createTransport } = require('nodemailer')

// const transporter = createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'aleen.thompson86@ethereal.email',
//         pass: 'BGaU8t3ZSjynUzuUQC'
//     }
// })

// enviar desde gmail (tiene que tener autenticacion de 2 factores configurado) 
// https://www.google.com/url?q=https://security.google.com/settings/security/apppasswords&sa=D&source=editors&ust=1647899864881802&usg=AOvVaw0ieK0riZO1hnpGmM2vuVLT
const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'taten210@gmail.com',
        pass: 'kusqbbzstfomilfa'
    }
})

const sendEmail = async (body) => {

    const mailOptions = {
        from: 'aleen.thompson86@ethereal.email',
        to: 'taten210@gmail.com',
        subject: 'New user',
        html: `
        <h1>Welcome to our website! ${body.username}</h1>
        <h3>Username: ${body.username}</h3>
        <h3>Email: ${body.email}</h3>
        <h3>Address: ${body.address}</h3>
        <h3>Age: ${body.age}</h3>
        <h3>Phone: ${body.phone}</h3>
        `
    }

    try {
        let info = await transporter.sendMail(mailOptions)
        console.log(info)
        return true
    } catch(error) {
        console.log(error);
        return false
    }
}

module.exports = { sendEmail }