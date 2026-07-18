'use client';

import { useState } from 'react';

interface ProductOptionsProps {
    sizes: string[] | string;
    onSizeSelect: (size: string) => void;
    selectedSize: string;
    onColorSelect?: (color: string) => void;
    selectedColor?: string;
    availableColors?: string; // NEW: from ACF
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function ProductOptions({ sizes, onSizeSelect, selectedSize, onColorSelect, selectedColor = 'Black', availableColors, quantity, onQuantityChange }: ProductOptionsProps) {
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showValidationError, setShowValidationError] = useState(false);

    // All available colors with their hex values
    const allColors = {
        'Black': { value: '#000000', border: '#333333' },
        'White': { value: '#FFFFFF', border: '#E5E7EB' },
        'Gray': { value: '#6B7280', border: '#4B5563' },
        'Navy': { value: '#1E3A8A', border: '#1E40AF' },
        'Beige': { value: '#D4A574', border: '#C4956C' },
        'Olive': { value: '#6B7547', border: '#5D6641' },
        'Brown': { value: '#92400E', border: '#78350F' },
        'Khaki': { value: '#A8A58C', border: '#999680' },
    };

    // Parse colors from ACF - handle both array and string formats
    let selectedColorNames: string[];
    if (!availableColors) {
        selectedColorNames = []; // changed to empty array so products without colors show no colors
    } else if (Array.isArray(availableColors)) {
        selectedColorNames = availableColors; // GraphQL returns array directly
    } else {
        selectedColorNames = availableColors.split(',').map(c => c.trim()).filter(Boolean); // String format
    }

    // Filter to only selected colors
    const colors = selectedColorNames
        .filter(name => allColors[name as keyof typeof allColors])
        .map(name => ({
            name,
            ...allColors[name as keyof typeof allColors]
        }));

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
                {/* Color Selector */}
                {colors.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-black">
                                Color: <span className="font-normal text-gray-700">{selectedColor}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => onColorSelect?.(color.name)}
                                    className={`relative group flex items-center justify-center transition-all duration-300 ${selectedColor === color.name
                                        ? 'scale-105'
                                        : 'hover:scale-105'
                                        }`}
                                    title={color.name}
                                    aria-label={`Select ${color.name} color`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-full transition-all duration-300 ${selectedColor === color.name
                                            ? 'ring-[3px] ring-black shadow-lg'
                                            : 'ring-1 ring-gray-300 hover:ring-2 hover:ring-gray-400 shadow-sm'
                                            }`}
                                        style={{
                                            backgroundColor: color.value,
                                        }}
                                    >
                                        {/* Checkmark for selected */}
                                        {selectedColor === color.name && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg
                                                    className="w-6 h-6 text-white drop-shadow-lg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    style={{ filter: color.name === 'White' ? 'invert(1)' : 'none' }}
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Color name below swatch */}
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-gray-600 whitespace-nowrap">
                                        {color.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Size Selector */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-black">Select Size</p>
                        <button
                            onClick={() => setShowSizeGuide(true)}
                            className="text-xs text-gray-600 hover:text-black underline underline-offset-2 transition-colors"
                        >
                            Size Guide
                        </button>
                    </div>

                    <div className={`grid grid-cols-3 gap-3 ${showValidationError ? 'animate-shake' : ''}`}>
                        {sizeArray.map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeClick(size)}
                                className={`relative py-4 px-4 text-sm font-bold uppercase transition-all duration-200 border-2 ${selectedSize === size
                                    ? 'bg-black text-white border-black'
                                    : showValidationError
                                        ? 'bg-white text-gray-700 border-red-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                                    }`}
                                aria-label={`Select size ${size}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Helper text */}
                    <p className="text-xs text-gray-500 mt-2">
                        💡 Fits true to size
                    </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                    <p className="text-sm font-bold text-black">Quantity</p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                            className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-300"
                            aria-label="Decrease quantity"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>

                        <span className="text-lg font-bold w-12 text-center">{quantity}</span>

                        <button
                            onClick={() => onQuantityChange(quantity + 1)}
                            className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                            aria-label="Increase quantity"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
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
