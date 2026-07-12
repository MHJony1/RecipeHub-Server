'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { useAuth } from '@/providers/AuthContext';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123',
};

export default function LoginPage() {
  const router = useRouter();
  const { login: loginUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await loginUser(data.email, data.password);
      toast.success('Login successful!');
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    toast.success('Demo credentials filled');
  };

  return (
    <Container className="py-20">
      <div className="max-w-md mx-auto">
        <Card>
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

            <Button type="button" variant="secondary" onClick={fillDemoCredentials} className="w-full">
              Demo Login
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href={ROUTES.REGISTER} className="text-orange-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </Container>
  );
}
