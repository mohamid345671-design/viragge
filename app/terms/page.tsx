export default function TermsPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    Terms of Service
                </h1>

                <div className="space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">2. Cash on Delivery (COD) Policy</h2>
                        <p>
                            We operate on a Cash on Delivery basis. By placing an order, you agree to receive the package and pay the full amount due to the courier upon delivery. Refusal to accept a confirmed order may result in restriction from future purchases.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">3. Product Availability</h2>
                        <p>
                            All orders are subject to product availability. We reserve the right to discontinue any product at any time or cancel orders due to stock discrepancies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">4. Pricing</h2>
                        <p>
                            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-3">5. Intellectual Property</h2>
                        <p>
                            All content on this site, including text, graphics, logos, and images, is the property of STRECTIFY and protected by copyright laws.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
