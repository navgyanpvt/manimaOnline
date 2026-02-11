import React from 'react';

export const metadata = {
    title: 'Privacy Policy - Manima',
    description: 'Privacy Policy for Manima Services',
};

const PrivacyPolicy = () => {
    return (
        <div className="bg-[#fffbf2] min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold text-[#2c0e0e] mb-8 font-heading text-center">Privacy Policy</h1>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-[#e6dac8] text-[#5c4d44] leading-relaxed space-y-6">
                    <p className="italic text-sm text-[#8d7a6f]">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">1. Introduction</h2>
                        <p>
                            Welcome to <strong>Manima Services</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your data when you visit our website or use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address when you book a service or contact us.</li>
                            <li><strong>Booking Details:</strong> Information related to the rituals or services you request, including dates, locations (e.g., Puri, Gaya), and specific requirements.</li>
                            <li><strong>Payment Information:</strong> Transaction details required to process your payments securely. (Note: We do not store sensitive card details on our servers).</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, and pages visited.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Facilitate and manage your ritual bookings and services.</li>
                            <li>Communicate with you regarding your bookings, updates, and offers.</li>
                            <li>Improve our website functionality and user experience.</li>
                            <li>Comply with legal obligations and resolve disputes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">4. Sharing of Information</h2>
                        <p>
                            We do not sell your personal information. We may share your data with:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Service Providers:</strong> Verified pandits and local partners involved in delivering the requested rituals.</li>
                            <li><strong>Legal Authorities:</strong> If required by law or to protect our rights and safety.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">5. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to safeguard your personal data against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">6. Your Rights</h2>
                        <p>
                            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at <a href="mailto:support@pindadaana.com" className="text-[#D35400] underline">support@pindadaana.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">7. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">8. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <address className="mt-2 not-italic">
                            <strong>Navgyan Innovations Pvt Ltd</strong><br />
                            Nilachakra Nagar, Gunupur, Rayagada, Odisha, India, 765022<br />
                            Email: support@pindadaana.com<br />
                            Phone: +91 98765 43210
                        </address>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
