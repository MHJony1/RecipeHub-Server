import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'RecipeHub - Discover & Share Recipes',
  description: 'Discover amazing recipes and share your culinary creations with the world.',
  keywords: ['recipes', 'cooking', 'food', 'culinary'],
  openGraph: {
    title: 'RecipeHub',
    description: 'Discover amazing recipes and share your culinary creations',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50 font-poppins">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
