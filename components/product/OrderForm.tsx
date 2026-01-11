'use client';

import { useState } from 'react';
import { graphqlClient, CREATE_ORDER } from '@/lib/graphql';

interface OrderFormProps {
    disabled: boolean;
    productName: string;
    productId: number;
}

export default function OrderForm({ disabled, productName, productId }: OrderFormProps) {
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

    // Major Moroccan cities
    const cities = [
        'Casablanca',
        'Rabat',
        'F es',
        'Marrakech',
        'Tangier',
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

            // Prepare checkout input
            const input = {
                clientMutationId: Date.now().toString(),
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
                        quantity: 1
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                {/* Full Name - Floating Label */}
                <div className="relative">
                    <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] placeholder-transparent focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all"
                        placeholder="Full Name"
                    />
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'fullName' || formData.fullName
                        ? '-top-2.5 text-xs font-bold bg-white px-1 text-[#0f0f0f]'
                        : 'top-3.5 text-sm text-[#6b7280]'
                        }`}>
                        Full Name *
                    </label>
                </div>

                {/* Address - Floating Label */}
                <div className="relative">
                    <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] placeholder-transparent focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all"
                        placeholder="Address"
                    />
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'address' || formData.address
                        ? '-top-2.5 text-xs font-bold bg-white px-1 text-[#0f0f0f]'
                        : 'top-3.5 text-sm text-[#6b7280]'
                        }`}>
                        Address *
                    </label>
                </div>

                {/* City & Phone in a row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* City Dropdown */}
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
                            <option value="">Select city</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Phone - Floating Label */}
                    <div className="relative">
                        <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className="peer w-full bg-white border border-[#e5e7eb] rounded-lg py-3.5 px-4 text-[#0f0f0f] placeholder-transparent focus:border-[#0f0f0f] focus:outline-none focus:ring-2 focus:ring-[#0f0f0f]/20 transition-all mt-6"
                            placeholder="Phone"
                        />
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'phone' || formData.phone
                            ? 'top-3.5 text-xs font-bold bg-white px-1 text-[#0f0f0f]'
                            : 'top-9.5 text-sm text-[#6b7280]'
                            }`}>
                            Phone Number *
                        </label>
                    </div>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-shake">
                        <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={disabled || isLoading}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-xl relative overflow-hidden ${disabled || isLoading
                        ? 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
                        : 'bg-[#0f0f0f] text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Processing...</span>
                        </span>
                    ) : (
                        'Confirm Order - Cash on Delivery'
                    )}
                </button>

                <p className="text-xs text-center text-[#6b7280] mt-4">
                    💵 Pay with cash when you receive your order
                </p>
            </form>
        </div>
    );
}
