import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Terms & Conditions - RecipeHub',
  description: 'RecipeHub terms and conditions of use.',
  openGraph: {
    title: 'Terms & Conditions - RecipeHub',
    description: 'Review our terms of service',
    type: 'website',
  },
};

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing and using the RecipeHub application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: 'Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on RecipeHub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software on RecipeHub
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server
- Violating any applicable laws or regulations related to access to RecipeHub`,
    },
    {
      title: 'Disclaimer',
      content:
        'The materials on RecipeHub are provided on an "as is" basis. RecipeHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: 'Limitations',
      content:
        'In no event shall RecipeHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RecipeHub, even if RecipeHub or a RecipeHub authorized representative has been notified orally or in writing of the possibility of such damage.',
    },
    {
      title: 'Accuracy of Materials',
      content:
        'The materials appearing on RecipeHub could include technical, typographical, or photographic errors. RecipeHub does not warrant that any of the materials on its website are accurate, complete, or current. RecipeHub may make changes to the materials contained on its website at any time without notice.',
    },
    {
      title: 'Links',
      content:
        'RecipeHub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by RecipeHub of the site. Use of any such linked website is at the user\'s own risk.',
    },
    {
      title: 'Modifications',
      content:
        'RecipeHub may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    },
    {
      title: 'User Content',
      content:
        'By submitting recipes or content to RecipeHub, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content. You represent and warrant that you own or have the necessary rights to the content you submit and that submission does not violate any third-party rights.',
    },
    {
      title: 'User Conduct',
      content: `You agree not to:
- Post content that is illegal, defamatory, or violates intellectual property rights
- Harass, abuse, or threaten other users
- Spam or post repetitive content
- Upload viruses or malicious code
- Attempt to gain unauthorized access to the service
- Interfere with the normal operation of the service`,
    },
    {
      title: 'Governing Law',
      content:
        'These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms & Conditions
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

      {/* Additional Info */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your account and access to RecipeHub immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms. Upon termination, your right to use the service will immediately cease.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                Unless otherwise stated, RecipeHub and its suppliers own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this for your personal use subjected to restrictions set in these terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                RecipeHub shall not be liable to you for any damages, losses, or claims arising out of or connected with your use of RecipeHub, including but not limited to direct, indirect, incidental, special, or consequential damages, even if RecipeHub has been advised of the possibility of such damages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at legal@recipehub.com or through our contact form.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
