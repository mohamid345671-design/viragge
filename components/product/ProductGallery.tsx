'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedImage(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Listen to embla scroll events
    useState(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    });

    return (
        <div className="flex flex-col md:flex-row-reverse gap-3">
            {/* DESKTOP: Main Image + Thumbnails */}
            <div className="hidden md:flex md:flex-row-reverse md:gap-3 md:flex-1">
                {/* Main Image */}
                <div className="relative aspect-[3/4] w-full flex-1 bg-white overflow-hidden shadow-sm border border-[#e5e7eb] flex items-center justify-center rounded-lg">
                    <Image
                        src={images[selectedImage]}
                        alt="Product Image"
                        fill
                        className="object-contain p-4 md:p-6 transition-all duration-500 hover:scale-105"
                        priority
                    />

                    {/* Navigation Arrows - Desktop */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-all z-10 rounded-lg shadow-md"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-all z-10 rounded-lg shadow-md"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnails - Vertical column on left */}
                {images.length > 1 && (
                    <div className="flex flex-col gap-2 w-20">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative aspect-square w-full bg-white overflow-hidden transition-all duration-300 border rounded-lg ${selectedImage === idx
                                    ? 'border-[#0f0f0f] ring-2 ring-[#0f0f0f]'
                                    : 'border-[#e5e7eb] hover:border-[#6b7280] opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    loading="lazy"
                                    className="object-contain p-1"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* MOBILE: Swipe Carousel */}
            <div className="md:hidden">
                <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                    <div className="flex touch-pan-y">
                        {images.map((img, idx) => (
                            <div key={idx} className="flex-[0_0_100%] min-w-0">
                                <div className="relative aspect-[3/4] bg-white border border-[#e5e7eb] mx-1">
                                    <Image
                                        src={img}
                                        alt={`Product image ${idx + 1}`}
                                        fill
                                        className="object-contain p-4"
                                        priority={idx === 0}
                                        loading={idx === 0 ? undefined : 'lazy'}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                {images.length > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSelectedImage(idx);
                                    emblaApi?.scrollTo(idx);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${selectedImage === idx
                                    ? 'w-8 bg-[#0f0f0f]'
                                    : 'w-2 bg-[#d1d5db] hover:bg-[#6b7280]'
                                    }`}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
