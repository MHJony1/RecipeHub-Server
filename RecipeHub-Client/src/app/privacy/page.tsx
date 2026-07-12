import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Privacy Policy - RecipeHub',
  description: 'RecipeHub privacy policy and data protection information.',
  openGraph: {
    title: 'Privacy Policy - RecipeHub',
    description: 'Learn how we protect your data',
    type: 'website',
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

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Introduction',
      content:
        'RecipeHub ("we", "our", or "us") operates the RecipeHub application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.',
    },
    {
      title: 'Information Collection and Use',
      content: `We collect several different types of information for various purposes to provide and improve our service to you.

Types of Data Collected:
- Personal Data: Email address, name, password, profile information
- Usage Data: Browser type, IP address, pages visited, time spent, referring pages
- Cookies: We use cookies to enhance user experience and track usage patterns`,
    },
    {
      title: 'Use of Data',
      content: `RecipeHub uses the collected data for various purposes:
- To provide and maintain our service
- To notify you about changes to our service
- To allow you to participate in interactive features
- To provide customer support
- To gather analysis or valuable information so we can improve our service
- To monitor the usage of our service
- To detect, prevent and address technical issues`,
    },
    {
      title: 'Security of Data',
      content:
        'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.',
    },
    {
      title: 'Changes to This Privacy Policy',
      content:
        'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have any questions about this Privacy Policy, please contact us at privacy@recipehub.com or through our contact form.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 border-b border-accent/20">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-text mb-6">
              Privacy Policy
            </h1>
            <p className="font-body text-text-secondary">
              Last updated: January 2025
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold text-text mb-4 pb-3 border-b border-accent/20">
                  {section.title}
                </h2>
                <div className="font-body text-text-secondary whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Sections */}
      <section className="py-20 border-t border-accent/20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-text mb-4 pb-3 border-b border-accent/20">Data Retention</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                RecipeHub will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-2xl font-bold text-text mb-4 pb-3 border-b border-accent/20">Your Rights</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 font-body text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 mt-1">•</span>
                  <span>Access your personal data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 mt-1">•</span>
                  <span>Request correction of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 mt-1">•</span>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 mt-1">•</span>
                  <span>Object to processing of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 mt-1">•</span>
                  <span>Request restriction of processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 mt-1">•</span>
                  <span>Withdraw consent</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold text-text mb-4 pb-3 border-b border-accent/20">Third-Party Services</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                Our service may contain links to third-party websites and applications that are not operated by us. This Privacy Policy applies only to information we collect, and we are not responsible for third-party privacy practices. We encourage you to review the privacy policies of any third-party services before providing your personal information.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-bold text-text mb-4 pb-3 border-b border-accent/20">Cookies</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
