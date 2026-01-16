export default function ContactPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    Contact Us
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-2 text-[#d41132]">Support</h2>
                            <p className="text-gray-600 mb-1">Need help with an order?</p>
                            <p className="text-2xl font-bold">support@viragge.com</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-2 text-[#d41132]">Phone & WhatsApp</h2>
                            <p className="text-gray-600 mb-1">Available Mon-Fri, 9am - 6pm</p>
                            <p className="text-2xl font-bold">+212 600 000 000</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-2 text-[#d41132]">HQ</h2>
                            <p className="text-lg font-medium">
                               fes, Morocco<br />
                               saheb el ouard
                            </p>
                        </section>
                    </div>

                    <div className="bg-[#F9F9F9] p-8 md:p-12 rounded-3xl border border-gray-100">
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Send us a message</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Name</label>
                                <input type="text" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Email</label>
                                <input type="email" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Message</label>
                                <textarea rows={4} className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-black transition-colors" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-900 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
