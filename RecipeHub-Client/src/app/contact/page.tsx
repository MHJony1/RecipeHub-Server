'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <Container>
          <div>
            <SectionTitle title="Get In Touch With Us" className="mb-16 text-center" />
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
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
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-500 transition-colors text-center">
                    <Icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-200">
            {submitted && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                <p className="font-medium">Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  {...register('subject')}
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
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
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle title="Frequently Asked Questions" className="text-center mb-16" />
          <div className="max-w-2xl mx-auto space-y-6">
            {[
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
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
