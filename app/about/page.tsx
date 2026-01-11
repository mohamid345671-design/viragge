export default function AboutPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    About Strectify
                </h1>

                <div className="prose max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p className="text-xl md:text-2xl font-medium text-black leading-normal">
                        STRECTIFY is more than a brand. It's a movement. Born in the streets of Morocco in 2024, set to redefine the global streetwear landscape.
                    </p>

                    <div className="aspect-video w-full bg-gray-100 rounded-2xl overflow-hidden relative mb-8">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 font-bold uppercase tracking-widest">
                            [Brand Image]
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-black uppercase tracking-wide">The Mission</h2>
                    <p>
                        We create premium tactical luxury wear for the modern rebel. Our designs merge the functionality of technical gear with the aesthetics of high-end fashion. We don't just sell clothes; we provide an armor for the daily grind.
                    </p>

                    <h2 className="text-2xl font-black text-black uppercase tracking-wide">The Quality</h2>
                    <p>
                        Every piece is crafted from handpicked heavyweight fabrics, designed to last. We obsess over the details—from the GSM of our cotton to the quality of our zippers. If it's not perfect, we don't drop it.
                    </p>
                </div>
            </div>
        </main>
    );
}
