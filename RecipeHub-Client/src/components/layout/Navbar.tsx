'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthContext';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Search,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  PlusCircle,
  LayoutDashboard,
  Home,
  Info,
  Phone,
} from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: ROUTES.HOME, icon: Home },
    { label: 'Recipes', href: ROUTES.RECIPES, icon: BookOpen },
    ...(isAuthenticated
      ? [
          { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
          { label: 'Add Recipe', href: ROUTES.ADD_RECIPE, icon: PlusCircle },
        ]
      : []),
    { label: 'About', href: ROUTES.ABOUT, icon: Info },
    { label: 'Contact', href: ROUTES.CONTACT, icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === ROUTES.HOME) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-lg border-b border-[#F4A261]/20'
            : 'bg-white/85 backdrop-blur-xl border-b border-[#F4A261]/10'
        }`}
      >
        <Container>
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo - Responsive */}
            <Link
              href={ROUTES.HOME}
              className="group flex items-center gap-2 md:gap-3 flex-shrink-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] flex items-center justify-center shadow-lg shadow-[#E07A2F]/20">
                <UtensilsCrossed className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <span className="text-lg md:text-2xl font-bold tracking-tight">
                  <span className="text-[#2D1B0E]">Recipe</span>
                  <span className="text-[#E07A2F]">Hub</span>
                </span>
                <p className="hidden sm:block text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-[#E9C46A] font-medium">
                  COOK WITH CONFIDENCE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - lg:flex */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      active
                        ? 'text-[#E07A2F] bg-[#F4A261]/10'
                        : 'text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Section - Responsive */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Search - Hidden on very small */}
              <button className="hidden sm:flex p-1.5 md:p-2 rounded-full text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 transition-all">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1 sm:gap-2 p-1 pr-2 sm:p-1.5 sm:pr-3 rounded-full bg-[#F4A261]/10 hover:bg-[#F4A261]/20 border border-[#F4A261]/20 transition-all"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden sm:block text-[#2D1B0E] text-xs sm:text-sm font-medium">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="hidden sm:block w-3 h-3 md:w-4 md:h-4 text-[#7A6B5A]" />
                  </button>

                  {/* User Dropdown - Responsive */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white border border-[#F4A261]/20 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="p-2.5 sm:p-3 border-b border-[#F4A261]/10 bg-gradient-to-r from-[#F4A261]/5 to-[#E9C46A]/5">
                          <div className="font-medium text-[#2D1B0E] text-sm sm:text-base truncate">
                            {user?.name}
                          </div>
                          <div className="text-xs sm:text-sm text-[#7A6B5A] truncate">
                            {user?.email}
                          </div>
                        </div>
                        <div className="p-1">
                          {[
                            { label: 'Profile', icon: User, href: '/profile' },
                            {
                              label: 'My Recipes',
                              icon: BookOpen,
                              href: '/manage-recipes',
                            },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 transition-all text-xs sm:text-sm"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              {item.label}
                            </Link>
                          ))}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all text-xs sm:text-sm"
                          >
                            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link href={ROUTES.LOGIN}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={ROUTES.REGISTER}>
                    <Button
                      size="sm"
                      className="text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/30 hover:shadow-lg hover:shadow-[#E07A2F]/40 hover:scale-105 transition-all"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button - lg:hidden */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-full text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu - Full Responsive */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-[#F4A261]/10 max-h-[80vh] overflow-y-auto"
            >
              <Container>
                <div className="py-2 sm:py-3 space-y-0.5">
                  {/* Navigation Links */}
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                          active
                            ? 'text-[#E07A2F] bg-[#F4A261]/10'
                            : 'text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/5'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        {link.label}
                      </Link>
                    );
                  })}

                  {/* Mobile Auth - Show when not authenticated */}
                  {!isAuthenticated && (
                    <div className="pt-3 sm:pt-4 mt-2 border-t border-[#F4A261]/10 space-y-2">
                      <Link href={ROUTES.LOGIN} className="block">
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-sm sm:text-base"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href={ROUTES.REGISTER} className="block">
                        <Button className="w-full justify-center bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/20 text-sm sm:text-base">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}

                  {/* Mobile Search - Show only on small devices */}
                  <div className="pt-3 sm:pt-4 mt-2 border-t border-[#F4A261]/10 sm:hidden">
                    <button className="flex items-center gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/5 transition-all text-sm sm:text-base">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                      Search Recipes
                    </button>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer - Responsive */}
      <div className="h-16 md:h-20" />
    </>
  );
};
