import React from 'react';

export const metadata = {
    title: 'Terms & Conditions - Manima',
    description: 'Terms and Conditions for Manima Services',
};

const TermsConditions = () => {
    return (
        <div className="bg-[#fffbf2] min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold text-[#2c0e0e] mb-8 font-heading text-center">Terms & Conditions</h1>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-[#e6dac8] text-[#5c4d44] leading-relaxed space-y-6">
                    <p className="italic text-sm text-[#8d7a6f]">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Manima Services</strong> ("we," "us," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">2. Services</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Booking:</strong> By booking a service through our Site, you agree to provide accurate and complete information.</li>
                            <li><strong>Pandit/Priest Services:</strong> Our services connect you with verified pandits/priests for religious ceremonies and rituals.</li>
                            <li><strong>Availability:</strong> All bookings are subject to availability. We reserve the right to cancel or modify bookings in unforeseen circumstances.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">3. Payments and Refunds</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Payment:</strong> Payment must be made in full at the time of booking or as agreed upon.</li>
                            <li><strong>Refunds:</strong> Cancellations made within the specified timeframe may be eligible for a refund, minus any processing fees. Please contact us for specific cancellation policies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">4. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">5. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                            <li>You are not a minor in the jurisdiction in which you reside.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">6. Limitation of Liability</h2>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">7. Governing Law</h2>
                        <p>
                            These conditions are governed by and construed in accordance with the laws of India, and the application of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#D35400] mb-4">8. Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
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

export default TermsConditions;
