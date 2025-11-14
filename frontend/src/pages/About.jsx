import React from 'react';
import { Users, Globe, Award, Heart, Zap, Target } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">About TourEase</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Empowering travelers worldwide with intelligent, accessible, and personalized travel planning solutions.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            We believe that travel planning should be effortless, personalized, and accessible to everyone.
                            TourEase was founded with a simple mission: to make travel planning smarter, faster, and more enjoyable.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            By combining artificial intelligence with real traveler insights, we've created a platform
                            that understands your travel style and helps you discover experiences perfectly tailored to you.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-12 flex items-center justify-center h-96">
                        <Globe className="w-48 h-48 text-teal-500 opacity-50" />
                    </div>
                </div>

                {/* Values Section */}
                <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <ValueCard
                        icon={<Heart className="w-12 h-12" />}
                        title="Traveler-First"
                        description="Every decision we make is centered around creating the best experience for our users and travelers."
                        color="bg-pink-100 text-pink-600"
                    />
                    <ValueCard
                        icon={<Target className="w-12 h-12" />}
                        title="Simplicity"
                        description="We believe in removing complexity and making travel planning intuitive and straightforward."
                        color="bg-orange-100 text-orange-600"
                    />
                    <ValueCard
                        icon={<Zap className="w-12 h-12" />}
                        title="Innovation"
                        description="We constantly push boundaries to bring cutting-edge AI and technology to the travel industry."
                        color="bg-yellow-100 text-yellow-600"
                    />
                    <ValueCard
                        icon={<Users className="w-12 h-12" />}
                        title="Community"
                        description="We foster a vibrant global community where travelers connect, share, and inspire each other."
                        color="bg-blue-100 text-blue-600"
                    />
                    <ValueCard
                        icon={<Award className="w-12 h-12" />}
                        title="Excellence"
                        description="We're committed to delivering exceptional quality in every feature, interaction, and experience."
                        color="bg-purple-100 text-purple-600"
                    />
                    <ValueCard
                        icon={<Globe className="w-12 h-12" />}
                        title="Accessibility"
                        description="We work to make travel planning accessible to everyone, regardless of their experience level."
                        color="bg-teal-100 text-teal-600"
                    />
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-6 text-center">Our Team</h2>
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                        A diverse group of travel enthusiasts, engineers, designers, and entrepreneurs united by the passion to revolutionize travel planning.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        <TeamMember name="Alex Johnson" role="Founder & CEO" />
                        <TeamMember name="Sarah Chen" role="Head of Product" />
                        <TeamMember name="Marcus Williams" role="Lead Engineer" />
                        <TeamMember name="Priya Singh" role="Designer" />
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>
                <div className="grid md:grid-cols-4 gap-8 mb-20">
                    <ImpactCard number="50K+" label="Happy Travelers" />
                    <ImpactCard number="150+" label="Destinations Covered" />
                    <ImpactCard number="4.9★" label="Average Rating" />
                    <ImpactCard number="100+" label="Languages" />
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Join Our Community of Smart Travelers
                    </h2>
                    <p className="text-xl mb-10 opacity-90">
                        Start your journey with TourEase today
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon, title, description, color }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mb-5`}>
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function TeamMember({ name, role }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                {name.charAt(0)}
            </div>
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <p className="text-gray-600">{role}</p>
        </div>
    );
}

function ImpactCard({ number, label }) {
    return (
        <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-12 rounded-xl text-center hover:shadow-md transition-all">
            <div className="text-5xl font-bold text-teal-600 mb-3">{number}</div>
            <div className="text-gray-700 font-semibold">{label}</div>
        </div>
    );
}
