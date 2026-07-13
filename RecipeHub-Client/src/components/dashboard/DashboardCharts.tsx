'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { type Recipe } from '@/services/recipe.service';
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
import { TrendingUp, Layers, Sparkles } from 'lucide-react';

interface DashboardChartsProps {
  recipes: Recipe[];
}

const COLORS = [
  '#E07A2F',
  '#E9C46A',
  '#F4A261',
  '#52B788',
  '#4A90D9',
  '#E76F51',
];

export const DashboardCharts = ({ recipes }: DashboardChartsProps) => {
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
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Bar Chart */}
      <Card className="p-5 md:p-6 bg-white border border-[#F4A261]/10 rounded-2xl">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-[#E07A2F]" />
          <h3 className="font-display font-bold text-[#2D1B0E] text-lg">
            Recipes by Category
          </h3>
          <span className="ml-auto text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
            {chartData.length} categories
          </span>
        </div>

        {chartData.length > 0 ? (
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={40}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E8E0D8"
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#7A6B5A"
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#7A6B5A"
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
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
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
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
        ) : (
          <div className="flex items-center justify-center h-[280px] text-[#7A6B5A] text-sm">
            No recipe data available
          </div>
        )}
      </Card>

      {/* Pie Chart */}
      <Card className="p-5 md:p-6 bg-white border border-[#F4A261]/10 rounded-2xl">
        <div className="flex items-center gap-2 mb-5">
          <Layers className="w-5 h-5 text-[#E9C46A]" />
          <h3 className="font-display font-bold text-[#2D1B0E] text-lg">
            Category Distribution
          </h3>
          <span className="ml-auto text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
            {recipes.length} total
          </span>
        </div>

        {chartData.length > 0 ? (
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
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
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: '11px',
                    color: '#2D1B0E',
                    paddingLeft: '10px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[280px] text-[#7A6B5A] text-sm">
            No recipe data available
          </div>
        )}
      </Card>
    </motion.div>
  );
};
