'use client';

import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';

export const RecipeDetailsSkeleton = () => {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-96 rounded-2xl bg-gray-200 animate-pulse" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="h-20 bg-gray-200 rounded animate-pulse mb-6" />

              <div className="space-y-3 mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>

              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </Container>
      </section>

      {/* Content Skeleton */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Description Skeleton */}
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Ingredients Skeleton */}
              <div>
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Instructions Skeleton */}
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Recipes Skeleton */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Card className="overflow-hidden h-full">
                  <div className="h-40 bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
