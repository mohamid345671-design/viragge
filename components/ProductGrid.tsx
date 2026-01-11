'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
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

interface ProductGridProps {
    title?: string;
    category?: string;
    limit?: number;
}

export default function ProductGrid({ title = "Latest Drops", category, limit = 8 }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data: any = await graphqlClient.request(GET_PRODUCTS, { first: 50 });
                let allProducts = data.products.nodes;

                // Filter by category if provided
                if (category) {
                    allProducts = allProducts.filter((product: Product) =>
                        product.productCategories.nodes.some(cat =>
                            cat.name.toLowerCase() === category.toLowerCase()
                        )
                    );
                }

                // Limit to specified number
                setProducts(allProducts.slice(0, limit));
            } catch (error) {
                console.error('Error fetching products', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [category, limit]);

    // Construct View All link
    const viewAllLink = category ? `/shop?category=${encodeURIComponent(category)}` : '/shop';

    // Skeleton loader component - Tactical Style
    const SkeletonCard = ({ index }: { index: number }) => (
        <div
            className="animate-pulse"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="aspect-[3/4] bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] mb-3"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-[#E8E8E8] via-[#F4F4F4] to-[#E8E8E8] w-1/2"></div>
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} className="bg-[#FFFFFF] text-black py-24 border-b border-stone-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-[#d41132]"></div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                            {title}
                        </h2>
                    </div>

                    <Link
                        href={viewAllLink}
                        className="hidden md:flex items-center gap-2 group"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.25em] group-hover:text-[#d41132] transition-colors">
                            View All
                        </span>
                        <span className="text-xs group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(limit)].map((_, i) => (
                            <SkeletonCard key={i} index={i} />
                        ))}
                    </div>
                ) : (
                    <>
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
                                        {/* Image Container - Aspect Ratio 3:4 Fixed */}
                                        <div className="relative aspect-[3/4] w-full bg-white overflow-hidden mb-4 border border-transparent group-hover:border-gray-100 transition-all duration-300 flex items-center justify-center">
                                            {isNew && (
                                                <span className="absolute top-3 left-3 z-20 bg-[#d41132] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                                                    New
                                                </span>
                                            )}
                                            {product.image?.sourceUrl ? (
                                                <Image
                                                    src={product.image.sourceUrl}
                                                    alt={product.image.altText || product.name}
                                                    fill
                                                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#999] bg-[#F9F9F9] text-xs uppercase tracking-widest">
                                                    No Image
                                                </div>
                                            )}

                                            {/* Quick View Overlay - Desktop */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20 hidden md:block px-4 pb-4">
                                                <div className="w-full bg-black text-white font-bold uppercase text-xs py-3 tracking-[0.2em] hover:bg-[#d41132] transition-colors text-center shadow-lg">
                                                    View
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Info - Tactical Typography */}
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

                        <div className="mt-10 text-center md:hidden">
                            <Link
                                href={viewAllLink}
                                className="inline-block bg-black text-white text-sm font-bold uppercase tracking-[0.15em] px-8 py-4"
                            >
                                View All →
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
