'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { graphqlClient } from '@/lib/graphql';

interface SearchProduct {
    databaseId: number;
    id: string;
    slug: string;
    name: string;
    image: {
        sourceUrl: string;
        altText: string;
    };
    productCategories: {
        nodes: Array<{ name: string }>;
    };
    price?: string;
    productFields?: {
        price?: string;
    };
}

const SEARCH_PRODUCTS = `
  query SearchProducts($search: String!, $first: Int!) {
    products(first: $first, where: { search: $search }) {
      nodes {
        databaseId
        id
        slug
        name
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            name
          }
        }
        ... on SimpleProduct {
          price
          productFields {
            price
          }
        }
      }
    }
  }
`;

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced search function
    useEffect(() => {
        // Clear previous timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Don't search if query is too short
        if (searchQuery.trim().length < 2) {
            setSearchResults([]);
            setShowDropdown(false);
            setHasSearched(false);
            return;
        }

        // Set loading state
        setIsLoading(true);
        setShowDropdown(true);

        // Debounce the search (500ms)
        debounceTimerRef.current = setTimeout(async () => {
            try {
                const data: any = await graphqlClient.request(SEARCH_PRODUCTS, {
                    search: searchQuery.trim(),
                    first: 8,
                });
                setSearchResults(data.products.nodes);
                setHasSearched(true);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setShowDropdown(false);
        }
    };

    const getPrice = (product: SearchProduct) => {
        return product.productFields?.price || product.price || 'N/A';
    };

    return (
        <div ref={searchRef} className="w-full relative">
            <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                            if (searchQuery.trim().length >= 2) {
                                setShowDropdown(true);
                            }
                        }}
                        placeholder="Search products..."
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 px-5 py-3.5 pr-12 text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Search"
                    >
                        {isLoading ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </form>

            {/* Search Results Dropdown */}
            {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white backdrop-blur-xl border border-gray-200 shadow-2xl max-h-[500px] overflow-y-auto z-50">
                    {isLoading && searchResults.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                            <p className="mt-3 text-sm text-gray-500">Searching...</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="py-2">
                            {searchResults.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.slug}`}
                                    onClick={() => setShowDropdown(false)}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 overflow-hidden">
                                        {product.image?.sourceUrl ? (
                                            <Image
                                                src={product.image.sourceUrl}
                                                alt={product.image.altText || product.name}
                                                fill
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-black truncate">
                                            {product.name}
                                        </h3>
                                        {product.productCategories?.nodes?.[0]?.name && (
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {product.productCategories.nodes[0].name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="text-sm font-bold text-gray-900 flex-shrink-0">
                                        {getPrice(product)} dh
                                    </div>

                                    {/* Arrow Icon */}
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    ) : hasSearched ? (
                        <div className="p-8 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-900">No results found</p>
                            <p className="text-xs text-gray-500 mt-1">Try different keywords</p>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-sm text-gray-500">Start typing to search products</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
