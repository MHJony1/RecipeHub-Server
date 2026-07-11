import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page not found</p>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Button>
          <a href={ROUTES.HOME}>Go Back Home</a>
        </Button>
      </div>
    </Container>
  );
}
