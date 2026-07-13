'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import { recipeService } from '@/services/recipe.service';
import { RECIPE_CATEGORIES } from '@/constants';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import {
  ChefHat,
  Users,
  Clock,
  Layers,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface StatData {
  total: number;
  categories: number;
  avgCookingTime: number;
  contributors: number;
}

const COLORS = [
  '#E07A2F',
  '#E9C46A',
  '#F4A261',
  '#52B788',
  '#4A90D9',
  '#E76F51',
  '#2A9D8F',
  '#E9C46A',
];

export const Statistics = () => {
  const [stats, setStats] = useState<StatData>({
    total: 0,
    categories: 0,
    avgCookingTime: 0,
    contributors: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [growth] = useState(12.5);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await recipeService.getRecipes({ limit: 100 });
        const recipes = (response.data || []) as Array<{
          category: string;
          cookingTime: number;
          createdBy: string;
        }>;

        const totalRecipes = recipes.length;
        const categories = new Set(recipes.map((r) => r.category)).size;
        const avgCookingTime = recipes.length
          ? Math.round(
              recipes.reduce((sum: number, r) => sum + r.cookingTime, 0) /
                recipes.length
            )
          : 0;
        const contributors = new Set(recipes.map((r) => r.createdBy)).size;

        setStats({
          total: totalRecipes,
          categories,
          avgCookingTime,
          contributors,
        });

        const categoryCounts: Record<string, number> = {};
        recipes.forEach((recipe) => {
          categoryCounts[recipe.category] =
            (categoryCounts[recipe.category] || 0) + 1;
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const statCards = [
    {
      label: 'Total Recipes',
      value: stats.total,
      icon: ChefHat,
      gradient: 'from-[#E07A2F] to-[#F4A261]',
      suffix: '',
      growth: '+12%',
      trend: 'up',
    },
    {
      label: 'Categories',
      value: stats.categories,
      icon: Layers,
      gradient: 'from-[#E9C46A] to-[#F4A261]',
      suffix: '',
      growth: '+5%',
      trend: 'up',
    },
    {
      label: 'Avg Cooking Time',
      value: stats.avgCookingTime,
      icon: Clock,
      gradient: 'from-[#F4A261] to-[#E07A2F]',
      suffix: 'm',
      growth: '-8%',
      trend: 'down',
    },
    {
      label: 'Contributors',
      value: stats.contributors,
      icon: Users,
      gradient: 'from-[#E07A2F] to-[#E9C46A]',
      suffix: '',
      growth: '+18%',
      trend: 'up',
    },
  ];

  if (isLoading) {
    return (
      <section className="relative py-16 md:py-24 bg-[#FFFBF7]">
        <Container>
          <SectionTitle
            title="Platform Statistics"
            description="See what our community has achieved."
          />
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] border border-[#F4A261]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] border border-[#E9C46A]/5 rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #2D1B0E 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 md:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E07A2F]" />
                <span className="text-[#E07A2F] text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase">
                  Community Insights
                </span>
                <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-[#E07A2F] to-transparent" />
              </div>
              <SectionTitle
                title="Platform Statistics"
                description="See what our community has achieved."
                className="text-left"
              />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#F4A261]/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm flex-shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#52B788]" />
              <span className="text-[#2D1B0E] text-xs sm:text-sm font-medium">
                +{growth}%
              </span>
              <span className="text-[#7A6B5A] text-[10px] sm:text-xs hidden xs:inline">
                growth this month
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Fully Responsive */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const isUp = stat.trend === 'up';
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden p-3.5 sm:p-4 md:p-6 bg-white border border-[#F4A261]/10 hover:border-[#F4A261]/30 transition-all duration-500 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F4A261]/5 to-[#E9C46A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#7A6B5A] text-[9px] sm:text-[10px] md:text-xs font-medium uppercase tracking-wider truncate">
                        {stat.label}
                      </p>
                      <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D1B0E] mt-0.5 sm:mt-1 truncate">
                        {stat.value}
                        {stat.suffix}
                      </p>
                      <div
                        className={`flex items-center gap-0.5 sm:gap-1 mt-1 text-[9px] sm:text-[10px] md:text-xs font-medium ${
                          isUp ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      >
                        {isUp ? (
                          <ArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        ) : (
                          <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        )}
                        <span>{stat.growth}</span>
                        <span className="text-[#7A6B5A] font-normal hidden sm:inline">
                          vs last month
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-[#E07A2F]/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section - Fully Responsive */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Bar Chart */}
          {chartData.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-7 bg-white border border-[#F4A261]/10">
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#E07A2F]" />
                <h3 className="font-display font-bold text-[#2D1B0E] text-sm sm:text-base md:text-lg">
                  Recipes by Category
                </h3>
                <span className="ml-auto text-[#7A6B5A] text-[10px] sm:text-xs bg-[#F4A261]/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  {chartData.length} categories
                </span>
              </div>

              <div className="h-[200px] sm:h-[240px] md:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barSize={30} maxBarSize={50}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E8E0D8"
                      opacity={0.3}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#7A6B5A"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      tick={{ fontSize: 9, sm: { fontSize: 11 } }}
                    />
                    <YAxis
                      stroke="#7A6B5A"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      tick={{ fontSize: 9, sm: { fontSize: 11 } }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #F4A261/30',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        fontSize: '12px',
                      }}
                      cursor={{ fill: '#F4A261/10' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Pie Chart */}
          {chartData.length > 0 && (
            <Card className="p-4 sm:p-5 md:p-7 bg-white border border-[#F4A261]/10">
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#E07A2F]" />
                <h3 className="font-display font-bold text-[#2D1B0E] text-sm sm:text-base md:text-lg">
                  Category Distribution
                </h3>
                <span className="ml-auto text-[#7A6B5A] text-[10px] sm:text-xs bg-[#F4A261]/10 px-2 sm:px-2.5 py-0.5 rounded-full">
                  {stats.categories} total
                </span>
              </div>

              <div className="h-[200px] sm:h-[240px] md:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="white"
                          strokeWidth={1.5}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #F4A261/30',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        fontSize: '12px',
                      }}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                      iconSize={6}
                      wrapperStyle={{
                        fontSize: '10px',
                        color: '#2D1B0E',
                        paddingTop: '10px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Bottom Insight - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-10 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white border border-[#F4A261]/20 rounded-full px-3 sm:px-5 md:px-6 py-2 sm:py-3 shadow-md">
            <span className="text-[#7A6B5A] text-[10px] sm:text-xs md:text-sm">
              {stats.total}+ recipes shared by {stats.contributors} contributors
            </span>
            <span className="hidden xs:inline w-px h-4 sm:h-5 md:h-6 bg-[#F4A261]/20" />
            <span className="text-[#E07A2F] text-[10px] sm:text-xs md:text-sm font-medium">
              Avg. {stats.avgCookingTime}m cooking time
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
