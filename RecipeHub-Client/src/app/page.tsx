import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

export default function Home() {
  return (
    <Container className="py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">🍽️ RecipeHub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing recipes and share your culinary creations with the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Button>
            <a href={ROUTES.RECIPES}>Explore Recipes</a>
          </Button>
          <Button variant="secondary">
            <a href={ROUTES.REGISTER}>Get Started</a>
          </Button>
        </div>
      </div>
    </Container>
  );
}
