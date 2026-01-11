'use client';

import { useState } from 'react';

interface ProductDetailsProps {
    description?: string;
}

export default function ProductDetails({ description }: ProductDetailsProps) {
    const [openSection, setOpenSection] = useState<string | null>('details');

    const toggle = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const sections = [
        {
            id: 'details',
            title: 'Product Details',
            content: (
                <ul className="list-disc pl-5 space-y-2 text-sm text-[#6b7280] leading-relaxed">
                    <li>100% High-Density Nylon</li>
                    <li>Modular MOLLE System</li>
                    <li>YKK Zippers throughout</li>
                    <li>Adjustable side straps for custom fit</li>
                    <li>Internal mesh pockets</li>
                </ul>
            )
        },
        {
            id: 'size',
            title: 'Size & Fit',
            content: (
                <p className="text-sm text-[#6b7280] leading-relaxed">
                    Model is 6'1" and wears size L. Fits true to size. Designed for a slightly oversized, structural look.
                </p>
            )
        },
        {
            id: 'shipping',
            title: 'Shipping & Returns',
            content: (
                <p className="text-sm text-[#6b7280] leading-relaxed">
                    Free worldwide shipping on all orders. Returns accepted within 30 days of delivery.
                    Item must be unworn and in original packaging.
                </p>
            )
        }
    ];

    return (
        <div className="border-t border-[#e5e7eb] mt-12">
            {sections.map((section) => (
                <div key={section.id} className="border-b border-[#e5e7eb]">
                    <button
                        onClick={() => toggle(section.id)}
                        className="w-full py-6 flex justify-between items-center text-left group"
                    >
                        <span className="font-bold uppercase tracking-widest text-sm text-[#0f0f0f] group-hover:text-[#d41132] transition-colors">
                            {section.title}
                        </span>
                        <span className="text-2xl font-light text-[#6b7280] transition-transform duration-300" style={{ transform: openSection === section.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                            +
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === section.id ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {section.content}
                    </div>
                </div>
            ))}
        </div>
    );
}
