export default function PrivacyPolicyPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">1. Information We Collect</h2>
                        <p>
                            We collect only the information necessary to process your order and provide delivery services. This includes your Name, Phone Number, Shipping Address, and City. We do not store payment information as we operate on a Cash on Delivery basis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">2. How We Use Your Information</h2>
                        <p>
                            Your information is used solely for:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Processing and delivering your order.</li>
                            <li>Communicating with you regarding your delivery status.</li>
                            <li>Improving our products and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">3. Data Protection</h2>
                        <p>
                            We implement strict security measures to maintain the safety of your personal information. We do not sell, trade, or transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website or shipping your orders (e.g., delivery couriers).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">4. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us via our Contact page.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
