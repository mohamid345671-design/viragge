import Hero from '@/components/Hero';
import FeatureBar from '@/components/FeatureBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import { graphqlClient, GET_CATEGORIES } from '@/lib/graphql';
import MasonryGrid from '@/components/MasonryGrid';
import dynamicImport from 'next/dynamic';

// Lazy load below-the-fold components for better performance
const SocialProof = dynamicImport(() => import('@/components/SocialProof'), {
  loading: () => <div className="h-96 bg-white" />,
  ssr: true, // Keep SSR for SEO
});

const Newsletter = dynamicImport(() => import('@/components/Newsletter'), {
  loading: () => <div className="h-64 bg-black" />,
  ssr: true,
});

const Footer = dynamicImport(() => import('@/components/Footer'), {
  loading: () => <div className="h-96 bg-black" />,
  ssr: true,
});

export const dynamic = 'force-dynamic';
export default async function Home() {
  let categories = [];
  try {
    const data: any = await graphqlClient.request(GET_CATEGORIES);
    categories = data.productCategories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Feature Bar */}
      <FeatureBar />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Shop by Category */}
      <MasonryGrid categories={categories} />

      {/* 5. Social Proof */}
      <SocialProof />

      {/* 6. Newsletter */}
      <Newsletter />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
