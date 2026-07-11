'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Simulate newsletter subscription
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
      <Container>
        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Mail className="text-orange-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600">
                Get weekly recipes, cooking tips, and exclusive content delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading || !email}
              >
                {isSubmitted ? '✓ Subscribed!' : 'Subscribe Now'}
              </Button>
            </form>

            {isSubmitted && (
              <motion.p
                className="text-center text-green-600 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Thank you for subscribing! Check your email for confirmation.
              </motion.p>
            )}
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};
