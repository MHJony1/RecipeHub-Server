'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthContext';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  const navLinks = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Recipes', href: ROUTES.RECIPES },
    ...(isAuthenticated
      ? [
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Add Recipe', href: ROUTES.ADD_RECIPE },
        ]
      : []),
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-12 shadow-lg'
          : 'bg-white/40 backdrop-blur-8'
      }`}
    >
      <Container>
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className="text-2xl font-display font-bold text-primary hover:text-accent transition-colors"
          >
            RecipeHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text font-body font-medium relative group transition-colors hover:text-primary"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"
                />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-text font-body text-sm md:text-base hidden sm:block">
                  {user?.name}
                </span>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={handleLogout}
                  className="text-xs md:text-sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm" className="text-xs md:text-sm">
                  <Link href={ROUTES.LOGIN}>Login</Link>
                </Button>
                <Button size="sm" className="text-xs md:text-sm">
                  <Link href={ROUTES.REGISTER}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-text transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-text transition-all ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-text transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-6 border-t border-border/20"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-text font-body font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </Container>
    </nav>
  );
};

