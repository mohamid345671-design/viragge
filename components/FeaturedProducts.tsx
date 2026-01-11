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
        hoverImage?: {
            node: {
                sourceUrl: string;
                altText: string;
            } | null;
        } | null;
        productGallery?: {
            node: {
                sourceUrl: string;
            } | null;
        } | null;
    } | null;
}

interface ProductRow {
    title: string;
    products: Product[];
}

export default function FeaturedProducts() {
    const [rows, setRows] = useState<ProductRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data: any = await graphqlClient.request(GET_PRODUCTS, { first: 50 });
                let allProducts = data.products.nodes;

                // Filter products by category
                const hoodies = allProducts.filter((p: Product) =>
                    p.productCategories.nodes.some(cat => cat.name.toLowerCase() === 'hoodies')
                ).slice(0, 2);

                const jackets = allProducts.filter((p: Product) =>
                    p.productCategories.nodes.some(cat => cat.name.toLowerCase() === 'jackets')
                ).slice(0, 2);

                const tshirts = allProducts.filter((p: Product) =>
                    p.productCategories.nodes.some(cat => cat.name.toLowerCase().includes('shirt') || cat.name.toLowerCase().includes('tee'))
                ).slice(0, 4);

                const sweatpants = allProducts.filter((p: Product) =>
                    p.productCategories.nodes.some(cat => cat.name.toLowerCase() === 'sweatpants')
                ).slice(0, 2);

                const denim = allProducts.filter((p: Product) =>
                    p.productCategories.nodes.some(cat => cat.name.toLowerCase().includes('denim') || cat.name.toLowerCase().includes('jean'))
                ).slice(0, 2);

                // Create rows
                const productRows: ProductRow[] = [
                    { title: 'Latest Hoodies & Jackets', products: [...hoodies, ...jackets] },
                    { title: 'Essential Tees', products: tshirts },
                    { title: 'Bottoms Collection', products: [...sweatpants, ...denim] }
                ];

                setRows(productRows.filter(row => row.products.length > 0));
            } catch (error) {
                console.error('Error fetching products', error);
                setRows([]);
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
                        Featured Products
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-light tracking-wide uppercase">
                        Handpicked essentials from our latest collection
                    </p>
                </div>

                {loading ? (
                    // LOADING STATE
                    <div className="space-y-16">
                        {[1, 2, 3].map((row) => (
                            <div key={row}>
                                <div className="h-6 bg-gray-200 w-48 mb-6 mx-auto"></div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                                    {[...Array(4)].map((_, i) => (
                                        <SkeletonCard key={i} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* UNIFIED GRID - All Products Together */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                            {rows.flatMap(row => row.products).map((product) => {
                                const customPrice = product.productFields?.price;
                                const wooPrice = product.price ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : 0;
                                const displayPrice = customPrice ?? wooPrice;

                                // Image logic
                                const gallery1 = product.productFields?.productGallery?.node?.sourceUrl;
                                const hoverImageUrl = product.productFields?.hoverImage?.node?.sourceUrl;
                                const featuredImageUrl = product.image?.sourceUrl;
                                const mainImage = featuredImageUrl || gallery1 || hoverImageUrl || '/placeholder.svg';
                                const hoverImage = hoverImageUrl || gallery1 || mainImage;

                                return (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        className="group border border-gray-200 p-4 hover:border-gray-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative aspect-[3/4] w-full bg-white overflow-hidden mb-4">
                                            {/* Main Image */}
                                            <Image
                                                src={mainImage}
                                                alt={product.name}
                                                fill
                                                className={`object-contain transition-opacity duration-500 ${hoverImageUrl ? 'group-hover:opacity-0' : ''}`}
                                            />

                                            {/* Hover Image */}
                                            {hoverImageUrl && (
                                                <Image
                                                    src={hoverImage}
                                                    alt={product.name + ' Hover'}
                                                    fill
                                                    className="object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                />
                                            )}
                                        </div>

                                        {/* INFO */}
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-gray-600 transition-colors line-clamp-2">
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
                    </>
                )}

                {/* CTA BUTTON */}
                {!loading && rows.length > 0 && (
                    <div className="text-center mt-16">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            <span>View All Products</span>
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
                )}

            </div>
        </section>
    );
}
