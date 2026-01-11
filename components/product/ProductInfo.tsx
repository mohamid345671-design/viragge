'use client';

interface ProductInfoProps {
    name: string;
    price: number | null;
    category?: string;
    isNew: boolean;
}

// SVG Icons
const TruckIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
);

const CashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
);

const ReturnIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
    </svg>
);

export default function ProductInfo({ name, price, category, isNew }: ProductInfoProps) {
    return (
        <div className="space-y-4 md:space-y-6 font-display">
            {isNew && (
                <div className="flex items-center space-x-2 text-[#d41132] font-bold text-xs uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#d41132] animate-pulse"></span>
                    <span>Latest Drop</span>
                </div>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-[#0f0f0f]">
                {name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-[#FFD700]" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    ))}
                </div>
                <span className="text-xs text-[#6b7280] font-medium">(4.9)</span>
            </div>

            <div className="flex items-baseline space-x-3">
                <span className="text-3xl md:text-4xl font-black text-[#0f0f0f]">{Math.round(price || 0)} DH</span>
            </div>

            {category && (
                <p className="text-[#6b7280] text-xs uppercase tracking-wider font-medium">
                    {category}
                </p>
            )}

            {/* COD Trust Section */}
            <div className="pt-6 pb-6 border-t border-b border-[#e5e7eb] space-y-4">
                <p className="text-sm font-semibold text-[#0f0f0f] leading-relaxed">
                    Cash on Delivery – Pay when you receive your order
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                    <div className="flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        <span className="text-[#0f0f0f]"><TruckIcon /></span>
                        <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        <span className="text-[#0f0f0f]"><CashIcon /></span>
                        <span>Cash on Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        <span className="text-[#0f0f0f]"><ReturnIcon /></span>
                        <span>30-Day Returns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
