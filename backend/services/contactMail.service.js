const transporter = require('../config/mailTransporter');

const sendContactMail = async (contact) => {
    const { name, email, subject, message } = contact;

    await transporter.sendMail({
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: subject || 'New Contact Form Submission',
        html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    });
};

module.exports = sendContactMail;
