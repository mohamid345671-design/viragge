'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LookbookImage {
    src: string;
    alt: string;
    title?: string;
    height: 'tall' | 'medium' | 'short';
}

export default function Lookbook() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const images: LookbookImage[] = [
        {
            src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop',
            alt: 'Urban sneakers',
            height: 'tall'
        },
        {
            src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
            alt: 'Street fashion',
            title: 'Winter Vanguard',
            height: 'medium'
        },
        {
            src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
            alt: 'Urban style',
            height: 'short'
        },
        {
            src: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop',
            alt: 'Street look',
            height: 'tall'
        },
        {
            src: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1980&auto=format&fit=crop',
            alt: 'Casual wear',
            height: 'medium'
        },
        {
            src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
            alt: 'Streetwear outfit',
            height: 'short'
        },
    ];

    const openLightbox = (index: number) => {
        setCurrentImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const getHeightClass = (height: string) => {
        switch (height) {
            case 'tall': return 'row-span-2';
            case 'medium': return 'row-span-1';
            case 'short': return 'row-span-1';
            default: return 'row-span-1';
        }
    };

    return (
        <>
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-12 text-center">
                        Lookbook
                    </h2>

                    {/* Masonry Grid */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-xl"
                                onClick={() => openLightbox(index)}
                            >
                                <div className={`relative w-full ${image.height === 'tall' ? 'aspect-[3/4]' :
                                        image.height === 'medium' ? 'aspect-square' :
                                            'aspect-[4/3]'
                                    }`}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                                    {/* Zoom Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Title Overlay */}
                                    {image.title && (
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg">
                                                {image.title.split(' ').map((word, i) => (
                                                    <span key={i} className={i === 1 ? 'text-[#d41132]' : ''}>
                                                        {word}{' '}
                                                    </span>
                                                ))}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white/80 hover:text-white z-50"
                        onClick={closeLightbox}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Main Image */}
                    <div
                        className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[currentImage].src}
                            alt={images[currentImage].alt}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-medium">
                        {currentImage + 1} / {images.length}
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                                className={`w-16 h-12 relative rounded overflow-hidden transition-all ${idx === currentImage ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-80'
                                    }`}
                            >
                                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
