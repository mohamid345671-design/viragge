'use client';

import Image from 'next/image';

export default function PromoSection() {
    const promos = [
        { title: 'New Arrival', image: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=1374&auto=format&fit=crop' },
        { title: 'Best Seller', image: 'https://images.unsplash.com/photo-1578681994506-b8f4634502bd?q=80&w=1374&auto=format&fit=crop' },
        { title: 'Limited Edition', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1470&auto=format&fit=crop' },
    ];

    return (
        <section className="bg-black py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase leading-tight tracking-tighter">
                            Your Uptoir Your <br />
                            <span className="text-[var(--primary)]">Animalst Collstenme</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            Feery our yest tly our life as eral halhe salon in dread in final tus fage to liy opting Treacoting your to colects any buy craene.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {promos.map((promo, idx) => (
                        <div key={idx} className="relative group overflow-hidden cursor-pointer h-[400px]">
                            <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm">
                                Exit
                            </div>
                            <div className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>

                            <Image
                                src={promo.image}
                                alt={promo.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>

                            <div className="absolute bottom-6 left-6 z-20">
                                <h3 className="text-xl font-bold uppercase">{promo.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
