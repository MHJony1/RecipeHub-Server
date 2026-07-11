import { Container } from '@/components/common/Container';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Container>
        <div className="flex flex-col items-center justify-center gap-8">
          <LoadingSpinner />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading</h2>
            <p className="text-gray-600">Please wait while we prepare your content...</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
