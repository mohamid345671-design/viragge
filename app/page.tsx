import Hero from '@/components/Hero';
import FeatureBar from '@/components/FeatureBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import SocialProof from '@/components/SocialProof';
import Newsletter from '@/components/Newsletter';
import { graphqlClient, GET_CATEGORIES } from '@/lib/graphql';
import MasonryGrid from '@/components/MasonryGrid';
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
    </main>
  );
}
