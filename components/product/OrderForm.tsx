'use client';

import { useState } from 'react';
import { graphqlClient, CREATE_ORDER } from '@/lib/graphql';

interface OrderFormProps {
    disabled: boolean;
    productName: string;
    productId: number;
    productPrice: number;
    selectedSize: string;
    selectedColor: string;
}

export default function OrderForm({ disabled, productName, productId, productPrice, selectedSize, selectedColor }: OrderFormProps) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        phone: ''
    });

    // Floating label focus states
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Major Moroccan cities - reordered with most common first
    const cities = [
        'Casablanca',
        'Rabat',
        'Marrakech',
        'Tangier',
        'Fes',
        'Agadir',
        'Meknes',
        'Oujda',
        'Kenitra',
        'Tetouan',
        'Safi',
        'El Jadida',
        'Nador',
        'Khouribga',
        'Beni Mellal',
        'Taza'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            // Validation
            if (!formData.fullName || !formData.address || !formData.city || !formData.phone) {
                throw new Error('Please fill in all fields');
            }

            // Split full name for backend (firstName = first word, lastName = rest)
            const nameParts = formData.fullName.trim().split(' ');
            const firstName = nameParts[0] || 'Customer';
            const lastName = nameParts.slice(1).join(' ') || 'Customer';

            // Auto-generate email from phone number
            const cleanPhone = formData.phone.replace(/\s+/g, '');
            const generatedEmail = `${cleanPhone}@store-guest.com`;

            // Prepare checkout input with explicit price and metadata
            const input = {
                clientMutationId: `order_${productId}_${Date.now()}`,
                paymentMethod: 'cod',
                isPaid: false,
                billing: {
                    firstName: firstName,
                    lastName: lastName,
                    address1: formData.address,
                    city: formData.city,
                    phone: formData.phone,
                    email: generatedEmail
                },
                lineItems: [
                    {
                        productId: productId,
                        quantity: 1,
                        subtotal: productPrice.toString(),
                        total: productPrice.toString()
                    }
                ],
                metaData: [
                    {
                        key: 'selected_size',
                        value: selectedSize
                    },
                    {
                        key: 'selected_color',
                        value: selectedColor
                    }
                ]
            };

            // Execute createOrder mutation
            const response: any = await graphqlClient.request(CREATE_ORDER, { input });

            // Check for orderId or order.databaseId
            const orderId = response.createOrder?.orderId || response.createOrder?.order?.databaseId;

            if (orderId) {
                // Redirect to Thank You page
                window.location.href = '/thank-you';
            } else {
                throw new Error('Order creation failed. No Order ID returned.');
            }
        } catch (error: any) {
            console.error('Order submission error:', error);
            setErrorMessage(error.message || 'Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isSuccess) {
        return (
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-8 text-center animate-fadeIn shadow-lg">
                <div className="text-6xl mb-4 animate-bounce">✓</div>
                <h3 className="text-2xl font-black text-green-900 mb-3">Order Placed Successfully!</h3>
                <p className="text-green-700 mb-4 leading-relaxed">
                    Thank you for your order. We will call you soon to confirm delivery details.
                </p>
                <p className="text-sm text-green-600 font-semibold">
                    💵 Payment: Cash on Delivery
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-6">
                Delivery Information
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="relative">
                    <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all"
                    />
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'fullName' || formData.fullName
                        ? '-top-2.5 text-xs font-bold bg-white px-1 text-[#0f0f0f]'
                        : 'top-3.5 text-sm text-[#6b7280]'
                        }`}>
                        Name
                    </label>
                </div>

                {/* Phone Number */}
                <div className="relative">
                    <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all"
                    />
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'phone' || formData.phone
                        ? '-top-2.5 text-xs font-bold bg-white px-1 text-[#0f0f0f]'
                        : 'top-3.5 text-sm text-[#6b7280]'
                        }`}>
                        Phone
                    </label>
                    <p className="text-xs text-gray-500 mt-1.5">
                        📞 We will call you to confirm your order
                    </p>
                </div>

                {/* City */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#6b7280] mb-2">
                        City *
                    </label>
                    <select
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all"
                    >
                        <option value="">Select your city</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Address - Multiline */}
                <div className="relative">
                    <textarea
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        rows={3}
                        className="peer w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all resize-none"
                    />
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'address' || formData.address
                        ? '-top-2.5 text-xs font-bold bg-white px-1 text-[#0f0f0f]'
                        : 'top-3.5 text-sm text-[#6b7280]'
                        }`}>
                        Address
                    </label>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-shake">
                        <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={disabled || isLoading}
                    className={`w-full py-5 transition-all duration-300 rounded-xl relative overflow-hidden ${disabled || isLoading
                        ? 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
                        : 'bg-[#0f0f0f] text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="text-sm font-bold uppercase tracking-wider">Processing...</span>
                        </span>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-black uppercase tracking-wider">Confirm Order</span>
                            <span className="text-xs font-medium opacity-80">Cash on Delivery</span>
                        </div>
                    )}
                </button>

                {/* Trust Micro-copy */}
                <div className="space-y-2 pt-2">
                    <p className="text-xs text-center text-gray-600 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        No online payment required
                    </p>
                    <p className="text-xs text-center text-gray-600 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Pay only when you receive the product
                    </p>
                </div>
            </form>
        </div>
    );
}
