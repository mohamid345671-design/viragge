'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        dragFree: false,
        skipSnaps: false,
        duration: 20, // Faster animation
        containScroll: 'trimSnaps'
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedImage(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Listen to embla scroll events
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect(); // Set initial state
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="flex flex-col md:flex-row-reverse gap-3">
            {/* DESKTOP: Main Image +Thumbnails */}
            <div className="hidden md:flex md:flex-row-reverse md:gap-3 md:flex-1">
                {/* Main Image */}
                <div className="relative aspect-[3/4] w-full flex-1 bg-white overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center rounded-xl group">
                    <Image
                        src={images[selectedImage]}
                        alt="Product Image"
                        fill
                        className="object-contain p-4 md:p-6 transition-all duration-700 group-hover:scale-110"
                        priority
                    />

                    {/* Navigation Arrows - Desktop */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white flex items-center justify-center transition-all z-10 rounded-full shadow-lg hover:shadow-xl hover:scale-110"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white flex items-center justify-center transition-all z-10 rounded-full shadow-lg hover:shadow-xl hover:scale-110"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        {selectedImage + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnails - Vertical column on left */}
                {images.length > 1 && (
                    <div className="flex flex-col gap-2.5 w-24">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative aspect-square w-full bg-white overflow-hidden transition-all duration-300 border-2 rounded-lg hover:scale-105 ${selectedImage === idx
                                    ? 'border-black ring-2 ring-black ring-offset-2 shadow-lg'
                                    : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100 shadow-sm hover:shadow-md'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    loading="lazy"
                                    className="object-contain p-2"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* MOBILE: Swipe Carousel */}
            <div className="md:hidden">
                <div className="overflow-hidden rounded-xl shadow-lg" ref={emblaRef} style={{ willChange: 'transform' }}>
                    <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                        {images.map((img, idx) => (
                            <div key={idx} className="flex-[0_0_100%] min-w-0">
                                <div className="relative aspect-[3/4] bg-white border border-gray-200 mx-1">
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
                    <div className="flex justify-center items-center gap-2 mt-5">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSelectedImage(idx);
                                    emblaApi?.scrollTo(idx);
                                }}
                                className={`h-2 rounded-full transition-all duration-500 ease-out ${selectedImage === idx
                                    ? 'w-8 bg-black scale-110 shadow-md'
                                    : 'w-2 bg-gray-300 hover:bg-gray-500 hover:scale-125 opacity-70 hover:opacity-100'
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
