'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { graphqlClient, GET_PRODUCTS } from '@/lib/graphql';

interface Product {
    id: string;
    slug: string;
    name: string;
    image: {
        sourceUrl: string;
        altText: string;
    } | null;
    price: string;
    productFields: {
        price: number | null;
        hoverImage?: {
            node: {
                sourceUrl: string;
            } | null;
        } | null;
    } | null;
}

export default function ThankYouPage() {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRelatedProducts() {
            try {
                const data: any = await graphqlClient.request(GET_PRODUCTS, { first: 4 });
                setRelatedProducts(data.products.nodes.slice(0, 4));
            } catch (error) {
                console.error('Error fetching related products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchRelatedProducts();
    }, []);

    return (
        <main className="min-h-screen bg-white pt-24 md:pt-28 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Success Section */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                    {/* Animated Success Icon */}
                    <div className="relative w-28 h-28 mx-auto mb-8">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                        <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 text-black">
                        Order Confirmed!
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
                        Thank you for shopping with <span className="font-bold text-black">VIRAGGE</span>. Your order has been received and we'll contact you shortly via <strong className="text-black">WhatsApp or Phone</strong> to confirm delivery details.
                    </p>

                    {/* Order Details Card */}
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-4 md:flex-col md:items-center">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-left md:text-center">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Payment Method</p>
                                    <p className="font-bold text-black">Cash on Delivery</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:flex-col md:items-center">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                </div>
                                <div className="text-left md:text-center">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Delivery Time</p>
                                    <p className="font-bold text-black">24 - 48 Hours</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:flex-col md:items-center">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <div className="text-left md:text-center">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">We'll Contact You</p>
                                    <p className="font-bold text-black">Via WhatsApp</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 bg-black text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Continue Shopping
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold uppercase tracking-wider px-8 py-4 rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="border-t border-gray-200 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 text-black">
                            You Might Also Like
                        </h2>
                        <p className="text-gray-600">Complete your streetwear collection</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((product) => {
                                const mainImage = product.image?.sourceUrl || '/placeholder.svg';
                                const hoverImage = product.productFields?.hoverImage?.node?.sourceUrl || mainImage;
                                const customPrice = product.productFields?.price;
                                const wooPrice = product.price ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : 0;
                                const displayPrice = customPrice ?? wooPrice;

                                return (
                                    <Link key={product.id} href={`/product/${product.slug}`} className="group">
                                        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-black transition-all hover:shadow-xl">
                                            <div className="relative aspect-[3/4] bg-white overflow-hidden">
                                                <Image
                                                    src={mainImage}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-4 transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                />
                                                {hoverImage !== mainImage && (
                                                    <Image
                                                        src={hoverImage}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain p-4 absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 50vw, 25vw"
                                                    />
                                                )}
                                            </div>
                                            <div className="p-3 md:p-4">
                                                <h3 className="font-bold text-xs md:text-sm uppercase tracking-tight text-black group-hover:text-gray-600 transition-colors line-clamp-1 mb-1">
                                                    {product.name}
                                                </h3>
                                                <p className="font-black text-sm md:text-base">{Math.round(displayPrice)} DH</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
