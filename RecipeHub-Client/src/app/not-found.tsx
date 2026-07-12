import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="mb-8">
            <div className="text-8xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              404
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>

          <p className="text-xl text-gray-600 mb-2">
            Oops! We couldn&apos;t find the recipe you&apos;re looking for.
          </p>

          <p className="text-gray-500 mb-12">
            The page might have been removed, or the URL might be incorrect. Let&apos;s get you back on track!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={ROUTES.HOME}>
              <Button className="gap-2">
                <Home className="w-5 h-5" />
                Go to Home
              </Button>
            </Link>
            <Link href={ROUTES.RECIPES}>
              <Button variant="secondary" className="gap-2">
                <Search className="w-5 h-5" />
                Explore Recipes
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 mb-4">
              Still need help? Check out these popular sections:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link href={ROUTES.HOME} className="text-orange-500 hover:text-orange-600 font-medium">
                Home
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={ROUTES.RECIPES} className="text-orange-500 hover:text-orange-600 font-medium">
                Recipes
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={ROUTES.ABOUT} className="text-orange-500 hover:text-orange-600 font-medium">
                About
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={ROUTES.CONTACT} className="text-orange-500 hover:text-orange-600 font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
