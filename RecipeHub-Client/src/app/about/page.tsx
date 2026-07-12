import type { Metadata } from 'next';
import { motion } from 'framer-motion';
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

export default function AboutPage() {
  const features = [
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
  ];

  const techStack = [
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
  ];

  const featuresList = [
    'Powerful recipe search and filtering',
    'Category organization and sorting',
    'User authentication and profiles',
    'Create and manage personal recipes',
    'Beautiful recipe details pages',
    'Responsive mobile design',
    'Real-time statistics and analytics',
    'Professional dashboard',
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
              About RecipeHub
            </h1>
            <p className="font-body text-lg text-text-secondary">
              A modern platform connecting food lovers worldwide to discover, share, and celebrate culinary creativity.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <Container>
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionTitle title="Our Mission" />
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                We believe cooking should be accessible, enjoyable, and inspiring for everyone. RecipeHub was created to solve a simple problem: finding quality recipes without the clutter of advertisements and inconsistent layouts.
              </p>
              <p className="font-body text-text-secondary text-lg leading-relaxed">
                Our mission is to provide a clean, modern platform where home cooks, students, and professional chefs can discover amazing recipes and share their culinary creations with a supportive community.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 rounded-3xl p-12 flex items-center justify-center border border-accent/20"
            >
              <div className="text-center">
                <div className="text-7xl mb-4">🍽️</div>
                <p className="font-display text-xl font-bold text-primary">Connecting Food Lovers</p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 border-y border-accent/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <SectionTitle title="Why Choose RecipeHub" className="text-center mb-16" />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-background border border-accent/20 p-8 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-display text-xl font-bold text-text mb-3">{item.title}</h3>
                  <p className="font-body text-text-secondary">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <SectionTitle title="Technology Stack" className="text-center mb-16" />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((stack, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-background border border-accent/20 p-8 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-display text-2xl font-bold text-primary mb-6">{stack.category}</h3>
                <ul className="space-y-3">
                  {stack.tech.map((tech, i) => (
                    <li key={i} className="flex items-center font-body text-text-secondary">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 border-y border-accent/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <SectionTitle title="Features" className="text-center mb-16" />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuresList.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-background text-sm font-bold">✓</span>
                </div>
                <p className="font-body text-text-secondary">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Developer Info */}
      <section className="py-20">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <SectionTitle title="About the Developer" />
            </motion.div>
            <motion.p variants={itemVariants} className="font-body text-text-secondary text-lg leading-relaxed mb-8">
              RecipeHub is a full-stack portfolio project showcasing modern web development practices, clean architecture, and professional UI/UX design. Built with a focus on code quality, security, and user experience.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
              <Link href={ROUTES.HOME}>
                <Button>Explore Recipes</Button>
              </Link>
              <Link href={ROUTES.CONTACT}>
                <Button variant="secondary">Get in Touch</Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
