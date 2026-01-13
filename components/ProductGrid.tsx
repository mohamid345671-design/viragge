'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { graphqlClient, GET_PRODUCTS } from '@/lib/graphql';

interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  price: string;
  image: {
    sourceUrl: string;
    altText: string;
  } | null;
  productCategories: {
    nodes: Array<{ name: string }>;
  };
  productFields: {
    price: number | null;
    isNew: boolean;
  } | null;
}

interface ProductGridProps {
  title?: string;
  category?: string;
  limit?: number;
}

export default function ProductGrid({
  title = 'Latest Drops',
  category,
  limit = 8,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Reveal animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Fetch products */
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data: any = await graphqlClient.request(GET_PRODUCTS, {
          first: 50,
        });

        let allProducts = data.products.nodes;

        if (category) {
          allProducts = allProducts.filter((product: Product) =>
            product.productCategories.nodes.some(
              (cat) => cat.name.toLowerCase() === category.toLowerCase()
            )
          );
        }

        setProducts(allProducts.slice(0, limit));
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, limit]);

  const viewAllLink = category
    ? `/shop?category=${encodeURIComponent(category)}`
    : '/shop';

  const SkeletonCard = ({ index }: { index: number }) => (
    <div className="animate-pulse" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="aspect-[3/4] bg-gray-100 mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 w-3/4" />
        <div className="h-3 bg-gray-200 w-1/2" />
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black py-20 border-b border-gray-100"
    >
      {/* MOBILE-FRIENDLY CONTAINER */}
      <div className="mx-auto max-w-[100%] px-3 sm:px-4 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-14">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            {title}
          </h2>

          <Link
            href={viewAllLink}
            className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#d41132]"
          >
            View All →
          </Link>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-6">
            {[...Array(limit)].map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-6">
              {products.map((product, index) => {
                const rawPrice =
                  product.productFields?.price ??
                  parseFloat(
                    product.price?.replace(/[^0-9.]/g, '') || '0'
                  );
                const displayPrice = `${Math.round(rawPrice)} DH`;
                const isNew = product.productFields?.isNew ?? false;

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className={`group transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 md:translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3 border border-gray-100">
                      {isNew && (
                        <span className="absolute top-3 left-3 z-10 bg-[#d41132] text-white text-[10px] font-bold px-2 py-1 uppercase">
                          New
                        </span>
                      )}

                      {product.image?.sourceUrl ? (
                        <Image
                          src={product.image.sourceUrl}
                          alt={product.image.altText || product.name}
                          fill
                          className="
                            object-cover
                            transition-transform duration-700
                            group-hover:scale-105
                            md:object-contain md:p-4
                          "
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs uppercase text-gray-400">
                          No image
                        </div>
                      )}

                      {/* CATEGORY BADGE (MOBILE ONLY) */}
                      <span className="absolute bottom-3 left-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider md:hidden">
                        {product.productCategories.nodes[0]?.name}
                      </span>
                    </div>

                    {/* INFO */}
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-[#d41132] line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-gray-500 hidden md:block">
                        {product.productCategories.nodes[0]?.name}
                      </p>
                      <p className="font-black text-base md:text-lg">
                        {displayPrice}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* MOBILE CTA */}
            <div className="mt-10 text-center md:hidden">
              <Link
                href={viewAllLink}
                className="inline-block bg-black text-white text-sm font-bold uppercase tracking-widest px-8 py-4"
              >
                View All →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
