import { Suspense } from 'react';
import { RecipesContent } from '@/components/explore/RecipesContent';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Container } from '@/components/common/Container';

function RecipesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Recipes</h1>
          <p className="text-gray-600">Discover delicious recipes from our community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<RecipesLoading />}>
      <RecipesContent />
    </Suspense>
  );
}
