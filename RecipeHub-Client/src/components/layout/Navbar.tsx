'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthContext';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md backdrop-blur-sm">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-orange-500">
            🍽️ RecipeHub
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href={ROUTES.HOME} className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Home
            </Link>
            <Link href={ROUTES.RECIPES} className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Recipes
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href={ROUTES.DASHBOARD}
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href={ROUTES.ADD_RECIPE}
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  Add Recipe
                </Link>
              </>
            )}
            <Link href={ROUTES.ABOUT} className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              About
            </Link>
            <Link href={ROUTES.CONTACT} className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="flex gap-3 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">{user?.name}</span>
                <Button size="sm" variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm">
                  <Link href={ROUTES.LOGIN}>Login</Link>
                </Button>
                <Button size="sm">
                  <Link href={ROUTES.REGISTER}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};
