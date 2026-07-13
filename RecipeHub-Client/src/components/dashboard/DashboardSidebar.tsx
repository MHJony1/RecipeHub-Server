'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import { ROUTES } from '@/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Compass,
  LogOut,
  Sparkles,
  ChefHat,
  User,
} from 'lucide-react';

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const menuItems = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Add Recipe', href: ROUTES.ADD_RECIPE, icon: PlusCircle },
    { label: 'Manage Recipes', href: ROUTES.MANAGE_RECIPES, icon: BookOpen },
    { label: 'Explore', href: ROUTES.RECIPES, icon: Compass },
  ];

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  return (
    <Card className="p-0 overflow-hidden sticky top-28 bg-white border border-[#F4A261]/10 shadow-xl shadow-[#F4A261]/5 rounded-3xl">
      {/* User Profile */}
      <div className="p-5 border-b border-[#F4A261]/10 bg-gradient-to-br from-[#FFFBF7] to-[#FDF5EC]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-[#E07A2F]/20">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-[#2D1B0E] truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-[#7A6B5A] text-xs truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
          <ChefHat className="w-4 h-4 text-[#E9C46A]" />
        </div>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-body cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E07A2F]/10 to-[#E9C46A]/10 text-[#E07A2F] border border-[#E07A2F]/20 shadow-md shadow-[#E07A2F]/5'
                    : 'text-[#7A6B5A] hover:text-[#2D1B0E] hover:bg-[#F4A261]/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#E07A2F]' : ''} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E07A2F]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#F4A261]/10 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-[#7A6B5A] hover:text-red-500 hover:bg-red-50 rounded-xl py-2.5 text-sm transition-all duration-300"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </Card>
  );
};
