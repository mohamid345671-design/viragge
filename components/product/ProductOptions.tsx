'use client';

import { useState } from 'react';

interface ProductOptionsProps {
    sizes: string[] | string;
    onSizeSelect: (size: string) => void;
    selectedSize: string;
}

export default function ProductOptions({ sizes, onSizeSelect, selectedSize }: ProductOptionsProps) {
    const [quantity, setQuantity] = useState(1);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showValidationError, setShowValidationError] = useState(false);

    // Normalize sizes to array
    const sizeArray = Array.isArray(sizes) ? sizes : (sizes ? [sizes] : []);

    const handleSizeClick = (size: string) => {
        onSizeSelect(size);
        setShowValidationError(false);
    };

    const triggerValidation = () => {
        if (!selectedSize) {
            setShowValidationError(true);
            setTimeout(() => setShowValidationError(false), 1000);
        }
    };

    return (
        <>
            <div className="space-y-8">
                {/* Size Selector */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm uppercase tracking-widest font-bold text-[#0f0f0f]">
                        <span>Select Size</span>
                        <button
                            onClick={() => setShowSizeGuide(true)}
                            className="text-[#6b7280] hover:text-[#0f0f0f] transition-colors underline decoration-1 underline-offset-4 font-normal"
                        >
                            Size Guide
                        </button>
                    </div>
                    <div className={`grid grid-cols-3 md:grid-cols-6 gap-2 ${showValidationError ? 'animate-shake' : ''}`}>
                        {sizeArray.map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeClick(size)}
                                className={`relative py-3 px-4 text-sm font-bold uppercase transition-all rounded-lg ${selectedSize === size
                                    ? 'bg-[#0f0f0f] text-white border border-[#0f0f0f] shadow-lg scale-105'
                                    : showValidationError
                                        ? 'bg-white text-[#6b7280] border-2 border-[#d41132] hover:border-[#d41132]'
                                        : 'bg-white text-[#6b7280] border border-[#e5e7eb] hover:border-[#0f0f0f] hover:text-[#0f0f0f] hover:shadow-md'
                                    }`}
                            >
                                {size}
                                {selectedSize === size && (
                                    <svg
                                        className="absolute top-1 right-1 w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                    <span className="text-sm uppercase tracking-widest font-bold text-[#0f0f0f]">Quantity</span>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 border border-[#e5e7eb] rounded-lg flex items-center justify-center hover:bg-[#0f0f0f] hover:text-white hover:border-[#0f0f0f] transition-all text-lg font-medium shadow-sm hover:shadow-md"
                        >−</button>
                        <span className="text-xl font-bold w-8 text-center text-[#0f0f0f]">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 border border-[#e5e7eb] rounded-lg flex items-center justify-center hover:bg-[#0f0f0f] hover:text-white hover:border-[#0f0f0f] transition-all text-lg font-medium shadow-sm hover:shadow-md"
                        >+</button>
                    </div>
                </div>
            </div>

            {/* Size Guide Modal */}
            {showSizeGuide && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black uppercase">Size Guide</h2>
                            <button
                                onClick={() => setShowSizeGuide(false)}
                                className="text-gray-400 hover:text-black text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 text-left font-bold uppercase">Size</th>
                                        <th className="py-3 px-4 text-left font-bold uppercase">Chest (cm)</th>
                                        <th className="py-3 px-4 text-left font-bold uppercase">Waist (cm)</th>
                                        <th className="py-3 px-4 text-left font-bold uppercase">Length (cm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-bold">S</td>
                                        <td className="py-3 px-4">88-92</td>
                                        <td className="py-3 px-4">72-76</td>
                                        <td className="py-3 px-4">68</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-bold">M</td>
                                        <td className="py-3 px-4">96-100</td>
                                        <td className="py-3 px-4">80-84</td>
                                        <td className="py-3 px-4">70</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-bold">L</td>
                                        <td className="py-3 px-4">104-108</td>
                                        <td className="py-3 px-4">88-92</td>
                                        <td className="py-3 px-4">72</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-bold">XL</td>
                                        <td className="py-3 px-4">112-116</td>
                                        <td className="py-3 px-4">96-100</td>
                                        <td className="py-3 px-4">74</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 font-bold">XXL</td>
                                        <td className="py-3 px-4">120-124</td>
                                        <td className="py-3 px-4">104-108</td>
                                        <td className="py-3 px-4">76</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-sm text-gray-600 mt-6">
                            📏 <strong>How to measure:</strong> Measure yourself wearing light clothing. Keep the tape measure snug but not tight.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
