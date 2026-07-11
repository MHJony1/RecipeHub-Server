'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import { recipeService } from '@/services/recipe.service';
import { RECIPE_CATEGORIES } from '@/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface StatData {
  total: number;
  categories: number;
  avgCookingTime: number;
  contributors: number;
}

const CHART_COLORS = ['#F97316', '#22C55E', '#FACC15', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B'];

export const Statistics = () => {
  const [stats, setStats] = useState<StatData>({ total: 0, categories: 0, avgCookingTime: 0, contributors: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await recipeService.getRecipes({ limit: 100 });
        const recipes = response.data || [];

        const totalRecipes = recipes.length;
        const categories = new Set(recipes.map((r: any) => r.category)).size;
        const avgCookingTime = recipes.length
          ? Math.round(recipes.reduce((sum: number, r: any) => sum + r.cookingTime, 0) / recipes.length)
          : 0;
        const contributors = new Set(recipes.map((r: any) => r.createdBy)).size;

        setStats({
          total: totalRecipes,
          categories,
          avgCookingTime,
          contributors,
        });

        // Prepare category data for chart
        const categoryCounts: Record<string, number> = {};
        recipes.forEach((recipe: any) => {
          categoryCounts[recipe.category] = (categoryCounts[recipe.category] || 0) + 1;
        });

        const chartData = RECIPE_CATEGORIES.map((cat) => ({
          name: cat,
          value: categoryCounts[cat] || 0,
        })).filter((d) => d.value > 0);

        setChartData(chartData);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionTitle title="Platform Statistics" description="See what our community has achieved." />
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionTitle title="Platform Statistics" description="See what our community has achieved." />

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Card className="text-center py-8">
              <div className="text-4xl font-bold text-orange-500 mb-2">{stats.total}</div>
              <p className="text-gray-600">Total Recipes</p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center py-8">
              <div className="text-4xl font-bold text-green-500 mb-2">{stats.categories}</div>
              <p className="text-gray-600">Categories</p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center py-8">
              <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.avgCookingTime}m</div>
              <p className="text-gray-600">Avg Cooking Time</p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center py-8">
              <div className="text-4xl font-bold text-blue-500 mb-2">{stats.contributors}</div>
              <p className="text-gray-600">Contributors</p>
            </Card>
          </motion.div>
        </motion.div>

        {chartData.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recipes by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#F97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}
      </Container>
    </section>
  );
};
