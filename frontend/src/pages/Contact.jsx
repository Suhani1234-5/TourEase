import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react';


export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });


    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');


    // Use your backend URL - adjust if needed
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name) && name !== '') {
            return 'Name should contain only letters';
        }
        return '';
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate name
        const nameError = validateName(formData.name);
        if (nameError) {
            setError(nameError);
            return;
        }


        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill all required fields');
            return;
        }


        setLoading(true);
        setError('');


        try {
            const response = await fetch(`${API_URL}/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });


            const data = await response.json();


            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to send message');
            }


            // Success
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });


            // Reset success message after 3 seconds
            setTimeout(() => setSubmitted(false), 3000);


        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white dark:text-white">Get in Touch</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl text-white dark:text-gray-100">
                        Have a question or feedback? We'd love to hear from you. Our team is here to help!
                    </p>
                </div>
            </div>


            {/* Contact Info & Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <ContactInfoCard
                        icon={<Mail className="w-8 h-8" />}
                        title="Email"
                        content="support@tourease.com"
                        color="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
                    />
                    <ContactInfoCard
                        icon={<Phone className="w-8 h-8" />}
                        title="Phone"
                        content="+1 (555) 123-4567"
                        color="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
                    />
                    <ContactInfoCard
                        icon={<MapPin className="w-8 h-8" />}
                        title="Address"
                        content="San Francisco, CA, USA"
                        color="bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300"
                    />
                </div>


                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Send us a Message</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                        Fields marked with <span className="text-red-500">*</span> are required
                    </p>


                    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-transparent dark:border-gray-800">
                        {/* Success Message */}
                        {submitted && (
                            <div className="mb-6 p-4 bg-green-100 dark:bg-green-950 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg">
                                ✅ Thank you! Your message has been sent successfully.
                            </div>
                        )}


                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 dark:bg-red-950 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
                                ❌ {error}
                            </div>
                        )}


                        {/* Name Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-teal-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400"
                                placeholder="Your name"
                                disabled={loading}
                                required
                                onKeyPress={(e) => {
                                    // Prevent typing numbers
                                    if (/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>


                        {/* Email Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-teal-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400"
                                placeholder="your.email@example.com"
                                disabled={loading}
                                required
                            />
                        </div>


                        {/* Subject Field (Optional) */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                                Subject <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-teal-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400"
                                placeholder="How can we help?"
                                disabled={loading}
                            />
                        </div>


                        {/* Message Field */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-teal-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400"
                                placeholder="Tell us more about your inquiry..."
                                disabled={loading}
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 disabled:bg-teal-300 dark:disabled:bg-indigo-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>


            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>


                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <FAQItem
                            question="How quickly will you respond?"
                            answer="We aim to respond to all inquiries within 24 hours during business days."
                        />
                        <FAQItem
                            question="What are your support hours?"
                            answer="Our 24/7 support team is available at all times to assist you."
                        />
                        <FAQItem
                            question="Can I schedule a demo?"
                            answer="Yes! Contact our team and we'll be happy to set up a personalized demo for you."
                        />
                        <FAQItem
                            question="Do you offer enterprise solutions?"
                            answer="Absolutely! We have customized enterprise packages available. Contact our sales team."
                        />
                    </div>
                </div>
            </div>


            {/* CTA Section */}
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white">
                        Still have questions?
                    </h2>
                    <p className="text-xl mb-10 opacity-90 text-white dark:text-gray-100">
                        Check out our help center or reach out to our support team
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
                        Visit Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}


function ContactInfoCard({ icon, title, content, color }) {
    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-all text-center border border-transparent dark:border-gray-800">
            <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{content}</p>
        </div>
    );
}


function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-transparent dark:border-gray-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left font-semibold text-lg text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-indigo-400 transition flex items-center justify-between"
            >
                {question}
                <span className={`transition transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <p className="text-gray-600 dark:text-gray-300 mt-4">{answer}</p>}
        </div>
    );
}
