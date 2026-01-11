'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { graphqlClient, GET_CATEGORIES } from '@/lib/graphql';

interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const pathname = usePathname();
    const [activeImage, setActiveImage] = useState<string | null>(null);

    // Pages with light backgrounds that need dark navbar
    const isLightPage = pathname === '/shop' || pathname.startsWith('/product/');

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data: any = await graphqlClient.request(GET_CATEGORIES);
                const fetchedCategories = data.productCategories.nodes.filter((cat: Category) => cat.count > 0);
                console.log('Fetched categories for navbar:', fetchedCategories);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setTimeout(() => setActiveImage(null), 500);
        }
    }, [isMenuOpen]);

    // Determine if navbar should be dark (scrolled OR on light page)
    const isDark = isScrolled || isLightPage;

    // Menu Data
    const menuItems = [
        { name: 'Shop All', href: '/shop', image: '/placeholder.svg' },
        { name: 'New Arrivals', href: '/shop?sort=newest', image: '/placeholder.svg' },
        { name: 'Hoodies', href: '/shop?category=Hoodies', image: '/placeholder.svg' },
        { name: 'Sweatpants', href: '/shop?category=Sweatpants', image: '/placeholder.svg' },
        { name: 'Jackets', href: '/shop?category=Jackets', image: '/placeholder.svg' },
        { name: 'Sets', href: '/shop?category=Sets', image: '/placeholder.svg' },
        { name: 'Denim', href: '/shop?category=Denim', image: '/placeholder.svg' },
    ];

    const defaultImage = '/placeholder.svg';

    // Secondary Links
    const secondaryLinks = [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping & Returns', href: '/shipping-returns' },
        { name: 'Terms of Service', href: '/terms' },
    ];

    const socialLinks = [
        { name: 'Instagram', href: '#' },
        { name: 'TikTok', href: '#' },
        { name: 'Twitter', href: '#' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isDark
                ? 'bg-white/95 backdrop-blur-xl py-4 border-b border-gray-200/50 shadow-sm'
                : 'bg-transparent py-6'
                }`}>
                <div className="container mx-auto px-6 flex items-center justify-between relative">

                    {/* LEFT: Hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`transition-colors z-50 group ${isDark ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}
                        aria-label="Menu"
                    >
                        <div className="space-y-1.5">
                            <span className={`block w-6 h-0.5 transition-transform group-hover:scale-x-75 origin-left ${isDark ? 'bg-black' : 'bg-white'}`}></span>
                            <span className={`block w-6 h-0.5 transition-transform group-hover:scale-x-100 ${isDark ? 'bg-black' : 'bg-white'}`}></span>
                            <span className={`block w-6 h-0.5 transition-transform group-hover:scale-x-75 origin-left ${isDark ? 'bg-black' : 'bg-white'}`}></span>
                        </div>
                    </button>

                    {/* CENTER: Brand */}
                    <Link href="/" className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl font-bold tracking-[0.2em] font-heading uppercase z-[80] ${isDark ? 'text-black' : 'text-white'}`}>
                        ZAKI-SHoP
                    </Link>

                    {/* RIGHT: Search */}
                    <Link
                        href="/shop"
                        className={`transition-colors z-50 ${isDark ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}
                        aria-label="Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Link>
                </div>
            </nav>

            {/* SIDE DRAWER MENU */}
            <div
                className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div className={`fixed top-0 left-0 h-full w-full md:w-[90vw] lg:w-[85vw] xl:w-[75vw] bg-white z-[70] transform transition-transform duration-700 ease-[cubic-bezier(0.9,0,0.1,1)] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-full">

                    {/* LEFT COLUMN: Links */}
                    <div className="w-full md:w-1/2 h-full p-10 md:p-20 relative flex flex-col justify-center border-r border-gray-100 overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 left-8 text-black hover:rotate-90 transition-transform duration-500"
                            aria-label="Close Menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col space-y-4">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    onMouseEnter={() => setActiveImage(item.image)}
                                    onMouseLeave={() => setActiveImage(null)}
                                    className="group relative text-4xl md:text-6xl font-black text-transparent text-stroke-black hover:text-black transition-all duration-300 uppercase tracking-tighter w-fit"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {item.name}
                                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-[#d41132] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Collections Accordion */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                                className="flex items-center justify-between w-full text-left text-xl font-black uppercase tracking-tight mb-4"
                            >
                                <span>Collections</span>
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${isCollectionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="space-y-2 pb-4">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/shop?category=${category.slug}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block py-2 text-sm font-medium text-gray-700 hover:text-black hover:translate-x-2 transition-all"
                                        >
                                            {category.name} ({category.count})
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Secondary Links (Footer) */}
                        <div className="mt-12 pt-8 border-t border-gray-100 w-full flex justify-between text-gray-500 text-sm uppercase tracking-widest font-bold">
                            <div className="space-y-3 flex flex-col">
                                {secondaryLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="hover:text-black transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col space-y-3 text-right">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="hover:text-black transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Dynamic Image Preview (Desktop Only) */}
                    <div className="hidden md:block w-1/2 h-full relative bg-neutral-100 overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={defaultImage}
                                alt="Menu"
                                fill
                                className="object-cover opacity-100 grayscale"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${activeImage ? 'opacity-100' : 'opacity-0'}`}>
                            {activeImage && (
                                <Image
                                    src={activeImage}
                                    alt="Menu Preview"
                                    fill
                                    className="object-cover transition-transform duration-700 scale-105"
                                />
                            )}
                        </div>

                        <div className="absolute bottom-12 right-12 z-20 text-white text-right">
                            <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2">Tactical Luxury</p>
                            <h3 className="text-4xl font-black uppercase tracking-tighter">Collection 2026</h3>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
