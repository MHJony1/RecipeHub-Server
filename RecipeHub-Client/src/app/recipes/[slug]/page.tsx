import { Suspense } from 'react';
import { RecipeDetailsContent } from '@/components/recipe/RecipeDetailsContent';
import { RecipeDetailsSkeleton } from '@/components/recipe/RecipeDetailsSkeleton';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recipes/slug/${params.slug}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return { title: 'Recipe Not Found' };
    const data = await response.json();
    const recipe = data.data;

    return {
      title: `${recipe.title} | RecipeHub`,
      description: recipe.shortDescription || recipe.description.slice(0, 160),
      openGraph: {
        title: recipe.title,
        description: recipe.shortDescription || recipe.description.slice(0, 160),
        type: 'article',
        images: recipe.image ? [{ url: recipe.image }] : [],
      },
    };
  } catch (error) {
    return { title: 'Recipe | RecipeHub' };
  }
}

export default function RecipeDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<RecipeDetailsSkeleton />}>
      <RecipeDetailsContent slug={params.slug} />
    </Suspense>
  );
}
