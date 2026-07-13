'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Mail,
  Sparkles,
  CheckCircle,
  Send,
  Gift,
  Zap,
} from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Zap, text: 'Weekly recipes & cooking tips' },
    { icon: Gift, text: 'Exclusive content & offers' },
    { icon: Sparkles, text: 'New recipe alerts' },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E07A2F] via-[#E9C46A] to-[#F4A261]">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #2D1B0E 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Glow Orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 text-white/10 text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-10 left-10 text-white/10 text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Card className="bg-white/95 backdrop-blur-sm border border-white/30 shadow-2xl shadow-[#E07A2F]/20 p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] shadow-lg shadow-[#E07A2F]/30 mb-4">
                <Mail className="text-white" size={24} />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-[#7A6B5A] text-sm sm:text-base md:text-lg max-w-md mx-auto">
                Get weekly recipes, cooking tips, and exclusive content
                delivered to your inbox.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 sm:gap-2 bg-[#F4A261]/10 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full"
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E07A2F]" />
                    <span className="text-[#2D1B0E] text-[10px] sm:text-xs font-medium whitespace-nowrap">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    required
                    disabled={isLoading}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full border ${
                      error
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                    } bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm sm:text-base`}
                    placeholder="Enter your email address"
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="group bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-semibold shadow-lg shadow-[#E07A2F]/30 hover:shadow-xl hover:shadow-[#E07A2F]/40 hover:scale-105 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base rounded-full flex-shrink-0"
                  isLoading={isLoading}
                  disabled={isLoading || !email}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 rounded-full px-4 sm:px-5 py-2 sm:py-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-700 text-xs sm:text-sm font-medium">
                    Thank you for subscribing! Check your email for
                    confirmation.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Trust Text */}
            <div className="mt-4 sm:mt-5 text-center">
              <p className="text-[#7A6B5A] text-[10px] sm:text-xs">
                💌 No spam, unsubscribe anytime. Join 10,000+ happy subscribers.
              </p>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};
