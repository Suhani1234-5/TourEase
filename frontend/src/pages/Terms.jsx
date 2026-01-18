import React from 'react';
import { FileText, Scale, AlertCircle, Shield, Users, UserCheck, Mail, BookOpen } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-16 h-16 text-white dark:text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-white dark:text-white">Terms of Service</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto text-center text-white dark:text-gray-100">
            Please read these terms carefully before using TourEase services.
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
            Welcome to TourEase. These Terms of Service ("Terms") govern your access to and use of our travel planning
            platform, services, and applications. By accessing or using TourEase, you agree to be bound by these Terms.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            If you do not agree to these Terms, please do not use our services. We reserve the right to update these
            Terms at any time, and your continued use of TourEase constitutes acceptance of any modifications.
          </p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <OverviewCard
            icon={<Scale className="w-8 h-8" />}
            title="Fair Usage"
            description="Use our services responsibly and legally"
            color="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
          />
          <OverviewCard
            icon={<Shield className="w-8 h-8" />}
            title="Your Rights"
            description="Clear terms on what you can expect from us"
            color="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
          />
          <OverviewCard
            icon={<Users className="w-8 h-8" />}
            title="Community"
            description="Guidelines for respectful interactions"
            color="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
          />
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          <TermsSection
            icon={<UserCheck className="w-8 h-8" />}
            title="Acceptance of Terms"
            iconColor="bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By creating an account or using TourEase, you acknowledge that:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>You are at least 13 years of age (or 18 in some jurisdictions)</ListItem>
              <ListItem>You have the legal capacity to enter into binding contracts</ListItem>
              <ListItem>You will provide accurate and complete registration information</ListItem>
              <ListItem>You will maintain the security of your account credentials</ListItem>
              <ListItem>You have read and agree to our Privacy Policy</ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<BookOpen className="w-8 h-8" />}
            title="Use of Services"
            iconColor="bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TourEase grants you a limited, non-exclusive, non-transferable license to access and use our services for personal, non-commercial purposes. You agree to:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>Use the platform only for lawful travel planning purposes</ListItem>
              <ListItem>Not attempt to gain unauthorized access to our systems or networks</ListItem>
              <ListItem>Not use automated systems (bots, scrapers) without permission</ListItem>
              <ListItem>Not interfere with or disrupt the integrity or performance of our services</ListItem>
              <ListItem>Not upload malicious code, viruses, or harmful content</ListItem>
              <ListItem>Respect intellectual property rights of TourEase and other users</ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<FileText className="w-8 h-8" />}
            title="User Content and Conduct"
            iconColor="bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You retain ownership of content you post, but grant TourEase a license to use it. You are responsible for:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>Content Standards:</strong> Ensuring your reviews, photos, and posts are accurate, respectful, and legal
              </ListItem>
              <ListItem>
                <strong>Prohibited Content:</strong> Not posting offensive, discriminatory, misleading, or copyright-infringing material
              </ListItem>
              <ListItem>
                <strong>Community Guidelines:</strong> Treating other users with respect and courtesy
              </ListItem>
              <ListItem>
                <strong>Moderation:</strong> Understanding that we may remove content that violates these Terms
              </ListItem>
              <ListItem>
                <strong>Liability:</strong> Accepting responsibility for consequences of your posted content
              </ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<Scale className="w-8 h-8" />}
            title="Third-Party Services"
            iconColor="bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TourEase may integrate with third-party services (hotels, transportation, activities). Please note:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>We are not responsible for the quality, availability, or performance of third-party services</ListItem>
              <ListItem>Separate terms and conditions may apply to third-party bookings</ListItem>
              <ListItem>Pricing, availability, and descriptions are provided by third parties and may change</ListItem>
              <ListItem>You should review the terms and policies of any third-party provider before booking</ListItem>
              <ListItem>Disputes with third-party providers should be resolved directly with them</ListItem>
            </ul>
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 dark:border-yellow-400 rounded">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  TourEase acts as a platform connecting you with travel services but is not a travel agency or tour operator.
                  We facilitate bookings but do not operate hotels, flights, or activities.
                </p>
              </div>
            </div>
          </TermsSection>

          <TermsSection
            icon={<Shield className="w-8 h-8" />}
            title="Disclaimers and Limitations of Liability"
            iconColor="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TourEase is provided "as is" without warranties of any kind:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>No Guarantee:</strong> We do not guarantee uninterrupted, secure, or error-free service
              </ListItem>
              <ListItem>
                <strong>Accuracy:</strong> While we strive for accuracy, we cannot guarantee all information is current or correct
              </ListItem>
              <ListItem>
                <strong>Travel Risks:</strong> You acknowledge that travel carries inherent risks, and we are not liable for travel-related incidents
              </ListItem>
              <ListItem>
                <strong>Limitation of Liability:</strong> Our liability is limited to the maximum extent permitted by law
              </ListItem>
              <ListItem>
                <strong>Indirect Damages:</strong> We are not liable for indirect, incidental, or consequential damages
              </ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<FileText className="w-8 h-8" />}
            title="Account Termination"
            iconColor="bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to suspend or terminate accounts that violate these Terms:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>You may close your account at any time through account settings</ListItem>
              <ListItem>We may suspend accounts for suspected fraudulent or illegal activity</ListItem>
              <ListItem>Repeated violations of community guidelines may result in permanent termination</ListItem>
              <ListItem>Upon termination, your right to use TourEase immediately ceases</ListItem>
              <ListItem>Some provisions of these Terms survive termination (e.g., intellectual property, liability limitations)</ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<Scale className="w-8 h-8" />}
            title="Intellectual Property"
            iconColor="bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All TourEase content, features, and functionality are owned by TourEase and are protected by copyright, trademark, and other laws:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>The TourEase name, logo, and branding are our trademarks</ListItem>
              <ListItem>You may not copy, modify, or distribute our content without permission</ListItem>
              <ListItem>User-generated content remains your property, but you grant us a license to use it</ListItem>
              <ListItem>If you believe your copyright has been infringed, please contact us</ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<AlertCircle className="w-8 h-8" />}
            title="Dispute Resolution"
            iconColor="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In the event of any dispute arising from these Terms or your use of TourEase:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>First, contact us to attempt informal resolution</ListItem>
              <ListItem>Disputes not resolved informally may be subject to binding arbitration</ListItem>
              <ListItem>You agree to waive the right to a jury trial or class action lawsuit</ListItem>
              <ListItem>These Terms are governed by the laws of California, USA</ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<FileText className="w-8 h-8" />}
            title="Changes to Terms"
            iconColor="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may modify these Terms from time to time:
            </p>
            <ul className="space-y-3 ml-6">
              <ListItem>Material changes will be notified via email or platform notice</ListItem>
              <ListItem>The "Last Updated" date at the top will reflect any changes</ListItem>
              <ListItem>Continued use after changes constitutes acceptance of new Terms</ListItem>
              <ListItem>If you disagree with changes, you should discontinue use of TourEase</ListItem>
            </ul>
          </TermsSection>

          <TermsSection
            icon={<BookOpen className="w-8 h-8" />}
            title="General Provisions"
            iconColor="bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-300"
          >
            <ul className="space-y-3 ml-6">
              <ListItem>
                <strong>Severability:</strong> If any provision is found invalid, the remainder continues in effect
              </ListItem>
              <ListItem>
                <strong>Waiver:</strong> Failure to enforce any right does not constitute a waiver
              </ListItem>
              <ListItem>
                <strong>Assignment:</strong> You may not assign these Terms; we may assign them to affiliates
              </ListItem>
              <ListItem>
                <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and TourEase
              </ListItem>
            </ul>
          </TermsSection>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950 p-10 rounded-2xl border border-teal-200 dark:border-gray-800">
          <div className="flex items-center mb-6">
            <Mail className="w-10 h-10 text-teal-600 dark:text-teal-400 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Questions About These Terms?</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            If you have questions or concerns about these Terms of Service, we're here to help:
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-3 text-teal-600 dark:text-teal-400" />
              <a href="mailto:support@tourease.com" className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                support@tourease.com
              </a>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FileText className="w-5 h-5 mr-3 text-teal-600 dark:text-teal-400" />
              <span>Legal Department, TourEase Inc., San Francisco, CA</span>
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

function TermsSection({ icon, title, iconColor, children }) {
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
      <span className="inline-block w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 mr-3 mt-2 flex-shrink-0"></span>
      <span>{children}</span>
    </li>
  );
}
