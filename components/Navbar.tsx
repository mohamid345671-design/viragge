'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { graphqlClient, GET_CATEGORIES } from '@/lib/graphql';
import SearchBar from './SearchBar';

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
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const pathname = usePathname();

    // Pages with light backgrounds that need dark navbar
    const isLightPage = pathname === '/shop' || pathname.startsWith('/product/');

    // Fetch ALL categories (including empty ones)
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data: any = await graphqlClient.request(GET_CATEGORIES);
                // Get ALL categories, no filtering by count
                const allCategories = data.productCategories.nodes;
                console.log('Fetched ALL categories for navbar:', allCategories);
                setCategories(allCategories);
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
        }
    }, [isMenuOpen]);

    // Determine if navbar should be dark (scrolled OR on light page)
    const isDark = isScrolled || isLightPage;

    // Contact Us sub-pages
    const contactLinks = [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping & Returns', href: '/shipping-returns' },
    ];

    // Social Links with SVG icons
    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/viraggethereal',
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/@viragge',
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
        },
        {
            name: 'Facebook',
            href: 'https://facebook.com/viragge',
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        },
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
                    <Link href="/" className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight sm:tracking-[0.1em] md:tracking-[0.2em] font-heading uppercase z-[80] whitespace-nowrap ${isDark ? 'text-black' : 'text-white'}`}>
                        VIRAGGE
                    </Link>

                    {/* RIGHT: Search */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className={`transition-colors z-50 ${isDark ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}
                        aria-label="Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* SIDE DRAWER MENU */}
            <div
                className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div className={`fixed top-0 left-0 h-full w-full max-w-md bg-white z-[70] transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">

                    {/* HEADER */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <div>
                            <h2 className="text-xs uppercase tracking-[0.25em] font-black text-gray-900">Menu</h2>
                            <p className="text-[10px] text-gray-400 mt-0.5 tracking-wide">Explore Collections</p>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300 p-2 hover:bg-gray-100 rounded-full"
                            aria-label="Close Menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* SCROLLABLE MENU */}
                    <div className="flex-1 overflow-y-auto">

                        {/* Main Menu Items */}
                        <nav className="py-2">

                            {/* 1. HOME */}
                            <Link
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="group flex items-center gap-3 px-6 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                            >
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-sm uppercase tracking-wide font-semibold text-gray-700 group-hover:text-black group-hover:translate-x-1 transition-all">
                                    Home
                                </span>
                            </Link>

                            {/* 2. NEW ARRIVALS */}
                            <Link
                                href="/shop?sort=newest"
                                onClick={() => setIsMenuOpen(false)}
                                className="group flex items-center gap-3 px-6 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 relative"
                            >
                                <div className="relative">
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                </div>
                                <span className="text-sm uppercase tracking-wide font-semibold text-gray-700 group-hover:text-black group-hover:translate-x-1 transition-all">
                                    New Arrivals
                                </span>
                            </Link>

                            {/* 3. SHOP COLLECTIONS - Accordion */}
                            <div className="border-b border-gray-100">
                                <button
                                    onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                                    className="group flex items-center justify-between w-full px-6 py-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        <span className="text-sm uppercase tracking-wide font-semibold text-gray-700 group-hover:text-black transition-colors">Shop Collections</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-gray-400 group-hover:text-black transition-all duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCollectionsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-gradient-to-b from-gray-50 to-white py-2">
                                        {categories.length > 0 ? (
                                            categories.map((category, index) => (
                                                <Link
                                                    key={category.id}
                                                    href={`/shop?category=${category.name}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="group flex items-center justify-between px-6 py-3 pl-12 text-xs font-medium text-gray-600 hover:text-black hover:bg-white hover:shadow-sm transition-all"
                                                    style={{ animationDelay: `${index * 30}ms` }}
                                                >
                                                    <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                                                    <span className="text-[10px] text-gray-400 group-hover:text-gray-600">({category.count})</span>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="px-6 py-3 pl-12 text-xs text-gray-400">Loading categories...</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 4. CONTACT US - Accordion */}
                            <div className="border-b border-gray-100">
                                <button
                                    onClick={() => setIsContactOpen(!isContactOpen)}
                                    className="group flex items-center justify-between w-full px-6 py-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm uppercase tracking-wide font-semibold text-gray-700 group-hover:text-black transition-colors">Contact Us</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-gray-400 group-hover:text-black transition-all duration-300 ${isContactOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isContactOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-gradient-to-b from-gray-50 to-white py-2">
                                        {contactLinks.map((link, index) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="group flex items-center gap-3 px-6 py-3 pl-12 text-xs font-medium text-gray-600 hover:text-black hover:bg-white hover:shadow-sm transition-all"
                                                style={{ animationDelay: `${index * 30}ms` }}
                                            >
                                                <svg className="w-3 h-3 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 5. SOCIAL LINKS - Accordion */}
                            <div className="border-b border-gray-100">
                                <button
                                    onClick={() => setIsSocialOpen(!isSocialOpen)}
                                    className="group flex items-center justify-between w-full px-6 py-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        <span className="text-sm uppercase tracking-wide font-semibold text-gray-700 group-hover:text-black transition-colors">Social Links</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-gray-400 group-hover:text-black transition-all duration-300 ${isSocialOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSocialOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                                        <div className="space-y-3">
                                            {socialLinks.map((link) => (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all group"
                                                >
                                                    <div className="text-gray-700 group-hover:text-black group-hover:scale-110 transition-all">{link.icon}</div>
                                                    <span className="text-sm font-medium text-gray-800 group-hover:text-black">{link.name}</span>
                                                    <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </nav>
                    </div>

                    {/* FOOTER - Terms & Privacy */}
                    <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 p-6">
                        <div className="space-y-3">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Legal</p>
                            <Link
                                href="/terms"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-black hover:translate-x-1 transition-all"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Terms of Service
                            </Link>
                            <Link
                                href="/privacy-policy"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-black hover:translate-x-1 transition-all"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* SEARCH MODAL */}
            <div
                className={`fixed inset-0 z-[90] bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSearchOpen(false)}
            >
                <div className="flex items-start justify-center min-h-screen px-6 pt-24">
                    <div
                        className="w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Search Products</h2>
                            <p className="text-gray-400 text-sm">Find your next favorite piece</p>
                        </div>
                        <SearchBar />
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="mt-6 mx-auto hidden md:block text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            Press ESC or click outside to close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
