'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

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

// ============================================
// HERO CATEGORY CARD
// ============================================

const HeroCategory = ({ category }: { category: Category }) => {
    const displayImage = category.image?.sourceUrl || '/placeholder.svg';

    return (
        <Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="group block">
            <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gray-50 rounded-lg">
                <Image
                    src={displayImage}
                    alt={`${category.name} collection`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="text-xs uppercase tracking-[0.3em] mb-3 text-white/80">Featured Collection</div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        {category.name}
                    </h2>
                    <p className="text-sm md:text-base mb-6 text-white/90">
                        {category.count > 0 ? `${category.count} items available` : 'Explore collection'}
                    </p>
                    <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                        <span>Shop Now</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// ============================================
// GRID CATEGORY CARD (for 3-column grid)
// ============================================

const GridCategoryCard = ({ category, index }: { category: Category; index: number }) => {
    const displayImage = category.image?.sourceUrl || '/placeholder.svg';

    return (
        <Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="group block">
            <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                    <Image
                        src={displayImage}
                        alt={category.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-[#d41132] transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {category.count} Items
                    </p>
                </div>
            </div>
        </Link>
    );
};

// ============================================
// LARGE SPLIT CARD
// ============================================

const LargeSplitCard = ({ category }: { category: Category }) => {
    const displayImage = category.image?.sourceUrl || '/placeholder.svg';

    return (
        <Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="group block h-full">
            <div className="relative h-full min-h-[500px] md:min-h-[600px] overflow-hidden bg-gray-50 rounded-lg">
                <Image
                    src={displayImage}
                    alt={category.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">
                        {category.name}
                    </h3>
                    <p className="text-sm mb-4 text-white/90">
                        {category.count} Items
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <span>Explore</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// ============================================
// COMPACT CAROUSEL CARD
// ============================================

const CompactCarouselCard = ({ category }: { category: Category }) => {
    const displayImage = category.image?.sourceUrl || '/placeholder.svg';

    return (
        <Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="group block">
            <div className="bg-white overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                        src={displayImage}
                        alt={category.name}
                        fill
                        loading="lazy"
                        sizes="250px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-3">
                    <h4 className="text-sm font-bold uppercase tracking-tight group-hover:text-[#d41132] transition-colors line-clamp-1">
                        {category.name}
                    </h4>
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

    // Category distribution
    const essentialCat = filteredCategories.find(cat => cat.slug === 'essential') || filteredCategories[0];
    const remainingCats = filteredCategories.filter(cat => cat.id !== essentialCat?.id);

    const gridCats = remainingCats.slice(0, 6); // 3-column grid (show 3, but have 6 total for swipe)
    const splitCats = remainingCats.slice(6, 8); // 2 large split grids
    const carouselCats = remainingCats.slice(8); // Rest in bottom carousel

    // Embla carousel for 3-column grid
    const [gridEmblaRef, gridEmblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 3 }
        }
    });
    const [gridSelectedIndex, setGridSelectedIndex] = useState(0);

    // Embla carousel for bottom carousel
    const [carouselEmblaRef, carouselEmblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1
    });

    useEffect(() => {
        if (!gridEmblaApi) return;

        const onSelect = () => {
            setGridSelectedIndex(gridEmblaApi.selectedScrollSnap());
        };

        gridEmblaApi.on('select', onSelect);
        onSelect();

        return () => {
            gridEmblaApi.off('select', onSelect);
        };
    }, [gridEmblaApi]);

    return (
        <section className="bg-white text-black border-b border-gray-100">
            <div className="container mx-auto px-3 md:px-6 py-16 md:py-24 space-y-12 md:space-y-20">

                {/* PAGE HEADER */}
                <header className="text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-4">
                        Shop by Category
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 font-light tracking-wide">
                        Explore our core collections
                    </p>
                </header>

                {/* SECTION 1: HERO ESSENTIAL CATEGORY */}
                {essentialCat && (
                    <div className="animate-fadeIn">
                        <HeroCategory category={essentialCat} />
                    </div>
                )}

                {/* SECTION 2: 3-COLUMN SWIPEABLE GRID */}
                {gridCats.length > 0 && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 md:mb-8">
                            Trending Collections
                        </h2>
                        <div className="overflow-hidden" ref={gridEmblaRef}>
                            <div className="flex gap-4 md:gap-6">
                                {gridCats.map((cat, idx) => (
                                    <div key={cat.id} className="flex-[0_0_85%] md:flex-[0_0_calc(33.333%-16px)] min-w-0">
                                        <GridCategoryCard category={cat} index={idx} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dots Navigation */}
                        {gridCats.length > 3 && (
                            <div className="flex justify-center items-center gap-2 mt-6">
                                {Array.from({ length: Math.ceil(gridCats.length / 3) }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => gridEmblaApi?.scrollTo(idx * 3)}
                                        className={`h-2 rounded-full transition-all ${gridSelectedIndex >= idx * 3 && gridSelectedIndex < (idx + 1) * 3
                                            ? 'w-8 bg-black'
                                            : 'w-2 bg-gray-300'
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* SECTION 3: TWO LARGE SPLIT GRIDS */}
                {splitCats.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {splitCats.map((cat) => (
                            <LargeSplitCard key={cat.id} category={cat} />
                        ))}
                    </div>
                )}

                {/* SECTION 4: REMAINING CATEGORIES CAROUSEL */}
                {carouselCats.length > 0 && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 md:mb-8">
                            More Collections
                        </h2>
                        <div className="overflow-hidden" ref={carouselEmblaRef}>
                            <div className="flex gap-4">
                                {carouselCats.map((cat) => (
                                    <div key={cat.id} className="flex-[0_0_45%] md:flex-[0_0_250px] min-w-0">
                                        <CompactCarouselCard category={cat} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
