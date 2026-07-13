'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/common/Container';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Clock,
  ChefHat,
  Calendar,
  Sparkles,
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  UtensilsCrossed,
  ListChecks,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeDetailsContentProps {
  slug: string;
}

export const RecipeDetailsContent = ({ slug }: RecipeDetailsContentProps) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const recipeData = await recipeService.getRecipeBySlug(slug);
        setRecipe(recipeData);

        const response = await recipeService.getRecipes({
          category: recipeData.category,
          limit: 4,
        });
        const filtered = (response.data || [])
          .filter((r: Recipe) => r._id !== recipeData._id)
          .slice(0, 4);
        setRelatedRecipes(filtered);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setError('Recipe not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-[#F4A261]/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🍽️</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#2D1B0E] mb-2">
            Recipe Not Found
          </h1>
          <p className="text-[#7A6B5A] text-sm mb-6">
            Sorry, we couldn&apos;t find the recipe you&apos;re looking for.
          </p>
          <Link href={ROUTES.RECIPES}>
            <Button className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Recipes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const publishDate = new Date(recipe.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative bg-[#FFFBF7] pt-24 pb-8 sm:pb-12 md:pb-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          {/* Back Button */}
          <Link
            href={ROUTES.RECIPES}
            className="inline-flex items-center gap-2 text-[#7A6B5A] hover:text-[#E07A2F] transition-colors duration-300 text-sm mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Recipes
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Image - Left Side */}
            <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl shadow-[#E07A2F]/10">
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-[#F4A261]/20 to-[#E9C46A]/20">
                  🍽️
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0E]/20 via-transparent to-transparent" />

              {/* Premium Frame */}
              <div className="absolute inset-0 border-2 border-[#E9C46A]/30 rounded-3xl pointer-events-none" />
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#E07A2F] rounded-tl-xl" />
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-[#E9C46A] rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-[#E9C46A] rounded-bl-xl" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#E07A2F] rounded-br-xl" />
            </div>

            {/* Info - Right Side */}
            <div className="flex flex-col justify-center space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#E07A2F]/10 text-[#E07A2F] border-[#E07A2F]/20 rounded-full px-3 py-1 text-xs font-medium">
                  {recipe.category}
                </Badge>
                <Badge
                  className={`rounded-full px-3 py-1 text-xs font-medium border ${
                    recipe.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      : recipe.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                  }`}
                >
                  {recipe.difficulty}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B0E] leading-tight">
                {recipe.title}
              </h1>

              {/* Description */}
              <p className="text-[#7A6B5A] text-base sm:text-lg leading-relaxed">
                {recipe.shortDescription}
              </p>

              {/* Recipe Info - Inline */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#2D1B0E]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E07A2F]" />
                  <span>{recipe.cookingTime} minutes</span>
                </div>
                <div className="w-px h-4 bg-[#F4A261]/20" />
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-[#E07A2F]" />
                  <span>By {recipe.author?.name || 'Anonymous'}</span>
                </div>
                <div className="w-px h-4 bg-[#F4A261]/20" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E07A2F]" />
                  <span>{publishDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#F4A261]/20 hover:border-[#E07A2F]/30 hover:bg-[#F4A261]/5 transition-all duration-300 text-sm"
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? 'fill-[#E07A2F] text-[#E07A2F]' : 'text-[#7A6B5A]'}`}
                  />
                  <span className="text-[#7A6B5A]">Like</span>
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#F4A261]/20 hover:border-[#E07A2F]/30 hover:bg-[#F4A261]/5 transition-all duration-300 text-sm"
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? 'fill-[#E07A2F] text-[#E07A2F]' : 'text-[#7A6B5A]'}`}
                  />
                  <span className="text-[#7A6B5A]">Save</span>
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#F4A261]/20 hover:border-[#E07A2F]/30 hover:bg-[#F4A261]/5 transition-all duration-300 text-sm">
                  <Share2 className="w-4 h-4 text-[#7A6B5A]" />
                  <span className="text-[#7A6B5A]">Share</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Main Content - বাকি অংশ আগের মতোই থাকবে */}
      <section className="py-10 sm:py-14 md:py-20 bg-white border-t border-[#F4A261]/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-10 md:space-y-14">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#E07A2F]" />
                  <h2 className="font-display text-2xl font-bold text-[#2D1B0E]">
                    About This Recipe
                  </h2>
                </div>
                <p className="text-[#7A6B5A] text-base leading-relaxed">
                  {recipe.description}
                </p>
              </motion.div>

              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="w-5 h-5 text-[#E07A2F]" />
                  <h2 className="font-display text-2xl font-bold text-[#2D1B0E]">
                    Ingredients
                  </h2>
                  <span className="ml-auto text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
                    {recipe.ingredients.length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#F4A261]/5 border border-[#F4A261]/10 hover:border-[#E07A2F]/20 transition-all duration-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <p className="text-[#2D1B0E] text-sm">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-[#E07A2F]" />
                  <h2 className="font-display text-2xl font-bold text-[#2D1B0E]">
                    Cooking Instructions
                  </h2>
                  <span className="ml-auto text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
                    {recipe.instructions.length} steps
                  </span>
                </div>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 rounded-xl bg-[#FFFBF7] border border-[#F4A261]/10 hover:border-[#E07A2F]/20 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] text-white flex items-center justify-center shrink-0 font-display font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-[#2D1B0E] text-sm leading-relaxed pt-0.5">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-28 p-5 md:p-6 bg-white border border-[#F4A261]/10 rounded-2xl shadow-xl shadow-[#F4A261]/5">
                <h3 className="font-display font-bold text-[#2D1B0E] text-lg mb-5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                  Recipe Info
                </h3>
                <div className="space-y-5">
                  <div className="p-3 rounded-xl bg-[#F4A261]/5">
                    <p className="text-[#7A6B5A] text-xs font-medium uppercase tracking-wider mb-1">
                      Cooking Time
                    </p>
                    <p className="font-display text-xl font-bold text-[#E07A2F]">
                      {recipe.cookingTime} min
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F4A261]/5">
                    <p className="text-[#7A6B5A] text-xs font-medium uppercase tracking-wider mb-1">
                      Difficulty
                    </p>
                    <p
                      className={`font-display text-xl font-bold ${
                        recipe.difficulty === 'Easy'
                          ? 'text-emerald-600'
                          : recipe.difficulty === 'Medium'
                            ? 'text-amber-600'
                            : 'text-rose-600'
                      }`}
                    >
                      {recipe.difficulty}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F4A261]/5">
                    <p className="text-[#7A6B5A] text-xs font-medium uppercase tracking-wider mb-1">
                      Category
                    </p>
                    <p className="font-display text-xl font-bold text-[#E07A2F]">
                      {recipe.category}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F4A261]/10">
                    <p className="text-[#7A6B5A] text-xs font-medium uppercase tracking-wider mb-1">
                      Author
                    </p>
                    <p className="font-display font-bold text-[#2D1B0E]">
                      {recipe.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-[#7A6B5A] text-sm mt-0.5">
                      {recipe.author?.email || ''}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="py-10 sm:py-14 md:py-20 bg-[#FFFBF7] border-t border-[#F4A261]/10">
          <Container>
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                  <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                    You May Also Like
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2D1B0E]">
                  More from{' '}
                  <span className="text-[#E07A2F]">{recipe.category}</span>
                </h2>
              </div>
              <Link href={ROUTES.RECIPES}>
                <button className="text-[#E07A2F] hover:text-[#E07A2F]/80 text-sm font-medium flex items-center gap-1 group transition-colors">
                  View All
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedRecipes.map((relRecipe, index) => (
                <motion.div
                  key={relRecipe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={ROUTES.RECIPE_DETAILS(relRecipe.slug)}>
                    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-[#F4A261]/10 hover:border-[#E07A2F]/30 rounded-2xl h-full">
                      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[#F4A261]/10 to-[#E9C46A]/10">
                        {relRecipe.image ? (
                          <Image
                            src={relRecipe.image}
                            alt={relRecipe.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-[#F4A261]/20 to-[#E9C46A]/20">
                            🍽️
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0E]/20 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-[#2D1B0E] shadow-lg border border-[#F4A261]/20">
                            {relRecipe.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-bold text-[#2D1B0E] text-sm line-clamp-2 group-hover:text-[#E07A2F] transition-colors duration-300">
                          {relRecipe.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-[#7A6B5A]">
                          <Clock className="w-3 h-3 text-[#E07A2F]" />
                          <span>{relRecipe.cookingTime} min</span>
                          <span className="w-px h-3 bg-[#F4A261]/20" />
                          <ChefHat className="w-3 h-3 text-[#E07A2F]" />
                          <span>{relRecipe.difficulty}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E07A2F] via-[#E9C46A] to-[#F4A261]">
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #2D1B0E 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="text-center text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              Ready to Cook?
            </h2>
            <p className="text-white/90 text-sm sm:text-base mb-6">
              Explore more recipes or share your own culinary creations with our
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={ROUTES.RECIPES}>
                <Button className="bg-white text-[#E07A2F] hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10 rounded-xl px-6 py-2.5 text-sm font-semibold">
                  Explore More Recipes
                </Button>
              </Link>
              <Link href={ROUTES.ADD_RECIPE}>
                <Button className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white/80 hover:scale-105 transition-all duration-300 rounded-xl px-6 py-2.5 text-sm font-semibold backdrop-blur-sm">
                  Share Your Recipe
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};
