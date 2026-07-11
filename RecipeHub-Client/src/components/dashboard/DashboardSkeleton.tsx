'use client';

import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 md:p-8">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-0">
            <div className="space-y-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 animate-pulse" />
              ))}
            </div>
            <div className="border-t p-4">
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </Card>
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-3 space-y-8">
          {/* Welcome Card */}
          <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl" />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-4 w-20 bg-gray-200 animate-pulse mb-2" />
                <div className="h-8 w-16 bg-gray-200 animate-pulse" />
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-gray-200 animate-pulse rounded-2xl" />
            <div className="h-80 bg-gray-200 animate-pulse rounded-2xl" />
          </div>

          {/* Recent Recipes */}
          <div>
            <div className="h-8 w-40 bg-gray-200 animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-40 bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 animate-pulse mb-2" />
                    <div className="h-6 w-20 bg-gray-200 animate-pulse mb-4" />
                    <div className="h-10 bg-gray-200 animate-pulse rounded" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
