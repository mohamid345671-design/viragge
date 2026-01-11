'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
    } | null;
}

export default function EssentialsGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data: any = await graphqlClient.request(GET_PRODUCTS, { first: 50 });
                let allProducts = data.products.nodes;

                // Filter for ONLY core categories: Hoodies, Sweatpants, Sets
                const coreCategories = ['hoodies', 'sweatpants', 'sets'];
                const filteredProducts = allProducts.filter((product: Product) =>
                    product.productCategories.nodes.some(cat =>
                        coreCategories.includes(cat.name.toLowerCase())
                    )
                );

                // Limit to 8 products total (4x2 grid)
                setProducts(filteredProducts.slice(0, 8));
            } catch (error) {
                console.error('Error fetching products', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const SkeletonCard = () => (
        <div className="animate-pulse">
            <div className="aspect-[3/4] bg-gray-200 mb-3"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 w-3/4"></div>
                <div className="h-3 bg-gray-200 w-1/2"></div>
            </div>
        </div>
    );

    return (
        <section className="bg-white text-black py-24 md:py-32 border-b border-gray-100">
            <div className="container mx-auto px-6">

                {/* SECTION HEADER */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
                        Essentials
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-light tracking-wide uppercase">
                        Hoodies, Sweatpants & Sets
                    </p>
                </div>

                {loading ? (
                    // LOADING STATE
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* MOBILE: 2 COLS | DESKTOP: 4 COLS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
                            {products.map((product) => {
                                const customPrice = product.productFields?.price;
                                const wooPrice = product.price ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : 0;
                                const displayPrice = customPrice ?? wooPrice;

                                return (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        className="group border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative aspect-[3/4] w-full bg-white overflow-hidden mb-4">
                                            {product.image?.sourceUrl && (
                                                <Image
                                                    src={product.image.sourceUrl}
                                                    alt={product.image.altText || product.name}
                                                    fill
                                                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}
                                        </div>

                                        {/* INFO */}
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-gray-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="font-black text-base md:text-lg">
                                                ${displayPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA BUTTON */}
                        <div className="text-center">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                <span>View All</span>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}
