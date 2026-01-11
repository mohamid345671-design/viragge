import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center px-6">
                <h1 className="text-[150px] md:text-[200px] font-black leading-none text-[#1a1a1a] select-none">
                    404
                </h1>
                <div className="relative -mt-20 md:-mt-32 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
                        Lost in the Void?
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
                        The page you are looking for has been moved, deleted, or possibly never existed.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block bg-white text-black font-bold uppercase tracking-[0.2em] px-10 py-4 hover:bg-gray-200 transition-all"
                    >
                        Back to Shop
                    </Link>
                </div>
            </div>
        </main>
    );
}
