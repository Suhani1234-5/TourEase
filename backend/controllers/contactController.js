const Contact = require('../models/contact');
const sendContactMail = require('../services/contactMail.service');

exports.saveContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Save contact to database
        const contact = await Contact.create({
            name,
            email,
            subject: subject || '',
            message
        });

        // Try sending email (DO NOT block response)
        sendContactMail(contact).catch((err) => {
            console.error('Nodemailer error:', err.message);
        });

        // Success response (always succeeds if DB save succeeds)
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                createdAt: contact.createdAt
            }
        });

    } catch (error) {
        console.error('Contact save error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
