'use client';

import Link from 'next/link';
import { ROUTES, NAVIGATION_MENU } from '@/constants';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md backdrop-blur-sm">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-orange-500">
            🍽️ RecipeHub
          </Link>

          <div className="hidden md:flex gap-8">
            {NAVIGATION_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="sm">
              <Link href={ROUTES.LOGIN}>Login</Link>
            </Button>
            <Button size="sm">
              <Link href={ROUTES.REGISTER}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};
