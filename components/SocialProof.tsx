'use client';

import { useState, useEffect, useRef } from 'react';

// ============================================
// INTERFACES & TYPES
// ============================================

export interface Review {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    product: string;
    avatar?: string; // Optional: URL to avatar image
}

export interface TrustStat {
    number: string;
    label: string;
    icon?: React.ReactNode;
}

interface SocialProofProps {
    reviews?: Review[];
    stats?: TrustStat[];
    showCarousel?: boolean; // Optional carousel mode for mobile
}

// ============================================
// STAR RATING COMPONENT
// ============================================

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 transition-colors duration-300 ${i < rating ? 'fill-[#FFD700]' : 'fill-gray-700'
                    }`}
                viewBox="0 0 20 20"
                aria-hidden="true"
            >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

// ============================================
// REVIEW CARD COMPONENT
// ============================================

interface ReviewCardProps {
    review: Review;
    index: number;
    isVisible: boolean;
}

const ReviewCard = ({ review, index, isVisible }: ReviewCardProps) => {
    const initials = review.name
        .split(' ')
        .map(n => n.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <article
            className={`group relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-gray-800 p-6 md:p-8 rounded-lg
                transition-all duration-500 hover:border-[#d41132]/50 hover:shadow-2xl hover:shadow-[#d41132]/10 
                hover:scale-[1.02] hover:-translate-y-1 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#d41132]/0 to-[#d41132]/0 group-hover:from-[#d41132]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

            <div className="relative z-10">
                {/* Rating */}
                <StarRating rating={review.rating} />

                {/* Review Text */}
                <blockquote className="text-gray-300 mt-5 mb-6 text-sm md:text-base leading-relaxed font-light">
                    "{review.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-800">
                    {/* Avatar */}
                    {review.avatar ? (
                        <img
                            src={review.avatar}
                            alt={`${review.name}'s avatar`}
                            className="w-10 h-10 rounded-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-[#d41132] to-[#a00f28] rounded-full flex items-center justify-center font-bold text-sm text-white shadow-lg">
                            {initials}
                        </div>
                    )}

                    <div>
                        <p className="font-bold text-sm text-white">{review.name}</p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {review.location}
                        </p>
                    </div>
                </div>

                {/* Product Badge */}
                <div className="mt-4">
                    <span className="inline-block text-[10px] bg-black/50 text-gray-400 px-3 py-1.5 font-bold uppercase tracking-widest border border-gray-800 rounded transition-colors group-hover:text-[#d41132] group-hover:border-[#d41132]/30">
                        {review.product}
                    </span>
                </div>
            </div>
        </article>
    );
};

// ============================================
// MAIN SOCIAL PROOF COMPONENT
// ============================================

// Default data
const defaultReviews: Review[] = [
    {
        id: 1,
        name: 'Ahmed K.',
        location: 'Casablanca',
        rating: 5,
        text: 'Best quality hoodie I\'ve ever bought. The fabric is so comfortable and the fit is perfect.',
        product: 'Classic Hoodie',
    },
    {
        id: 2,
        name: 'Sara M.',
        location: 'Rabat',
        rating: 5,
        text: 'Fast delivery and amazing quality. The sweatpants are exactly as shown in the pictures.',
        product: 'Urban Sweatpants',
    },
    {
        id: 3,
        name: 'Youssef B.',
        location: 'Marrakech',
        rating: 5,
        text: 'Third time ordering. Never disappointed! The jacket is premium quality.',
        product: 'Bomber Jacket',
    },
    {
        id: 4,
        name: 'Fatima Z.',
        location: 'Tangier',
        rating: 5,
        text: 'Finally found a store with real streetwear quality. Cash on delivery made it easy!',
        product: 'Oversized Hoodie',
    },
];

const defaultStats: TrustStat[] = [
    { number: '1000+', label: 'Happy Customers' },
    { number: '4.9', label: 'Average Rating' },
    { number: '98%', label: 'Satisfaction' },
    { number: '24h', label: 'Fast Shipping' },
];

export default function SocialProof({
    reviews = defaultReviews,
    stats = defaultStats,
    showCarousel = false
}: SocialProofProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // IntersectionObserver for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Disconnect after triggering once
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-20 md:py-28 border-t border-white/10 text-white overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d41132] rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[200px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <header className="text-center mb-16">
                    <span className={`text-xs font-bold uppercase tracking-[0.3em] text-[#d41132] mb-4 block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                        }`}>
                        Trusted by 1000+ Customers
                    </span>
                    <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                        }`}>
                        What They Say
                    </h2>
                </header>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {reviews.map((review, index) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

                {/* Trust Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 pt-16 border-t border-gray-800">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`text-center transition-all duration-700 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${500 + index * 100}ms` }}
                        >
                            <p className="text-4xl md:text-6xl font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </p>
                            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
