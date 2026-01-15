import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* MOBILE LAYOUT - Full Background with Centered Content */}
      <div className="lg:hidden relative h-screen w-full">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1660485760386-b8957f9b9b96?q=80&w=687&auto=format&fit=crop"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark Overlay - Multi-layer for depth */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* Centered Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 pt-20">
          <div className="text-center max-w-lg w-full">
            {/* Tech Badge */}
            <div className="mb-6 opacity-0 animate-slideUp flex justify-center">
              <span className="backdrop-blur-md bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-[0.3em] text-white px-4 py-1.5 rounded-full">
                Season 01 / 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-6 opacity-0 animate-slideUp animate-delay-200 drop-shadow-2xl">
              Tactical
              <br />
              <span className="text-gray-300">
                Luxury
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-gray-300 mb-8 leading-relaxed opacity-0 animate-slideUp animate-delay-300 font-medium tracking-wide">
              Engineered for the streets. Built for power.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 opacity-0 animate-slideUp animate-delay-400 w-full">
              <Link
                href="/shop"
                className="bg-white text-black text-xs font-black uppercase tracking-[0.2em] py-4 w-full hover:bg-gray-100 transition-colors"
              >
                Shop Latest
              </Link>
              <Link
                href="/shop?category=Hoodies"
                className="backdrop-blur-md bg-black/30 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] py-4 w-full hover:bg-white/10 transition-colors"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Split View */}
      <div className="hidden lg:flex min-h-screen relative z-10">

        {/* LEFT SIDE - Content */}
        <div className="w-1/2 flex items-center justify-center px-20 relative">
          {/* Glow Effect */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-xl relative">
            {/* Badge */}
            <div className="mb-8 opacity-0 animate-slideUp">
              <span className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full">
                <span className="w-1.5 h-1.5 bg-[#d41132] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
                  New Drop Live
                </span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-white mb-8 opacity-0 animate-slideUp animate-delay-200">
              Tactical
              <br />
              <span className="text-gray-400">
                Luxury
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-400 mb-12 leading-relaxed opacity-0 animate-slideUp animate-delay-300 max-w-md font-light tracking-wide">
              Elevate your everyday uniform. Premium materials, oversized fits, and uncompromising aesthetics for the modern vanguard.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-6 opacity-0 animate-slideUp animate-delay-400">
              <Link
                href="/shop"
                className="group relative bg-white text-black px-10 py-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative text-xs font-black uppercase tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-300">
                  Shop Now
                </span>
              </Link>

              <Link
                href="/shop?category=Hoodies"
                className="group text-white px-8 py-4 border border-white/20 hover:border-white/50 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  Explore
                </span>
              </Link>
            </div>

            {/* Stats - Minimal */}
            <div className="flex gap-12 mt-20 pt-10 border-t border-white/5 opacity-0 animate-slideUp animate-delay-400">
              <div>
                <h4 className="text-2xl font-bold text-white">01</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Premium Fabric</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">02</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Oversized Fit</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">03</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Shipping within morocco</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Image */}
        <div className="w-1/2 relative h-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1660485760386-b8957f9b9b96?q=80&w=687&auto=format&fit=crop"
            alt="Streetwear Model"
            fill
            priority
            sizes="50vw"
            className="object-cover object-top filter contrast-[1.1] brightness-[0.9]"
          />

          {/* Decorative Elements */}
          <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end gap-1">
            <div className="w-20 h-[1px] bg-white/50"></div>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-mono">VIRAGGE Collection / V2</p>
          </div>
        </div>

      </div>
    </section>
  );
}