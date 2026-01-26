import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Loader, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';

const MESSAGE_MAX_LENGTH = 500;

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
    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    // Use your backend URL - adjust if needed
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name) && name !== '') {
            return 'Name should contain only letters';
        }
        return '';
    };

    const validateEmail = (email) => {
        if (!email) {
            setEmailError('');
            setIsEmailValid(false);
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(email);

        if (!valid) {
            setEmailError('Please enter a valid email address');
            setIsEmailValid(false);
        } else {
            setEmailError('');
            setIsEmailValid(true);
        }
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Apply max length for message field
        if (name === 'message' && value.length > MESSAGE_MAX_LENGTH) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError('');

        // Real-time email validation
        if (name === 'email') {
            validateEmail(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate name
        const nameError = validateName(formData.name);
        if (nameError) {
            setError(nameError);
            return;
        }

        // Validate email
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
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
            setIsEmailValid(false);

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitted(false), 3000);

        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const messageCharCount = formData.message.length;
    const isNearLimit = messageCharCount > MESSAGE_MAX_LENGTH * 0.9;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section - Centered & Balanced */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20 md:py-24 overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                {/* Geometric Pattern Overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-black/30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-tight drop-shadow-lg">
                        Get in Touch
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-white/90 dark:text-white/85 leading-relaxed drop-shadow-md">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>
            </div>

            {/* Contact Info - Centered Elegant Cards */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 z-10 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <ContactInfoCard
                        icon={<Mail className="w-7 h-7" />}
                        title="Email"
                        content="support@tourease.com"
                        href="mailto:support@tourease.com"
                    />
                    <ContactInfoCard
                        icon={<Phone className="w-7 h-7" />}
                        title="Phone"
                        content="+1 (555) 123-4567"
                        href="tel:+15551234567"
                    />
                    <ContactInfoCard
                        icon={<MapPin className="w-7 h-7" />}
                        title="Address"
                        content="San Francisco, CA, USA"
                    />
                </div>
            </div>

            {/* Main Content - Centered Form Section */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Decorative Background Elements */}
                <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden -z-10">
                    <div className="absolute top-20 -left-40 w-80 h-80 bg-teal-100 dark:bg-teal-950/20 rounded-full filter blur-3xl opacity-20"></div>
                    <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-100 dark:bg-indigo-950/20 rounded-full filter blur-3xl opacity-20"></div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                        Send us a Message
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        Fields marked with <span className="text-red-500 font-semibold">*</span> are required
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
                    {/* Success Message */}
                    {submitted && (
                        <div className="mb-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-l-4 border-green-500 dark:border-green-400 text-green-800 dark:text-green-300 rounded-lg shadow-sm flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                            <div>
                                <p className="font-bold text-lg mb-1">Success!</p>
                                <p className="text-sm">Your message has been sent successfully. We'll get back to you soon.</p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-5 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-l-4 border-red-500 dark:border-red-400 text-red-800 dark:text-red-300 rounded-lg shadow-sm flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                            <div>
                                <p className="font-bold text-lg mb-1">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Name Field */}
                    <div className="mb-7">
                        <label className="block text-sm font-bold mb-3 text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-teal-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-750 focus:ring-4 focus:ring-teal-500/10 dark:focus:ring-indigo-400/10 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            placeholder="John Doe"
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

                    {/* Email Field with Real-time Validation */}
                    <div className="mb-7">
                        <label className="block text-sm font-bold mb-3 text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-5 py-4 pr-14 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${emailError
                                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 focus:border-red-500 focus:ring-red-500/10'
                                        : isEmailValid
                                            ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/20 focus:border-green-500 focus:ring-green-500/10'
                                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-teal-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-750 focus:ring-teal-500/10 dark:focus:ring-indigo-400/10'
                                    } text-gray-900 dark:text-white`}
                                placeholder="john.doe@example.com"
                                disabled={loading}
                                required
                            />
                            {formData.email && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {isEmailValid ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500" />
                                    ) : emailError ? (
                                        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                                    ) : null}
                                </div>
                            )}
                        </div>
                        {emailError && (
                            <p className="mt-2.5 text-sm font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {emailError}
                            </p>
                        )}
                        {isEmailValid && (
                            <p className="mt-2.5 text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Email looks good!
                            </p>
                        )}
                    </div>

                    {/* Subject Field (Optional) */}
                    <div className="mb-7">
                        <label className="block text-sm font-bold mb-3 text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                            Subject <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold ml-1">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-teal-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-750 focus:ring-4 focus:ring-teal-500/10 dark:focus:ring-indigo-400/10 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            placeholder="How can we help you today?"
                            disabled={loading}
                        />
                    </div>

                    {/* Message Field with Character Counter */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${isNearLimit
                                    ? 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950'
                                    : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
                                }`}>
                                {messageCharCount} / {MESSAGE_MAX_LENGTH}
                            </span>
                        </div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="7"
                            className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 ${isNearLimit
                                    ? 'border-orange-300 dark:border-orange-700 focus:border-orange-500 focus:ring-orange-500/10 bg-orange-50/50 dark:bg-orange-950/10'
                                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-teal-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-750 focus:ring-teal-500/10 dark:focus:ring-indigo-400/10'
                                } text-gray-900 dark:text-white`}
                            placeholder="Tell us more about your inquiry... What can we help you with?"
                            disabled={loading}
                            required
                        />
                        {isNearLimit && (
                            <p className="mt-2.5 text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                You're approaching the character limit
                            </p>
                        )}
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                        type="submit"
                        disabled={loading || (formData.email && !isEmailValid)}
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-500 dark:hover:to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold text-lg py-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-6 h-6 animate-spin" />
                                <span>Sending Message...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-6 h-6" />
                                <span>Send Message</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* FAQ Section - Centered & Balanced */}
            <div className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 py-20 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 dark:bg-teal-950 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 dark:bg-indigo-950 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200 dark:bg-purple-950 rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Quick answers to common questions. Can't find what you're looking for?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
                        <FAQItem
                            question="How quickly will you respond?"
                            answer="We aim to respond to all inquiries within 24 hours during business days. For urgent matters, our 24/7 support team is available."
                        />
                        <FAQItem
                            question="What are your support hours?"
                            answer="Our 24/7 support team is available at all times to assist you with any questions or concerns you may have."
                        />
                        <FAQItem
                            question="Can I schedule a demo?"
                            answer="Yes! Contact our team and we'll be happy to set up a personalized demo for you and walk through all features."
                        />
                        <FAQItem
                            question="Do you offer enterprise solutions?"
                            answer="Absolutely! We have customized enterprise packages available. Contact our sales team to discuss your specific needs."
                        />
                    </div>
                </div>
            </div>

            {/* Smooth Transition Divider */}
            <div className="h-1 bg-gradient-to-r from-transparent via-teal-200 dark:via-indigo-800 to-transparent opacity-50"></div>

            {/* CTA Section - Centered & Elegant */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-20 overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 left-1/4 w-96 h-96 bg-teal-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40 animate-blob"></div>
                    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
                </div>

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 dark:to-black/20"></div>

                {/* Dot Pattern */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-white tracking-tight drop-shadow-lg">
                        Still have questions?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-10 text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-md">
                        Check out our help center or reach out to our support team
                    </p>
                    <Link to="/help" className="bg-white hover:bg-gray-50 text-teal-600 dark:text-indigo-600 px-10 py-4 rounded-xl font-bold transition-all duration-200 text-base shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95">
                        Visit Help Center
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Elegant Centered Contact Info Card Component
function ContactInfoCard({ icon, title, content, href }) {
    const CardContent = (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-teal-300 dark:hover:border-indigo-700 hover:-translate-y-1 transition-all duration-300 text-center group h-full">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-600 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-400 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className={`text-sm text-gray-600 dark:text-gray-400 font-medium ${href ? 'group-hover:text-teal-600 dark:group-hover:text-indigo-400 transition-colors' : ''}`}>
                {content}
            </p>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block h-full">
                {CardContent}
            </a>
        );
    }

    return CardContent;
}

// Animated FAQ Accordion Component
function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`bg-white dark:bg-gray-900 p-7 rounded-2xl shadow-md border transition-all duration-300 ${isOpen
                    ? 'border-teal-300 dark:border-indigo-700 shadow-xl ring-4 ring-teal-100 dark:ring-indigo-900/50'
                    : 'border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-indigo-800 hover:shadow-lg'
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left font-bold text-lg text-gray-900 dark:text-white flex items-center justify-between gap-4 group"
                aria-expanded={isOpen}
            >
                <span className="group-hover:text-teal-600 dark:group-hover:text-indigo-400 transition-colors pr-2">
                    {question}
                </span>
                <div className="flex-shrink-0 bg-teal-100 dark:bg-indigo-950 p-2 rounded-lg group-hover:bg-teal-200 dark:group-hover:bg-indigo-900 transition-colors">
                    <ChevronDown
                        className={`w-5 h-5 text-teal-600 dark:text-indigo-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                </div>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-700 dark:text-gray-300 pt-5 leading-relaxed text-base border-t border-gray-100 dark:border-gray-800 mt-5">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}
