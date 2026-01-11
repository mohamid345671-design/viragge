'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { graphqlClient, GET_PRODUCTS } from '@/lib/graphql';

interface Product {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    price: string;
    image: {
        sourceUrl: string;
        altText: string;
    } | null;
    productCategories: {
        nodes: Array<{ name: string }>;
    };
    productFields: {
        price: number | null;
        isNew: boolean;
    } | null;
}

const categories = ['New', 'Hoodies', 'Sweatpants', 'Jackets'];

export default function TabbedProducts() {
    const [activeTab, setActiveTab] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for scroll-triggered animation
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

    // Fetch products for active category
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data: any = await graphqlClient.request(GET_PRODUCTS, { first: 50 });
                const allProducts = data.products.nodes;

                let filtered;
                if (activeTab === 0) {
                    // "New" tab - show products marked as new
                    filtered = allProducts.filter((product: Product) =>
                        product.productFields?.isNew === true
                    );
                } else {
                    // Category tabs
                    filtered = allProducts.filter((product: Product) =>
                        product.productCategories.nodes.some(cat =>
                            cat.name.toLowerCase() === categories[activeTab].toLowerCase()
                        )
                    );
                }

                setProducts(filtered.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [activeTab]);

    // Skeleton loader
    const SkeletonCard = () => (
        <div className="animate-pulse">
            <div className="aspect-[3/4] bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] w-1/2"></div>
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} className="bg-[#F4F4F4] py-20 text-black">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-black">
                        Shop by Category
                    </h2>

                    {/* Swipeable Tabs - Mobile Friendly */}
                    <div
                        ref={tabsRef}
                        className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0"
                    >
                        <div className="inline-flex gap-2 md:gap-0 md:bg-[#E8E8E8] p-1 min-w-max">
                            {categories.map((cat, index) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-6 md:px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${activeTab === index
                                        ? 'bg-black text-white'
                                        : 'bg-[#E8E8E8] md:bg-transparent text-[#666] hover:text-black'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-[#666] text-lg">No products in this category yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product, index) => {
                            const rawPrice = product.productFields?.price ?? parseFloat(product.price?.replace(/[^0-9.]/g, '') || '0');
                            const displayPrice = `${Math.round(rawPrice)} DH`;
                            const isNew = product.productFields?.isNew ?? false;

                            return (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.slug}`}
                                    className={`group cursor-pointer transition-all duration-500 ${isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {/* Image Container - Tactical Style */}
                                    <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3 shadow-sm group-hover:shadow-lg transition-all duration-300 p-3 flex items-center justify-center">
                                        {isNew && (
                                            <span className="absolute top-2 left-2 z-20 bg-[#d41132] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                                                New
                                            </span>
                                        )}
                                        {product.image?.sourceUrl ? (
                                            <Image
                                                src={product.image.sourceUrl}
                                                alt={product.image.altText || product.name}
                                                fill
                                                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#999] bg-[#F4F4F4]">
                                                No Image
                                            </div>
                                        )}

                                        {/* Quick View Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20 hidden md:block">
                                            <div className="w-full bg-black text-white font-bold uppercase text-xs py-3 tracking-widest hover:bg-[#d41132] transition-colors text-center">
                                                View Product
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-[#d41132] transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#666] text-xs uppercase tracking-wider">
                                            {product.productCategories.nodes[0]?.name || 'Product'}
                                        </p>
                                        <p className="font-black text-base md:text-lg">{displayPrice}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* View All Link */}
                <div className="text-center mt-10">
                    <Link
                        href={activeTab === 0 ? '/shop' : `/shop?category=${encodeURIComponent(categories[activeTab])}`}
                        className="inline-block bg-black text-white text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-[#333] transition-all duration-300"
                    >
                        View All {categories[activeTab]}
                    </Link>
                </div>
            </div>
        </section>
    );
}
