import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white border-t border-white/10">
            <div className="container mx-auto px-6 py-16 md:py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl font-bold tracking-[0.2em] uppercase">
                            VIRAGGE
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium tactical streetwear designed for the modern urbanite. Quality craftsmanship meets contemporary style.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-10 h-10 bg-white/5 hover:bg-[#d41132] border border-white/10 hover:border-[#d41132] flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-10 h-10 bg-white/5 hover:bg-[#d41132] border border-white/10 hover:border-[#d41132] flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="TikTok"
                            >
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-10 h-10 bg-white/5 hover:bg-[#d41132] border border-white/10 hover:border-[#d41132] flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Shop */}
                    <nav className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'All Products', href: '/shop' },
                                { name: 'New Arrivals', href: '/shop?sort=newest' },
                                { name: 'Hoodies', href: '/shop?category=Hoodies' },
                                { name: 'Sweatpants', href: '/shop?category=Sweatpants' },
                                { name: 'Jackets', href: '/shop?category=Jackets' },
                                { name: 'Sets', href: '/shop?category=Sets' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Column 3: Support */}
                    <nav className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Contact Us', href: '/contact' },
                                { name: 'Shipping & Returns', href: '/shipping-returns' },
                                { name: 'Size Guide', href: '/size-guide' },
                                { name: 'FAQ', href: '/faq' },
                                { name: 'Track Order', href: '/track-order' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Column 4: Legal */}
                    <nav className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Terms of Service', href: '/terms' },
                                { name: 'Refund Policy', href: '/refund-policy' },
                                { name: 'Cookie Policy', href: '/cookie-policy' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                        © {currentYear} Viragge. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Designed & Crafted in Fes, Morocco 🇲🇦
                    </p>
                </div>
            </div>
        </footer>
    );
}
