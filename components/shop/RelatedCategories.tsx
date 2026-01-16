import Link from 'next/link';
import Image from 'next/image';

interface RelatedCategoriesProps {
    categories: any[];
    currentCategory: string;
}

export default function RelatedCategories({ categories, currentCategory }: RelatedCategoriesProps) {
    // Filter out current category and 'All'
    const otherCategories = categories
        .filter(cat =>
            cat.name !== 'All' &&
            cat.name !== currentCategory &&
            cat.slug !== 'underwear'
        )
        .slice(0, 3); // Show max 3

    return (
        <section className="py-20 border-t border-[#E8E8E8] mt-20">
            <div className="container mx-auto px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                        Explore More
                    </h2>
                    <p className="text-[#888] text-sm uppercase tracking-widest">
                        Discover other collections
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {otherCategories.map((category) => {
                        // Logic: ACF Banner -> Description URL -> Fallback
                        const displayImage = category.categoryFields?.archiveGridImage || category.description || category.image?.sourceUrl || '/placeholder.svg';

                        return (
                            <Link
                                key={category.id}
                                href={`/shop?category=${category.name}`}
                                className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10 rounded-none transform transition-transform duration-300 hover:z-10"
                            >
                                {/* Background Image */}
                                <Image
                                    src={displayImage}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />

                                {/* Overlay Gradient - Stronger at bottom for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Content - Bottom Left anchored (Just like Archive) */}
                                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3
                                        className="text-[22px] md:text-3xl font-extrabold uppercase tracking-tighter text-white mb-1"
                                        style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.9)' }}
                                    >
                                        {category.name}
                                    </h3>
                                    <span className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-[0.2em] border-b-2 border-transparent group-hover:border-white transition-all duration-300">
                                        Shop Collection
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
