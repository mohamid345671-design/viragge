'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useEffect, memo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ColorDots from '../ColorDots';

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

    // Parse available colors (could be string or array)
    const availableColors = product.productFields?.availableColors;
    const colorArray = Array.isArray(availableColors)
        ? availableColors
        : typeof availableColors === 'string'
            ? availableColors.split(',').map(c => c.trim()).filter(Boolean)
            : [];

    return (
        <Link href={`/product/${product.slug}`} className="group block h-full">
            <div className="bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">

                {/* DESKTOP: Hover Image Effect */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden hidden md:block">
                    {/* Only show badge if New */}
                    {isNew && (
                        <div className="absolute top-3 left-3 z-20 bg-black text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wide">
                            New
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
                    {/* Only show badge if New */}
                    {isNew && (
                        <div className="absolute top-2 left-2 z-20 bg-black text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wide">
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
                                                    className="object-contain p-1"
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
                                        className={`h-1 rounded-full transition-all duration-300 ${selectedIndex === idx
                                            ? 'w-6 bg-white shadow-lg'
                                            : 'w-1 bg-white/60'
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
                                className="object-contain p-1"
                                priority={priority}
                                sizes="50vw"
                                quality={75}
                            />
                        </div>
                    )}
                </div>

                {/* Content - Stacked Layout */}
                <div className="flex flex-col p-2 md:p-4 space-y-1 md:space-y-2">
                    <h3 className="font-bold text-[11px] md:text-sm uppercase tracking-tight text-black group-hover:text-[#d41132] transition-colors line-clamp-1 leading-tight">
                        {product.name}
                    </h3>
                    <p className="font-black text-base md:text-base">{displayPrice}</p>
                    <ColorDots colors={colorArray} />
                </div>
            </div>
        </Link>
    );
});

export default ProductCard;
