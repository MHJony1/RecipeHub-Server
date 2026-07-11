'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { type Recipe } from '@/services/recipe.service';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardChartsProps {
  recipes: Recipe[];
}

export const DashboardCharts = ({ recipes }: DashboardChartsProps) => {
  // Prepare category distribution data
  const categoryData: Record<string, number> = {};
  recipes.forEach((recipe) => {
    categoryData[recipe.category] = (categoryData[recipe.category] || 0) + 1;
  });

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    count,
  }));

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Category Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recipes by Category</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600 text-center py-8">No data available</p>
        )}
      </Card>

      {/* Quick Info */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recipe Summary</h3>
        <div className="space-y-4">
          {chartData.length > 0 ? (
            chartData.map((item) => (
              <div key={item.name} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-bold text-orange-500 text-lg">{item.count}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No recipes yet</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
