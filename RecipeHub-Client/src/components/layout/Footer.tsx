'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Envelope, MapPin, ArrowUp, LogoFacebook } from '@gravity-ui/icons';
import { Phone } from 'lucide-react';
import { FaSquareXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      transition: { duration: 0.4, ease: 'easeOut' },
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
    {
      icon: Envelope,
      label: 'contact@recipehub.com',
      href: 'mailto:contact@recipehub.com',
    },
    { icon: Phone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, label: 'San Francisco, CA', href: '#' },
  ];

  const socialLinks = [
    {
      icon: LogoFacebook,
      label: 'Facebook',
      href: '#',
      color: 'hover:text-[#1877F2]',
    },
    {
      icon: FaSquareXTwitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-[#000000]',
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      href: '#',
      color: 'hover:text-[#E4405F]',
    },
    {
      icon: FaYoutube,
      label: 'YouTube',
      href: '#',
      color: 'hover:text-[#FF0000]',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#FFFBF7] to-[#FDF5EC] border-t border-[#F4A261]/15 mt-12 sm:mt-16 md:mt-20">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E07A2F] to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 text-[#E9C46A]/10 text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 left-10 text-[#F4A261]/10 text-6xl font-serif hidden lg:block">
        ✦
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #2D1B0E 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative z-10 py-8 md:py-10 lg:py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href={ROUTES.HOME} className="inline-block mb-3">
              <h3 className="font-display text-xl md:text-2xl font-bold">
                <span className="text-[#2D1B0E]">Recipe</span>
                <span className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] bg-clip-text text-transparent">
                  Hub
                </span>
              </h3>
            </Link>
            <p className="text-[#7A6B5A] text-sm leading-relaxed max-w-sm mb-4">
              Discover amazing recipes and share your culinary creations with a
              passionate community of food lovers.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-center gap-3 text-[#7A6B5A] hover:text-[#E07A2F] transition-all duration-300 group text-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F4A261]/10 flex items-center justify-center group-hover:bg-[#F4A261]/20 transition-all duration-300 flex-shrink-0">
                      <Icon
                        width={16}
                        height={16}
                        className="text-[#E9C46A] group-hover:text-[#E07A2F] transition-colors"
                      />
                    </div>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-base font-bold text-[#2D1B0E] mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-6 h-0.5 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#7A6B5A] hover:text-[#E07A2F] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#E07A2F] group-hover:w-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-base font-bold text-[#2D1B0E] mb-4 relative inline-block">
              Support
              <span className="absolute -bottom-1.5 left-0 w-6 h-0.5 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#7A6B5A] hover:text-[#E07A2F] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#E07A2F] group-hover:w-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-base font-bold text-[#2D1B0E] mb-4 relative inline-block">
              Follow Us
              <span className="absolute -bottom-1.5 left-0 w-6 h-0.5 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] rounded-full" />
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-[#F4A261]/8 border border-[#F4A261]/15 flex items-center justify-center text-[#7A6B5A] ${social.color} hover:bg-[#F4A261]/20 hover:border-[#F4A261]/30 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <Icon width={18} height={18} />
                  </a>
                );
              })}
            </div>

            {/* Social Proof Text */}
            <p className="text-[#7A6B5A]/50 text-[10px] mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A2F]" />
              Join 10,000+ food lovers
            </p>
          </motion.div>
        </motion.div>

        {/* Divider with Gradient */}
        <div className="relative mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#F4A261]/25 to-transparent" />
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-[#7A6B5A] text-xs">
            &copy; {currentYear}{' '}
            <span className="text-[#E07A2F] font-medium">RecipeHub</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/privacy"
              className="text-[#7A6B5A] hover:text-[#E07A2F] transition-colors duration-300"
            >
              Privacy
            </Link>
            <span className="text-[#F4A261]/20">|</span>
            <Link
              href="/terms"
              className="text-[#7A6B5A] hover:text-[#E07A2F] transition-colors duration-300"
            >
              Terms
            </Link>
            <span className="text-[#F4A261]/20">|</span>
            <Link
              href={ROUTES.CONTACT}
              className="text-[#7A6B5A] hover:text-[#E07A2F] transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </Container>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-4 right-4 md:right-6 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/30 hover:shadow-lg hover:shadow-[#E07A2F]/40 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Scroll to top"
      >
        <ArrowUp
          width={16}
          height={16}
          className="group-hover:-translate-y-0.5 transition-transform"
        />
      </button>
    </footer>
  );
};
