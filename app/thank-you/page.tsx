import Link from 'next/link';

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-[#F9F9F9] flex items-center justify-center pt-20 pb-20 px-6">
            <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100">
                {/* Visual Success Icon */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-[#0f0f0f]">
                    Order Confirmed!
                </h1>

                <p className="text-gray-500 mb-8 leading-relaxed">
                    Thank you for your purchase. We have received your order and will contact you shortly via <strong>WhatsApp or Phone</strong> to confirm delivery details.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 text-sm text-left space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method:</span>
                        <span className="font-bold text-black">Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Delivery:</span>
                        <span className="font-bold text-black">24 - 48 Hours</span>
                    </div>
                </div>

                <Link
                    href="/shop"
                    className="block w-full bg-black text-white font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    Continue Shopping
                </Link>
            </div>
        </main>
    );
}
