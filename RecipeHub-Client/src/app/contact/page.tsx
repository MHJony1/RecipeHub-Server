'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Send,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ROUTES } from '@/constants';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Form submitted:', data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@recipehub.com',
      gradient: 'from-[#E07A2F] to-[#F4A261]',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      gradient: 'from-[#E9C46A] to-[#F4A261]',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'San Francisco, California',
      gradient: 'from-[#E07A2F] to-[#E9C46A]',
    },
  ];

  const faqItems = [
    {
      q: 'How quickly will I receive a response?',
      a: 'We typically respond to inquiries within 24-48 hours during business days.',
    },
    {
      q: 'Can I report a bug or issue?',
      a: 'Yes, please include as much detail as possible in your message, including steps to reproduce the issue.',
    },
    {
      q: 'Do you accept partnership inquiries?',
      a: 'We welcome partnership and collaboration opportunities. Feel free to reach out with your proposal.',
    },
    {
      q: 'Is my personal data safe?',
      a: 'Your data is secure and will never be shared with third parties. We follow strict privacy standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#F4A261]/5 rounded-full" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2F]/10 to-[#E9C46A]/10 border border-[#E07A2F]/20 rounded-full px-4 py-1.5 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-xs font-medium tracking-[0.15em] uppercase">
                Contact Us
              </span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D1B0E] mb-4">
              Get in{' '}
              <span className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-[#7A6B5A] text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-12">
        <Container>
          <motion.div
            className="grid sm:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white border border-[#F4A261]/10 p-6 sm:p-8 rounded-2xl hover:border-[#E07A2F]/30 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#E07A2F]/20`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-[#2D1B0E] text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#7A6B5A] text-sm">{item.content}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2D1B0E] mb-2">
                Send Us a <span className="text-[#E07A2F]">Message</span>
              </h2>
              <p className="text-[#7A6B5A] text-sm">
                We'll get back to you within 24-48 hours
              </p>
            </div>

            <div className="bg-white border border-[#F4A261]/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-[#F4A261]/5">
              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-emerald-700 font-medium text-sm">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-medium text-[#2D1B0E] text-sm mb-1.5"
                  >
                    Full Name <span className="text-[#E07A2F]">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register('name')}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                    } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-[#2D1B0E] text-sm mb-1.5"
                  >
                    Email Address <span className="text-[#E07A2F]">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                    } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-medium text-[#2D1B0E] text-sm mb-1.5"
                  >
                    Subject <span className="text-[#E07A2F]">*</span>
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    {...register('subject')}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.subject
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                    } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-medium text-[#2D1B0E] text-sm mb-1.5"
                  >
                    Message <span className="text-[#E07A2F]">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    {...register('message')}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                    } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-[1.02] transition-all duration-300 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-y border-[#F4A261]/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2D1B0E]">
              Frequently Asked <span className="text-[#E07A2F]">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#FFFBF7] border border-[#F4A261]/10 p-5 sm:p-6 rounded-xl hover:border-[#E07A2F]/30 hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-display font-bold text-[#2D1B0E] text-sm sm:text-base mb-2">
                  {item.q}
                </h4>
                <p className="text-[#7A6B5A] text-sm leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFBF7] to-[#FDF5EC] border border-[#F4A261]/20 shadow-xl shadow-[#F4A261]/5 p-8 sm:p-12 text-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A261]/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E9C46A]/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2D1B0E] mb-3">
                Ready to Start Cooking?
              </h2>
              <p className="text-[#7A6B5A] text-sm sm:text-base max-w-lg mx-auto mb-6">
                Join thousands of home cooks and share your culinary creations
                with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={ROUTES.REGISTER}>
                  <Button className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 px-6 py-2.5 text-sm">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href={ROUTES.RECIPES}>
                  <Button
                    variant="secondary"
                    className="border-[#E07A2F]/30 text-[#E07A2F] hover:bg-[#F4A261]/10 text-sm"
                  >
                    Explore Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
