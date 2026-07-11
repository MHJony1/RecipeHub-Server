import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Code2, Users, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About RecipeHub',
  description: 'Learn about RecipeHub, a modern recipe sharing platform built with cutting-edge technologies.',
  openGraph: {
    title: 'About RecipeHub',
    description: 'Learn about our mission to connect food lovers worldwide',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About RecipeHub
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A modern platform connecting food lovers worldwide to discover, share, and celebrate culinary creativity.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Our Mission" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe cooking should be accessible, enjoyable, and inspiring for everyone. RecipeHub was created to solve a simple problem: finding quality recipes without the clutter of advertisements and inconsistent layouts.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to provide a clean, modern platform where home cooks, students, and professional chefs can discover amazing recipes and share their culinary creations with a supportive community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-600 font-medium">Connecting Food Lovers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle title="Why Choose RecipeHub" className="text-center mb-16" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code2,
                title: 'Modern Design',
                description: 'Clean, intuitive interface built with latest web technologies',
              },
              {
                icon: Users,
                title: 'Community Driven',
                description: 'Share your recipes and connect with food enthusiasts worldwide',
              },
              {
                icon: Zap,
                title: 'Fast & Efficient',
                description: 'Lightning-fast search, filters, and seamless user experience',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your recipes and data are protected with modern security standards',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <Container>
          <SectionTitle title="Technology Stack" className="text-center mb-16" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Frontend',
                tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
              },
              {
                category: 'Backend',
                tech: ['Express.js', 'Node.js', 'TypeScript', 'MongoDB', 'JWT Auth'],
              },
              {
                category: 'Deployment',
                tech: ['Vercel', 'Render', 'MongoDB Atlas', 'Docker', 'CI/CD Pipeline'],
              },
            ].map((stack, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{stack.category}</h3>
                <ul className="space-y-3">
                  {stack.tech.map((tech, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle title="Features" className="text-center mb-16" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              'Powerful recipe search and filtering',
              'Category organization and sorting',
              'User authentication and profiles',
              'Create and manage personal recipes',
              'Beautiful recipe details pages',
              'Responsive mobile design',
              'Real-time statistics and analytics',
              'Professional dashboard',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Developer Info */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle title="About the Developer" />
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              RecipeHub is a full-stack portfolio project showcasing modern web development practices, clean architecture, and professional UI/UX design. Built with a focus on code quality, security, and user experience.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={ROUTES.HOME}>
                <Button>Explore Recipes</Button>
              </Link>
              <Link href={ROUTES.CONTACT}>
                <Button variant="secondary">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
