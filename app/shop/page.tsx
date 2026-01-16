'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CategoryFilter from '@/components/shop/CategoryFilter';
import ProductCard from '@/components/shop/ProductCard';
import { graphqlClient, GET_CATEGORIES, GET_PRODUCTS } from '@/lib/graphql';
import CategoryHero from '@/components/shop/CategoryHero';
import RelatedCategories from '@/components/shop/RelatedCategories';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface ProductFields {
    price: number | null;
    isNew: boolean;
    hoverImage: {
        node: {
            sourceUrl: string;
            altText: string;
        } | null;
    } | null;
    productGallery: {
        node: {
            sourceUrl: string;
            altText: string;
        } | null;
    } | null;
    galleryImage2: {
        node: {
            sourceUrl: string;
            altText: string;
        } | null;
    } | null;
    galleryImage3: {
        node: {
            sourceUrl: string;
            altText: string;
        } | null;
    } | null;
    availableSizes: string[] | null;
}

interface Product {
    databaseId: number;
    id: string;
    name: string;
    slug: string;
    price: string;
    date: string;
    image: {
        sourceUrl: string;
        altText: string;
    } | null;
    productCategories: {
        nodes: Array<{ name: string }>;
    };
    productFields: ProductFields | null;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
    image: {
        sourceUrl: string;
    } | null;
    description: string | null;
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

// Skeleton Card Component
const SkeletonCard = () => (
    <div className="animate-pulse">
        <div className="aspect-[3/4] bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] mb-3"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] w-3/4"></div>
            <div className="h-3 bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] w-1/2"></div>
        </div>
    </div>
);

