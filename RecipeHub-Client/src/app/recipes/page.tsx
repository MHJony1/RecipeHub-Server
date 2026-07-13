import { Suspense } from 'react';
import { RecipesContent } from '@/components/explore/RecipesContent';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Container } from '@/components/common/Container';

function RecipesLoading() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] py-16 pt-24">
      <Container>
        <div className="mb-12">
          <div className="h-8 w-48 bg-[#F4A261]/20 rounded-lg animate-pulse" />
          <div className="h-5 w-72 bg-[#F4A261]/10 rounded-lg animate-pulse mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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