import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-white dark:text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-white dark:text-white">Privacy Policy</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto text-center text-white dark:text-gray-100">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-center mt-4 text-sm opacity-75 text-white dark:text-gray-200">
            Last Updated: January 11, 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mb-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Welcome to TourEase. We are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            By using TourEase, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our service.
          </p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <OverviewCard
            icon={<Lock className="w-8 h-8" />}
            title="Secure Data"
            description="Your data is encrypted and stored securely"
            color="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
          />
          <OverviewCard
            icon={<Eye className="w-8 h-8" />}
            title="Transparency"
            description="Clear information about data usage"
            color="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
          />
          <OverviewCard
            icon={<UserCheck className="w-8 h-8" />}
            title="Your Control"
            description="You control your personal data"
            color="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
          />
        </div>

        {/* Privacy Sections */}
        <div className="space-y-12">
          <PrivacySection
            icon={<Database className="w-8 h-8" />}
            title="Information We Collect"
            iconColor="bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>Account Information:</strong> Name, email address, password, and profile preferences when you create an account
              </ListItem>
              <ListItem>
                <strong>Travel Preferences:</strong> Destination interests, travel dates, budget preferences, and favorite locations
              </ListItem>
              <ListItem>
                <strong>Communication Data:</strong> Messages, feedback, and customer support inquiries
              </ListItem>
              <ListItem>
                <strong>Usage Information:</strong> Pages viewed, features used, search queries, and interaction patterns
              </ListItem>
              <ListItem>
                <strong>Device Information:</strong> Browser type, IP address, operating system, and device identifiers
              </ListItem>
            </ul>
          </PrivacySection>

          <PrivacySection
            icon={<FileText className="w-8 h-8" />}
            title="How We Use Your Information"
            iconColor="bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>Provide, maintain, and improve our travel planning services</ListItem>
              <ListItem>Personalize your experience with tailored destination recommendations</ListItem>
              <ListItem>Process your requests and communicate with you about your account</ListItem>
              <ListItem>Send you updates, newsletters, and promotional materials (with your consent)</ListItem>
              <ListItem>Analyze usage patterns to enhance platform functionality and user experience</ListItem>
              <ListItem>Detect, prevent, and address technical issues and fraudulent activities</ListItem>
              <ListItem>Comply with legal obligations and enforce our terms of service</ListItem>
            </ul>
          </PrivacySection>

          <PrivacySection
            icon={<Shield className="w-8 h-8" />}
            title="How We Share Your Information"
            iconColor="bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>With Your Consent:</strong> When you explicitly authorize us to share specific information
              </ListItem>
              <ListItem>
                <strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our platform 
                (e.g., hosting, analytics, email services) under strict confidentiality agreements
              </ListItem>
              <ListItem>
                <strong>Legal Requirements:</strong> When required by law, court order, or government regulations
              </ListItem>
              <ListItem>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, 
                with notice provided to affected users
              </ListItem>
              <ListItem>
                <strong>Protection of Rights:</strong> To protect the rights, property, or safety of TourEase, 
                our users, or the public
              </ListItem>
            </ul>
          </PrivacySection>

          <PrivacySection
            icon={<Lock className="w-8 h-8" />}
            title="Data Security"
            iconColor="bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>End-to-end encryption for sensitive data transmission</ListItem>
              <ListItem>Secure password hashing and authentication protocols</ListItem>
              <ListItem>Regular security audits and vulnerability assessments</ListItem>
              <ListItem>Access controls limiting employee access to personal data</ListItem>
              <ListItem>Secure data storage with regular backups</ListItem>
            </ul>
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 dark:border-yellow-400 rounded">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  While we strive to protect your information, no method of transmission over the internet 
                  is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection
            icon={<UserCheck className="w-8 h-8" />}
            title="Your Rights and Choices"
            iconColor="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>Access:</strong> Request a copy of the personal information we hold about you
              </ListItem>
              <ListItem>
                <strong>Correction:</strong> Update or correct inaccurate information in your account settings
              </ListItem>
              <ListItem>
                <strong>Deletion:</strong> Request deletion of your account and associated personal data
              </ListItem>
              <ListItem>
                <strong>Opt-Out:</strong> Unsubscribe from marketing emails and promotional communications
              </ListItem>
              <ListItem>
                <strong>Data Portability:</strong> Request your data in a machine-readable format
              </ListItem>
              <ListItem>
                <strong>Restrict Processing:</strong> Limit how we use your personal information
              </ListItem>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              To exercise these rights, please contact us at <a href="mailto:support@tourease.com" className="text-teal-600 dark:text-teal-400 hover:underline">support@tourease.com</a>
            </p>
          </PrivacySection>

          <PrivacySection
            icon={<Eye className="w-8 h-8" />}
            title="Cookies and Tracking"
            iconColor="bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>Essential Cookies:</strong> Required for basic platform functionality and security
              </ListItem>
              <ListItem>
                <strong>Preference Cookies:</strong> Remember your settings and preferences
              </ListItem>
              <ListItem>
                <strong>Analytics Cookies:</strong> Help us understand how users interact with our platform
              </ListItem>
              <ListItem>
                <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)
              </ListItem>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              You can control cookie preferences through your browser settings. Note that disabling certain 
              cookies may limit platform functionality.
            </p>
          </PrivacySection>

          <PrivacySection
            icon={<AlertCircle className="w-8 h-8" />}
            title="Children's Privacy"
            iconColor="bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300"
          >
            <p className="text-gray-700 dark:text-gray-300">
              TourEase is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you believe we have inadvertently collected 
              information from a child under 13, please contact us immediately so we can delete such information.
            </p>
          </PrivacySection>

          <PrivacySection
            icon={<FileText className="w-8 h-8" />}
            title="International Data Transfers"
            iconColor="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
          >
            <p className="text-gray-700 dark:text-gray-300">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have different data protection laws. We ensure appropriate safeguards are in place 
              to protect your information in accordance with this Privacy Policy.
            </p>
          </PrivacySection>

          <PrivacySection
            icon={<FileText className="w-8 h-8" />}
            title="Changes to This Policy"
            iconColor="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              When we make significant changes, we will:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>Update the "Last Updated" date at the top of this policy</ListItem>
              <ListItem>Notify you via email or prominent notice on our platform</ListItem>
              <ListItem>Give you the opportunity to review the changes before they take effect</ListItem>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Your continued use of TourEase after changes become effective constitutes acceptance of the updated policy.
            </p>
          </PrivacySection>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 p-10 rounded-2xl border border-teal-200 dark:border-gray-800">
          <div className="flex items-center mb-6">
            <Mail className="w-10 h-10 text-teal-600 dark:text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
            please don't hesitate to reach out:
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-3 text-teal-600 dark:text-indigo-600" />
              <a href="mailto:support@tourease.com" className="text-teal-600 dark:text-indigo-600 hover:underline font-medium">
                support@tourease.com
              </a>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FileText className="w-5 h-5 mr-3 text-teal-600 dark:text-indigo-600" />
              <span>Data Protection Officer, TourEase Inc.</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-purple-700 dark:via-indigo-700 dark:to-purple-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 text-white dark:text-gray-100">
            Join thousands of travelers who trust TourEase with their travel planning
          </p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}

function OverviewCard({ icon, title, description, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm dark:shadow-lg border border-gray-100 dark:border-gray-800">
      <div className={`${color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function PrivacySection({ icon, title, iconColor, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm dark:shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-start mb-6">
        <div className={`${iconColor} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 mr-4`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{title}</h2>
      </div>
      <div className="leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex items-start text-gray-700 dark:text-gray-300">
      <span className="inline-block w-2 h-2 rounded-full bg-teal-500 dark:bg-indigo-600 mr-3 mt-2 flex-shrink-0"></span>
      <span>{children}</span>
    </li>
  );
}
