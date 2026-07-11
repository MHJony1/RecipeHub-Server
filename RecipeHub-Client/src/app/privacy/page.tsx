import type { Metadata } from 'next';
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: January 2025
            </p>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Sections */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                RecipeHub will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Request correction of your data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Withdraw consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service may contain links to third-party websites and applications that are not operated by us. This Privacy Policy applies only to information we collect, and we are not responsible for third-party privacy practices. We encourage you to review the privacy policies of any third-party services before providing your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
