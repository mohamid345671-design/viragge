interface CategoryHeroProps {
    categoryName: string;
}

export default function CategoryHero({ categoryName }: CategoryHeroProps) {
    return (
        <div className="w-full h-[250px] md:h-[300px] bg-[#111111] flex items-center justify-center mb-10 shadow-sm">
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">
                {categoryName}
            </h1>
        </div>
    );
}
