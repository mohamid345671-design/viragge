'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductOptions from '@/components/product/ProductOptions';
import OrderForm from '@/components/product/OrderForm';
import ProductDetails from '@/components/product/ProductDetails';
import { graphqlClient, GET_PRODUCT_BY_SLUG } from '@/lib/graphql';

interface Product {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    price: string;
    description: string;
    shortDescription?: string;
    image: {
        sourceUrl: string;
        altText: string;
    } | null;
    galleryImages: {
        nodes: Array<{
            sourceUrl: string;
            altText: string;
        }>;
    };
    productCategories: {
        nodes: Array<{ name: string }>;
    };
    productFields: any;
}

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ProductPage({ params, searchParams }: PageProps) {
    const [slug, setSlug] = useState<string>('');
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('Black'); // Default color
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    // Ref for smooth scrolling to form
    const orderFormRef = useRef<HTMLDivElement>(null);

    // Unwrap params Promise
    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    // Fetch product when slug is available
    useEffect(() => {
        if (!slug) return;

        async function fetchProduct() {
            try {
                console.log('Fetching product with slug:', slug);
                const data: any = await graphqlClient.request(GET_PRODUCT_BY_SLUG, {
                    slug: slug
                });

                console.log('GraphQL Response:', data);

                if (data.product) {
                    console.log('Product found:', data.product.name);
                    setProduct(data.product);
                } else {
                    console.error('No product in response. Full data:', JSON.stringify(data, null, 2));
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                console.error('Slug that failed:', slug);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    const scrollToOrderForm = () => {
        orderFormRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F9F9F9] pt-24 md:pt-28 pb-20">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left: Gallery Skeleton */}
                        <div className="space-y-3">
                            <div className="aspect-square md:aspect-[4/5] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                            <div className="hidden md:grid grid-cols-4 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Info Skeleton */}
                        <div className="space-y-6">
                            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-2/3 animate-pulse"></div>
                            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="mb-8">
                        <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">
                        Product Not Found
                    </h1>
                    <p className="text-gray-600 mb-8 text-sm md:text-base">
                        Sorry, the product you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#d41132] transition-colors duration-300"
                    >
                        Back to Shop
                    </Link>
                </div>
            </main>
        );
    }

    // SAFE GALLERY COMBINING: Filter out null images
    const galleryImages: string[] = [];

    // Try to add gallery image 1
    const gallery1 = product.productFields?.productGallery?.node?.sourceUrl;
    if (gallery1) galleryImages.push(gallery1);

    // Try to add gallery image 2
    const gallery2 = product.productFields?.galleryImage2?.node?.sourceUrl;
    if (gallery2) galleryImages.push(gallery2);

    // Try to add gallery image 3
    const gallery3 = product.productFields?.galleryImage3?.node?.sourceUrl;
    if (gallery3) galleryImages.push(gallery3);

    // Fallback to main image if no gallery images
    if (galleryImages.length === 0 && product.image?.sourceUrl) {
        galleryImages.push(product.image.sourceUrl);
    }

    // SAFE PRICE ACCESS: Priority to productFields.price
    const customPrice = product.productFields?.price;
    const wooPrice = product.price ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : 0;
    const displayPrice = customPrice ?? wooPrice;

    // SAFE BOOLEAN ACCESS
    const isNew = product.productFields?.isNew ?? false;

    // SAFE ARRAY ACCESS
    const availableSizes = product.productFields?.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <main className="min-h-screen bg-white text-[#0f0f0f] pt-24 md:pt-28 pb-32 md:pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Breadcrumb */}
                <nav className="mb-6 md:mb-8">
                    <ol className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <li>
                            <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
                        </li>
                        <li>/</li>
                        <li className="text-black font-semibold truncate max-w-[150px] md:max-w-none">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20">
                    {/* Left Column: Gallery (Sticky on Desktop) */}
                    <div className="relative">
                        <div className="lg:sticky lg:top-32">
                            <ProductGallery images={galleryImages} />
                        </div>
                    </div>

                    {/* Right Column: Info & Form */}
                    <div className="flex flex-col h-full space-y-8">
                        <ProductInfo
                            name={product.name}
                            price={displayPrice}
                            category={product.productCategories.nodes[0]?.name}
                            isNew={isNew}
                        />

                        <div className="pt-8 border-t border-gray-200 space-y-8">
                            <ProductOptions
                                sizes={availableSizes}
                                selectedSize={selectedSize}
                                onSizeSelect={setSelectedSize}
                                selectedColor={selectedColor}
                                onColorSelect={setSelectedColor}
                                availableColors={product.productFields?.availableColors}
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                            />

                            {/* Order Form with ref for scrolling */}
                            <div ref={orderFormRef} className="scroll-mt-24">
                                <OrderForm
                                    disabled={!selectedSize}
                                    productName={product.name}
                                    productId={product.databaseId}
                                    productPrice={displayPrice}
                                    selectedSize={selectedSize}
                                    selectedColor={selectedColor}
                                    quantity={quantity}
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200">
                            <ProductDetails
                                description={product.description}
                                shortDescription={product.shortDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile CTA Button */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl p-4">
                <button
                    onClick={scrollToOrderForm}
                    disabled={!selectedSize}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-lg ${!selectedSize
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {!selectedSize ? 'Select Size First' : 'Buy Now - Cash on Delivery'}
                </button>
            </div>
        </main>
    );
}
