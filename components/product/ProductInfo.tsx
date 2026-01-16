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
        <div className="space-y-5 md:space-y-6 font-display">
            {isNew && (
                <div className="flex items-center space-x-2 text-[#d41132] font-bold text-xs uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#d41132] animate-pulse"></span>
                    <span>Latest Drop</span>
                </div>
            )}

            {/* Product Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-[#0f0f0f]">
                {name}
            </h1>

            {/* Star Rating with Review Count */}
            <div className="flex items-center gap-2">
                {/* 5 Stars */}
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-[#FFD700]" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    ))}
                </div>
                {/* Numeric Rating + Review Count */}
                <span className="text-sm font-bold text-[#0f0f0f]">4.9</span>
                <span className="text-sm text-gray-500">(127 reviews)</span>
            </div>

            {/* Price - Most Prominent */}
            <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black text-[#0f0f0f]">{Math.round(price || 0)}</span>
                <span className="text-2xl font-bold text-gray-600">DH</span>
            </div>

            {/* Category - Secondary Metadata */}
            {category && (
                <p className="text-sm text-gray-600">
                    Category: <span className="font-semibold text-gray-800">{category}</span>
                </p>
            )}

            {/* COD Trust Section */}
            <div className="pt-6 pb-6 border-t border-b border-gray-200 space-y-4">
                {/* Updated COD Message */}
                <p className="text-sm font-bold text-[#0f0f0f] flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Pay on Delivery (No online payment)
                </p>

                {/* 3 Trust Icons */}
                <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <span className="text-gray-700"><TruckIcon /></span>
                        <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <span className="text-gray-700"><CashIcon /></span>
                        <span>Cash on Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <span className="text-gray-700"><ReturnIcon /></span>
                        <span>30-Day Returns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
