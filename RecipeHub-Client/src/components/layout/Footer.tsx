import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">🍽️ RecipeHub</h3>
            <p className="text-gray-400">Discover amazing recipes and share your culinary creations.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.HOME} className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTES.RECIPES} className="text-gray-400 hover:text-orange-500 transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="text-gray-400 hover:text-orange-500 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.CONTACT} className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} RecipeHub. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
