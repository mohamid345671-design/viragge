'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FloatingSocial() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    // Check if we're on a product page
    const isProductPage = pathname?.startsWith('/product/');

    useEffect(() => {
        if (!isProductPage) {
            setIsVisible(true);
            return;
        }

        // On product page: hide by default, show when scrolling to footer
        setIsVisible(false);

        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (!footer) return;

            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Show when footer is in viewport
            if (footerRect.top < windowHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isProductPage]);

    const socials = [
        {
            name: 'Facebook',
            url: 'https://facebook.com/viragge',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            label: 'Facebook'
        },
        {
            name: 'TikTok',
            url: 'https://www.tiktok.com/@viragge',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            ),
            label: 'TikTok'
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/viraggethereal',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            label: 'Instagram'
        },
    ];

    return (
        <div className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}>
            <div className="flex flex-col gap-1">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-start text-white transition-all duration-500 ease-out overflow-hidden bg-black/80 backdrop-blur-sm border-r border-white/10 hover:border-[#d41132] w-12 hover:w-52 h-12 hover:shadow-2xl hover:shadow-[#d41132]/20"
                        aria-label={social.name}
                    >
                        {/* Icon container - Always visible */}
                        <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 relative z-10">
                            <div className="group-hover:scale-110 transition-transform duration-300">
                                {social.icon}
                            </div>
                        </div>

                        {/* Red accent line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d41132] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                        {/* Label - Slides in on hover */}
                        <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-6 text-white/90 group-hover:text-white">
                            {social.label}
                        </span>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </a>
                ))}
            </div>
        </div>
    );
}
