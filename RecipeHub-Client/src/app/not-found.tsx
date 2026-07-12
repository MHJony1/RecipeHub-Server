import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-background flex items-center">
      <Container>
        <motion.div
          className="max-w-2xl mx-auto text-center py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Text */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
            animate="animate"
            variants={floatingVariants}
          >
            <div className="text-9xl font-display font-bold bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
              404
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold text-text mb-4"
          >
            Page Not Found
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary mb-2"
          >
            Oops! We couldn't find the recipe you're looking for.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-body text-text-secondary/80 mb-12"
          >
            The page might have been removed, or the URL might be incorrect. Let's get you back on track!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
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
          </motion.div>

          {/* Help Box */}
          <motion.div
            variants={itemVariants}
            className="bg-background border border-accent/20 rounded-2xl p-8 hover:border-primary/40 transition-colors duration-300"
          >
            <p className="font-body text-text-secondary mb-6">
              Still need help? Check out these popular sections:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link
                href={ROUTES.HOME}
                className="font-display font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Home
              </Link>
              <span className="text-accent/30 hidden sm:block">•</span>
              <Link
                href={ROUTES.RECIPES}
                className="font-display font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Recipes
              </Link>
              <span className="text-accent/30 hidden sm:block">•</span>
              <Link
                href={ROUTES.ABOUT}
                className="font-display font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                About
              </Link>
              <span className="text-accent/30 hidden sm:block">•</span>
              <Link
                href={ROUTES.CONTACT}
                className="font-display font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
