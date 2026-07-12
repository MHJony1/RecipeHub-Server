'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    transition: { duration: 0.5 },
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
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'San Francisco, California',
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 border-b border-accent/20">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-text mb-6">
              Get in Touch
            </h1>
            <p className="font-body text-lg text-text-secondary">
              Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <SectionTitle title="Get In Touch With Us" className="mb-16 text-center" />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
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
                  className="bg-background border border-accent/20 p-8 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-text mb-2">{item.title}</h3>
                  <p className="font-body text-text-secondary">{item.content}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>

        {/* Contact Form */}
        <Container>
          <motion.div
            className="max-w-2xl mx-auto bg-background border border-accent/20 p-8 md:p-12 rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-primary/10 border border-primary/30 rounded-xl text-primary"
              >
                <p className="font-body font-medium">Thank you for your message! We'll get back to you soon.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-display font-semibold text-text mb-3">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 font-body text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-display font-semibold text-text mb-3">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 font-body text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block font-display font-semibold text-text mb-3">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  {...register('subject')}
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && (
                  <p className="text-red-500 font-body text-sm mt-2">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block font-display font-semibold text-text mb-3">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  {...register('message')}
                  className={errors.message ? 'border-red-500' : ''}
                />
                {errors.message && (
                  <p className="text-red-500 font-body text-sm mt-2">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-accent/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <SectionTitle title="Frequently Asked Questions" className="text-center mb-16" />
          </motion.div>
          <motion.div
            className="max-w-2xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-background border border-accent/20 rounded-xl hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-display font-bold text-text mb-3">{item.q}</h4>
                <p className="font-body text-text-secondary">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
