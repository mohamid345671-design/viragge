'use client';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="mb-4">
            {/* Swipeable Container - Mobile Friendly */}
            <div className="overflow-x-auto hide-scrollbar -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
                <div className="inline-flex gap-3 min-w-max">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-full ${activeCategory === category
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-white text-[#666] hover:bg-[#F0F0F0] hover:text-black border border-[#E0E0E0]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
