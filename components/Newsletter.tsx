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
        <section ref={sectionRef} className="relative bg-black py-28 md:py-36 overflow-hidden border-t border-white/10" style={{
            background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)'
        }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            {/* Animated Glow - Simplified for iOS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 opacity-10 pointer-events-none animate-pulse" style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
            }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Icon/Badge */}
                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <div className="w-14 h-14 border-2 border-white/30 flex items-center justify-center rotate-45 hover:rotate-90 transition-transform duration-500">
                                <div className="w-7 h-7 bg-gradient-to-br from-white/20 to-white/5 -rotate-45"></div>
                            </div>
                            <div className="absolute inset-0 bg-white/5 blur-xl rounded-full"></div>
                        </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-5">
                        Join The <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">Inner Circle</span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-gray-400 text-sm md:text-base mb-12 tracking-[0.2em] font-semibold uppercase">
                        Unlock Early Access & Exclusive Drops
                    </p>

                    {isSubmitted ? (
                        <div className="bg-gradient-to-r from-white/5 to-white/10 border-2 border-white/20 p-10 animate-fadeIn backdrop-blur-sm">
                            <svg className="w-12 h-12 mx-auto mb-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-white font-black uppercase tracking-[0.3em] text-sm md:text-base">Welcome to the Inner Circle</p>
                            <p className="text-gray-400 text-xs mt-3">Check your inbox for exclusive access</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ENTER YOUR EMAIL"
                                    required
                                    autoComplete="email"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/20 py-6 px-8 text-center text-white placeholder-white/40 focus:border-white/60 focus:bg-white/10 focus:outline-none transition-all duration-300 text-base md:text-lg tracking-[0.2em] font-semibold uppercase"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-6 w-full bg-white text-black py-6 text-sm font-black uppercase tracking-[0.25em] hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Joining...
                                        </span>
                                    ) : 'Join The Circle →'}
                                </button>
                            </div>
                        </form>
                    )}

                    {isSubmitted ? null : (
                        <p className="text-gray-600 text-[11px] mt-8 uppercase tracking-[0.2em] font-medium">
                            Limited Slots Available • No Spam Ever
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
