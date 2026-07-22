const Contact = require('../models/contact');
const sendContactMail = require('../services/contactMail.service');

exports.saveContact = async (req, res) => {
    try {
        let { name, email, subject, message } = req.body;

        // Basic presence validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Type checking and Sanitization
        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Invalid input format'
            });
        }
        
        name = name.trim();
        email = email.trim();
        subject = typeof subject === 'string' ? subject.trim() : '';
        message = message.trim();

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address format'
            });
        }

        // Payload length restrictions
        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Name exceeds maximum length of 100 characters'
            });
        }

        if (message.length > 2000) {
            return res.status(400).json({
                success: false,
                message: 'Message exceeds maximum length of 2000 characters'
            });
        }

        // Save contact to database
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        // Try sending email (DO NOT block response)
        sendContactMail(contact).catch((err) => {
            console.error(`[Mail Service Error] Failed to send contact email to ${email} (Contact ID: ${contact._id}):`, err.message);
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
