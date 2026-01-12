'use client';

import { useState } from 'react';

export default function FeatureBar() {
    const [isPaused, setIsPaused] = useState(false);

    const features = [
        { icon: 'truck', title: 'FREE SHIPPING', desc: 'On all orders' },
        { icon: 'cash', title: 'CASH ON DELIVERY', desc: 'Pay when you receive' },
        { icon: 'return', title: 'EASY RETURNS', desc: '30 days return policy' },
        { icon: 'secure', title: 'SECURE PAYMENT', desc: '100% protected' },
        { icon: 'quality', title: 'PREMIUM QUALITY', desc: 'Handpicked materials' },
        { icon: 'fast', title: 'FAST DELIVERY', desc: '24-48h nationwide' },
    ];

    const Icon = ({ type }: { type: string }) => {
        const icons: { [key: string]: React.ReactElement } = {
            truck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />,
            cash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />,
            return: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />,
            secure: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
            quality: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
            fast: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
        };
        return (
            <svg className="w-6 h-6 transition-transform group-hover:scale-110 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[type]}
            </svg>
        );
    };

    const duplicatedFeatures = [...features, ...features];

    return (
        <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border-y border-white/10 py-4 overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="relative">
                {/* Edge Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Track */}
                <div
                    className={`flex ${isPaused ? '' : 'animate-marquee'}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {duplicatedFeatures.map((feature, index) => (
                        <div key={index} className="group flex items-center shrink-0 mx-12 cursor-default">
                            <span className="text-white/50 mr-4 group-hover:text-white/80 transition-colors">
                                <Icon type={feature.icon} />
                            </span>
                            <div className="flex flex-col">
                                <span className="text-white/95 text-xs font-black tracking-[0.2em] uppercase whitespace-nowrap group-hover:text-white transition-colors">
                                    {feature.title}
                                </span>
                                <span className="text-white/50 text-[10px] font-medium tracking-wider whitespace-nowrap mt-0.5 group-hover:text-white/70 transition-colors">
                                    {feature.desc}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
