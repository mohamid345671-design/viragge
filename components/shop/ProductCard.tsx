'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useEffect, memo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface ProductCardProps {
    product: any;
    priority?: boolean;
}

const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Get all available images
    const gallery1 = product.productFields?.productGallery?.node?.sourceUrl;
    const gallery2 = product.productFields?.galleryImage2?.node?.sourceUrl;
    const gallery3 = product.productFields?.galleryImage3?.node?.sourceUrl;
    const hoverImageUrl = product.productFields?.hoverImage?.node?.sourceUrl;
    const featuredImageUrl = product.image?.sourceUrl;

    // Build image array
    const images = [
        featuredImageUrl,
        hoverImageUrl,
        gallery1,
        gallery2,
        gallery3
    ].filter(Boolean) as string[];

    const mainImage = images[0] || '/placeholder.svg';
    const hoverImage = images[1] || mainImage;

    // Track carousel scroll
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const customPrice = product.productFields?.price;
    const rawPrice = customPrice ?? parseFloat(product.price?.replace(/[^0-9.]/g, '') || '0');
    const displayPrice = `${Math.round(rawPrice)} DH`;
    const isNew = product.productFields?.isNew ?? false;
    const categoryName = product.productCategories?.nodes?.[0]?.name || 'Uncategorized';

    return (
        <Link href={`/product/${product.slug}`} className="group block h-full">
            <div className="bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">

                {/* DESKTOP: Hover Image Effect */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden hidden md:block">
                    {/* Badge */}
                    {isNew && (
                        <div className="absolute top-3 left-3 z-20 bg-[#d41132] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-md">
                            New Drop
                        </div>
                    )}

                    {/* Main Image */}
                    <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className={`object-contain p-4 transition-all duration-500 ${images.length > 1 ? 'group-hover:opacity-0 group-hover:scale-110' : 'group-hover:scale-105'}`}
                        priority={priority}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        quality={75}
                        loading={priority ? undefined : 'lazy'}
                    />

                    {/* Hover Image */}
                    {images.length > 1 && (
                        <Image
                            src={hoverImage}
                            alt={product.name + ' - View 2'}
                            fill
                            className="object-contain p-4 absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            quality={75}
                            loading="lazy"
                        />
                    )}
                </div>

                {/* MOBILE: Swipe Carousel */}
                <div className="relative md:hidden">
                    {/* Badge */}
                    {isNew && (
                        <div className="absolute top-3 left-3 z-20 bg-[#d41132] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-md">
                            New
                        </div>
                    )}

                    {images.length > 1 ? (
                        <>
                            <div className="overflow-hidden aspect-[3/4]" ref={emblaRef}>
                                <div className="flex touch-pan-y">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="flex-[0_0_100%] min-w-0">
                                            <div className="relative aspect-[3/4] bg-white">
                                                <Image
                                                    src={img}
                                                    alt={`${product.name} - View ${idx + 1}`}
                                                    fill
                                                    className="object-contain p-4"
                                                    priority={priority && idx === 0}
                                                    loading={idx === 0 ? (priority ? undefined : 'lazy') : 'lazy'}
                                                    sizes="50vw"
                                                    quality={75}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center space-x-1.5 z-10">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            emblaApi?.scrollTo(idx);
                                        }}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === idx
                                            ? 'w-6 bg-black'
                                            : 'w-1.5 bg-gray-300'
                                            }`}
                                        aria-label={`Go to image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="relative aspect-[3/4] bg-white">
                            <Image
                                src={mainImage}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                                priority={priority}
                                sizes="50vw"
                                quality={75}
                            />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm uppercase tracking-tight text-black group-hover:text-[#d41132] transition-colors line-clamp-2 flex-1">
                            {product.name}
                        </h3>
                        <p className="font-black text-sm shrink-0">{displayPrice}</p>
                    </div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                        {categoryName}
                    </p>
                </div>
            </div>
        </Link>
    );
});

export default ProductCard;
