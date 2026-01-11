'use client';

import { useState, useRef, useEffect } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        setIsLoading(false);
        setEmail('');
    };

    return (
        <section ref={sectionRef} className="relative bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`max-w-xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Icon/Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center rotate-45">
                            <div className="w-6 h-6 bg-white/10 -rotate-45"></div>
                        </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                        Inner <span className="text-[#333]">Circle</span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-gray-400 text-sm md:text-base mb-10 tracking-widest font-light">
                        UNLOCK EARLY ACCESS & EXCLUSIVE DROPS
                    </p>

                    {isSubmitted ? (
                        <div className="bg-white/5 border border-white/10 p-8">
                            <p className="text-white font-bold uppercase tracking-[0.2em] text-sm">Welcome to the Inner Circle.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER YOUR EMAIL"
                                required
                                className="w-full bg-transparent border-b border-white/20 py-5 text-center text-white placeholder-white/30 focus:border-white focus:outline-none transition-all text-sm md:text-lg tracking-[0.15em] font-medium"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                            >
                                {isLoading ? '...' : 'JOIN →'}
                            </button>
                        </form>
                    )}

                    {isSubmitted ? null : (
                        <p className="text-[#333] text-[10px] mt-8 uppercase tracking-widest">
                            Limited slots available.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
