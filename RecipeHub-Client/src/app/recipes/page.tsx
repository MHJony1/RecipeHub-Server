import { Suspense } from 'react';
import { RecipesContent } from '@/components/explore/RecipesContent';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Container } from '@/components/common/Container';

function RecipesLoading() {
  return (
    <div className="min-h-screen bg-background py-16">
      <Container>
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">Explore Recipes</h1>
          <p className="font-body text-lg text-text-secondary">Discover delicious recipes from our community</p>
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
