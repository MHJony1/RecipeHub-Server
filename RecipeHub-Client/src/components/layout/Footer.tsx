'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const links = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Recipes', href: ROUTES.RECIPES },
    { label: 'About', href: ROUTES.ABOUT },
  ];

  const supportLinks = [
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'contact@recipehub.com' },
    { icon: Phone, label: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'San Francisco, CA' },
  ];

  return (
    <footer className="bg-background mt-24 border-t border-accent/20">
      <Container className="py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-primary mb-4">🍽️ RecipeHub</h3>
            <p className="font-body text-text-secondary leading-relaxed mb-6">
              Discover amazing recipes and share your culinary creations with a passionate community of food lovers.
            </p>
            <div className="space-y-3">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-text-secondary">
                    <Icon size={18} className="text-secondary flex-shrink-0" />
                    <span className="font-body text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg font-bold text-text mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg font-bold text-text mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg font-bold text-text mb-6">Follow Us</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="font-body text-text-secondary hover:text-primary transition-colors duration-300 flex items-center"
              >
                Facebook
              </a>
              <a
                href="#"
                className="font-body text-text-secondary hover:text-primary transition-colors duration-300 flex items-center"
              >
                Twitter
              </a>
              <a
                href="#"
                className="font-body text-text-secondary hover:text-primary transition-colors duration-300 flex items-center"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-accent/20 mb-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-body text-sm text-text-secondary">
            &copy; {currentYear} RecipeHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-body text-text-secondary">
            <a href="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors duration-300">
              Terms
            </a>
            <a href={ROUTES.CONTACT} className="hover:text-primary transition-colors duration-300">
              Contact
            </a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};
