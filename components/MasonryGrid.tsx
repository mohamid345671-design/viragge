'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// ============================================
// TYPES & INTERFACES
// ============================================

interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
    image: {
        sourceUrl: string;
    } | null;
    categoryFields?: {
        archiveGridImage: string | null;
    };
}

interface MasonryGridProps {
    categories: Category[];
}

interface CategoryCardProps {
    category: Category;
    index: number;
    isVisible: boolean;
    isEven: boolean;
}

// ============================================
// CATEGORY CARD COMPONENT
// ============================================

const CategoryCard = ({ category, index, isVisible, isEven }: CategoryCardProps) => {
    const displayImage = category.image?.sourceUrl || '/placeholder.svg';
    const isPriority = index === 0; // Priority for first image only

    return (
        <Link
            href={`/shop?category=${category.slug}`}
            className="group block"
            aria-label={`Shop ${category.name} collection with ${category.count} items`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 bg-white border-2 md:border border-gray-200 md:border-gray-100 overflow-hidden active:border-gray-400 md:hover:border-gray-300 transition-all duration-300 md:hover:shadow-2xl shadow-sm md:shadow-none rounded-none md:rounded-lg">

                {/* IMAGE */}
                <div
                    className={`relative aspect-[3/4] md:aspect-square overflow-hidden bg-gray-50 ${isEven ? 'md:order-1' : 'md:order-2'
                        } transition-all duration-700 ${isVisible
                            ? 'opacity-100 translate-x-0 scale-100'
                            : `opacity-0 ${isEven ? '-translate-x-12' : 'translate-x-12'} scale-95`
                        }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    <Image
                        src={displayImage}
                        alt={`${category.name} collection featuring premium streetwear`}
                        fill
                        priority={isPriority}
                        loading={isPriority ? undefined : 'lazy'}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 active:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* TEXT CONTENT */}
                <div
                    className={`flex flex-col justify-center p-10 md:p-12 lg:p-16 ${isEven ? 'md:order-2' : 'md:order-1'
                        } transition-all duration-700 ${isVisible
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-12 scale-95'
                        }`}
                    style={{ transitionDelay: `${index * 100 + 150}ms` }}
                >
                    <div>
                        {/* Category Index */}
                        <div className="text-xs font-mono text-gray-400 tracking-[0.3em] mb-4 uppercase">
                            Collection {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Category Name */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-5 md:mb-4 group-hover:text-[#d41132] transition-colors duration-300 leading-[0.95]">
                            {category.name}
                        </h2>

                        {/* Item Count */}
                        <p className="text-sm md:text-base text-gray-600 mb-8 md:mb-8 font-medium">
                            {category.count > 0 ? `${category.count} items available` : 'Explore collection'}
                        </p>

                        {/* Premium CTA Button */}
                        <div className="inline-flex">
                            <div className="inline-flex items-center gap-3 px-6 py-4 md:px-0 md:py-0 bg-black md:bg-transparent text-white md:text-black font-bold uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300 group-hover:text-[#d41132] active:scale-95 md:active:scale-100 shadow-lg md:shadow-none">
                                <span className="relative">
                                    Shop Now
                                    {/* Animated underline - desktop only */}
                                    <span className="hidden md:block absolute left-0 bottom-0 w-0 h-0.5 bg-[#d41132] transition-all duration-300 group-hover:w-full" />
                                </span>
                                {/* Arrow */}
                                <svg
                                    className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:translate-x-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
};

// ============================================
// MAIN MASONRY GRID COMPONENT
// ============================================

export default function MasonryGrid({ categories }: MasonryGridProps) {
    // Filter out underwear
    const filteredCategories = categories.filter(cat => cat.slug !== 'underwear');

    // Track which categories are visible
    const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());
    const categoryRefs = useRef<(HTMLElement | null)[]>([]);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = categoryRefs.current.indexOf(entry.target as HTMLElement);
                        if (index !== -1) {
                            setVisibleCategories(prev => new Set([...prev, index]));
                        }
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        categoryRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [filteredCategories.length]);

    return (
        <section className="bg-white text-black border-b border-gray-100">
            <div className="container mx-auto px-6 py-20 md:py-32">

                {/* PAGE HEADER */}
                <header className="text-center mb-20 md:mb-28">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-4">
                        Shop by Category
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 font-light tracking-wide">
                        Explore our core collections
                    </p>
                </header>

                {/* CATEGORY BLOCKS - Alternating Layout */}
                <div className="max-w-7xl mx-auto space-y-8 md:space-y-20">
                    {filteredCategories.map((category, index) => (
                        <div
                            key={category.id}
                            ref={el => { categoryRefs.current[index] = el; }}
                        >
                            <CategoryCard
                                category={category}
                                index={index}
                                isVisible={visibleCategories.has(index)}
                                isEven={index % 2 === 0}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
