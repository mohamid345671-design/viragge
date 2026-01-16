export default function ShippingReturnsPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    Shipping & Returns
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4 flex items-center gap-3">
                            <span className="text-2xl">🚚</span> Shipping Policy
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            <p className="mb-4">
                                At STRECTIFY, we believe getting your gear should be fast and hassle-free.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Cost:</strong> Free shipping on ALL orders. No minimum purchase required.</li>
                                <li><strong>Speed:</strong> Delivery within 24 to 48 hours nationwide (Morocco).</li>
                                <li><strong>Carrier:</strong> We use trusted local couriers to ensure your package arrives safely.</li>
                                <li><strong>Cash on Delivery (COD):</strong> You pay only when you receive your package.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4 flex items-center gap-3">
                            <span className="text-2xl">🔄</span> Return Policy
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            <p className="mb-4">
                                Not satisfied with your fit? No problem. We offer a 30-day return policy.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Eligibility:</strong> Items must be unworn, unwashed, and in original packaging with tags attached.</li>
                                <li><strong>Timeframe:</strong> You have 30 days from the date of delivery to initiate a return.</li>
                                <li><strong>Process:</strong> Contact our support team via WhatsApp or Email to schedule a return pickup.</li>
                                <li><strong>Refunds:</strong> Once we receive and inspect the item, we will process your refund or exchange immediately.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