// 1. Rename the main logic component to ShopContent (not exported)
function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    const [categories, setCategories] = useState<Category[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [loading, setLoading] = useState(true);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [productsPerPage] = useState(9); // 3x3 Grid
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data: any = await graphqlClient.request(GET_CATEGORIES);
                setCategories(data.productCategories.nodes.filter((cat: Category) => cat.count > 0));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    // Fetch products
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data: any = await graphqlClient.request(GET_PRODUCTS, { first: 100 });
                setAllProducts(data.products.nodes);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Filter Logic
    useEffect(() => {
        let filtered = [...allProducts];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.productCategories.nodes.some(cat => cat.name.toLowerCase().includes(query))
            );
        }

        if (activeCategory !== 'All') {
            filtered = filtered.filter(product =>
                product.productCategories.nodes.some(cat => cat.name === activeCategory)
            );
        }

        filtered.sort((a, b) => {
            const priceA = a.productFields?.price ?? parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
            const priceB = b.productFields?.price ?? parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');

            switch (sortBy) {
                case 'price-low': return priceA - priceB;
                case 'price-high': return priceB - priceA;
                case 'name': return a.name.localeCompare(b.name);
                default: return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [activeCategory, allProducts, sortBy, searchQuery]);

    useEffect(() => {
        const endIndex = currentPage * productsPerPage;
        setDisplayedProducts(filteredProducts.slice(0, endIndex));
    }, [filteredProducts, currentPage, productsPerPage]);

    // Sync URL query params with state
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const sortParam = searchParams.get('sort');

        if (categoryParam && categoryParam !== activeCategory) {
            setActiveCategory(categoryParam);
        } else if (!categoryParam && activeCategory !== 'All') {
            setActiveCategory('All');
        }

        if (sortParam && sortParam !== sortBy) {
            setSortBy(sortParam as SortOption);
        }
    }, [searchParams]);

    const currentCategoryData = categories.find(c => c.name === activeCategory);

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Initial Fade In
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => setFadeIn(true), []);

    return (
        <main className="min-h-screen bg-white text-black">
            <div className="max-w-[1600px] mx-auto px-3 md:px-6 py-12 md:py-20">
                {/* Dynamic Hero or Standard Header */}
                {activeCategory !== 'All' ? (
                    <CategoryHero categoryName={activeCategory} />
                ) : (
                    <div className="pt-32 pb-10 container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-2 animate-slideUp">Shop All</h1>
                        <p className="text-[#666] tracking-wide animate-slideUp animate-delay-100">Browse our complete collection</p>
                    </div>
                )}

                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Mobile Filter Toggle (Sticky) - Enhanced */}
                    <div className="lg:hidden sticky top-[72px] z-30 bg-white/95 backdrop-blur-md py-4 mb-6 border-b border-gray-200 shadow-sm transition-all">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="relative flex items-center gap-2.5 px-4 py-2.5 bg-black text-white font-bold uppercase tracking-wider text-xs hover:bg-gray-800 transition-all active:scale-95 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                <span>Filter & Sort</span>
                                {(activeCategory !== 'All' || searchQuery) && (
                                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                                        {(activeCategory !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                            <div className="text-right">
                                <p className="text-xs font-black text-black">{filteredProducts.length}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Items</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filter Drawer - Premium Design */}
                    <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        {/* Glassmorphism Overlay */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md"
                            onClick={() => setIsMobileFilterOpen(false)}
                        />

                        {/* Full-Width Drawer */}
                        <div className={`absolute right-0 top-0 h-full w-full bg-white overflow-y-auto transform transition-all duration-500 ease-out ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            {/* Header */}
                            <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b-2 border-black flex justify-between items-center shadow-sm">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight">Filters</h2>
                                    {(activeCategory !== 'All' || searchQuery) && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {(activeCategory !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0)} active
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition-all active:scale-90 font-bold text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-8 space-y-10">
                                {/* Search */}
                                <div>
                                    <h3 className="font-black uppercase tracking-[0.2em] mb-5 text-xs text-gray-500">Search Products</h3>
                                    <input
                                        type="text"
                                        placeholder="Type to search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-gray-200 p-4 text-base focus:outline-none focus:bg-white focus:border-black transition-all placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Categories */}
                                <div>
                                    <h3 className="font-black uppercase tracking-[0.2em] mb-5 text-xs text-gray-500">Collections</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            className={`px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 active:scale-95 ${activeCategory === 'All'
                                                ? 'bg-black text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            onClick={() => { setActiveCategory('All'); }}
                                        >
                                            All
                                        </button>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                className={`px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 active:scale-95 ${activeCategory === cat.name
                                                    ? 'bg-black text-white shadow-lg scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                onClick={() => { setActiveCategory(cat.name); }}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort */}
                                <div>
                                    <h3 className="font-black uppercase tracking-[0.2em] mb-5 text-xs text-gray-500">Sort Order</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { label: 'Newest', value: 'newest' },
                                            { label: 'Price: Low', value: 'price-low' },
                                            { label: 'Price: High', value: 'price-high' },
                                            { label: 'Name A-Z', value: 'name' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setSortBy(opt.value as SortOption)}
                                                className={`py-4 px-4 text-sm font-bold uppercase tracking-wide transition-all duration-200 active:scale-95 ${sortBy === opt.value
                                                    ? 'bg-black text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer - Sticky Apply Button */}
                            <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 px-6 py-5 shadow-2xl">
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full bg-black text-white font-black uppercase py-5 tracking-[0.2em] text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
                                >
                                    Show {filteredProducts.length} Results
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Desktop Sidebar Filters */}
                        <aside className="hidden lg:block lg:w-1/4">
                            <div className="sticky top-24 space-y-8">
                                {/* Search */}
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider mb-4 text-xs text-gray-400 border-b border-gray-200 pb-2">Search</h3>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Type to search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Categories */}
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider mb-4 text-xs text-gray-400 border-b border-gray-200 pb-2">Collections</h3>
                                    <ul className="space-y-3">
                                        <li
                                            className={`cursor-pointer text-sm hover:translate-x-1 transition-transform inline-block w-full ${activeCategory === 'All' ? 'font-black text-black' : 'text-gray-500 hover:text-black'}`}
                                            onClick={() => setActiveCategory('All')}
                                        >
                                            View All
                                        </li>
                                        {categories.map(cat => (
                                            <li
                                                key={cat.id}
                                                className={`cursor-pointer text-sm hover:translate-x-1 transition-transform flex justify-between group ${activeCategory === cat.name ? 'font-black text-black' : 'text-gray-500 hover:text-black'}`}
                                                onClick={() => setActiveCategory(cat.name)}
                                            >
                                                <span>{cat.name}</span>
                                                <span className="text-xs text-gray-300 group-hover:text-gray-500">{cat.count}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Sort */}
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider mb-4 text-xs text-gray-400 border-b border-gray-200 pb-2">Sort Order</h3>
                                    <div className="space-y-2">
                                        {[
                                            { label: 'Newest', value: 'newest' },
                                            { label: 'Price: Low', value: 'price-low' },
                                            { label: 'Price: High', value: 'price-high' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setSortBy(opt.value as SortOption)}
                                                className={`block text-sm text-left w-full hover:text-black transition-colors ${sortBy === opt.value ? 'font-bold text-black underline decoration-2 underline-offset-4' : 'text-gray-500'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div className="lg:w-3/4">
                            {/* Active Filters & Clear All */}
                            {(activeCategory !== 'All' || searchQuery) && !loading && (
                                <div className="mb-6 pb-4 border-b border-gray-200">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                                            Active Filters:
                                        </span>

                                        {activeCategory !== 'All' && (
                                            <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs font-medium uppercase tracking-wide">
                                                {activeCategory}
                                                <button
                                                    onClick={() => setActiveCategory('All')}
                                                    className="hover:text-[#d41132] transition-colors"
                                                    aria-label="Remove category filter"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}

                                        {searchQuery && (
                                            <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs font-medium uppercase tracking-wide">
                                                Search: "{searchQuery}"
                                                <button
                                                    onClick={() => setSearchQuery('')}
                                                    className="hover:text-[#d41132] transition-colors"
                                                    aria-label="Clear search"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}

                                        <button
                                            onClick={() => {
                                                setActiveCategory('All');
                                                setSearchQuery('');
                                            }}
                                            className="ml-auto text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors underline underline-offset-2"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-3">
                                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                                    </p>
                                </div>
                            )}

                            {/* Loading State with Stagger */}
                            {loading && (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-8">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} style={{ animationDelay: `${i * 50}ms` }} className="animate-fadeIn">
                                            <SkeletonCard />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Products */}
                            {!loading && displayedProducts.length > 0 && (
                                <div className={`transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-8">
                                        {displayedProducts.map((product, index) => (
                                            <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fadeIn">
                                                <ProductCard product={product} priority={index < 4} />
                                            </div>
                                        ))}
                                    </div>

                                    {displayedProducts.length < filteredProducts.length && (
                                        <div className="text-center mt-16">
                                            <button
                                                onClick={() => setCurrentPage(prev => prev + 1)}
                                                className="group inline-flex items-center justify-center px-10 py-4 font-bold text-white bg-black hover:bg-[#d41132] transition-colors duration-300 uppercase tracking-widest text-xs shadow-lg hover:shadow-xl"
                                            >
                                                Load More Products
                                                <svg
                                                    className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading && filteredProducts.length === 0 && (
                                <div className="text-center py-32">
                                    <h3 className="text-xl font-bold uppercase mb-2">No products found</h3>
                                    <p className="text-[#888] mb-6">Try adjusting your search or filters</p>
                                    <button
                                        onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                                        className="text-black font-bold uppercase border-b-2 border-black hover:text-[#d41132] hover:border-[#d41132] transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* "Explore More" - Only on Category Views */}
                {activeCategory !== 'All' && categories.length > 0 && (
                    <RelatedCategories categories={categories} currentCategory={activeCategory} />
                )}
            </div>
        </main>
    );
}

// 2. Export the Wrapper Component that uses Suspense
export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-6 py-32 text-center">
                <div className="animate-pulse flex flex-col items-center justify-center">
                    <div className="h-8 w-64 bg-gray-200 mb-4 rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}