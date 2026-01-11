import Image from 'next/image';

export default function BrandStory() {
    return (
        <section className="bg-black text-white py-20 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Modern Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Image Gallery - Clean & Minimal */}
                    <div className="relative order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Large Feature Image */}
                            <div className="col-span-2 relative aspect-[16/10] overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1547942767-17210e756857?q=80&w=1530&auto=format&fit=crop"
                                    alt="STRECTIFY Craftsmanship"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            {/* Two Smaller Images */}
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop"
                                    alt="Urban Style"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop"
                                    alt="Design Detail"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content - Refined Typography */}
                    <div className="order-1 lg:order-2 space-y-8">
                        {/* Eyebrow */}
                        <div className="inline-block">
                            <span className="text-[#d41132] font-bold tracking-[0.3em] uppercase text-xs border border-[#d41132] px-4 py-2">
                                Est. 2024 — Milan
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            Engineering<br />
                            <span className="text-transparent text-stroke-white">Identity</span>
                        </h2>

                        {/* Body Copy */}
                        <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                            <p className="font-light">
                                STRECTIFY wasn't born in a boardroom. It was forged in the concrete canyons of Milan,
                                where raw urban energy meets uncompromising craftsmanship.
                            </p>
                            <p className="font-light">
                                We reject the temporary. We build for the relentless. Every stitch is a statement.
                                Every silhouette is engineered for those who refuse to blend in.
                            </p>
                            <p className="font-light">
                                Welcome to the new vanguard of urban luxury.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="pt-6">
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-[#d41132] transition-colors group border-b border-white/20 pb-2"
                            >
                                <span>Discover Our Story</span>
                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats Section - Modern Addition */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-[#d41132] mb-2">2024</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400">Founded</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-[#d41132] mb-2">100%</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400">Handcrafted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-[#d41132] mb-2">∞</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400">Dedication</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-[#d41132] mb-2">1:1</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400">Quality Focus</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
