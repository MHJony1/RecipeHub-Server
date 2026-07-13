'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { useAuth } from '@/providers/AuthContext';
import { ROUTES } from '@/constants';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowRight,
  ChefHat,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Registration successful! 🎉');
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A261]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E9C46A]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#F4A261]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#E9C46A]/5 rounded-full" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white border border-[#F4A261]/10 rounded-3xl shadow-2xl shadow-[#E07A2F]/8 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] shadow-lg shadow-[#E07A2F]/25 mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2D1B0E]">
                Create Account
              </h1>
              <p className="text-[#7A6B5A] text-sm mt-1.5 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A2F]" />
                Join our community of food lovers
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                  Full Name <span className="text-[#E07A2F]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A]" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.name
                        ? 'border-red-400'
                        : 'border-[#F4A261]/25 focus:border-[#E07A2F]'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/10 transition-all duration-300 text-sm placeholder:text-[#7A6B5A]/50`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                  Email Address <span className="text-[#E07A2F]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A]" />
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.email
                        ? 'border-red-400'
                        : 'border-[#F4A261]/25 focus:border-[#E07A2F]'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/10 transition-all duration-300 text-sm placeholder:text-[#7A6B5A]/50`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                  Password <span className="text-[#E07A2F]">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                      errors.password
                        ? 'border-red-400'
                        : 'border-[#F4A261]/25 focus:border-[#E07A2F]'
                    } bg-white focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/10 transition-all duration-300 text-sm placeholder:text-[#7A6B5A]/50`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6B5A] hover:text-[#2D1B0E] transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <CheckCircle className="w-3 h-3 text-[#52B788]" />
                  <p className="text-[#7A6B5A] text-xs">
                    Must be at least 8 characters
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-semibold shadow-md shadow-[#E07A2F]/20 hover:shadow-lg hover:shadow-[#E07A2F]/30 hover:scale-[1.02] transition-all duration-300 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F4A261]/15" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[#7A6B5A] text-xs">or</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-[#7A6B5A] text-sm">
              Already have an account?{' '}
              <Link
                href={ROUTES.LOGIN}
                className="text-[#E07A2F] font-semibold hover:text-[#E07A2F]/80 hover:underline transition-all duration-300"
              >
                Sign In
              </Link>
            </p>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-[#F4A261]/10">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
                <span className="text-[#7A6B5A] text-xs">Free Forever</span>
              </div>
              <div className="w-px h-3 bg-[#F4A261]/15" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E07A2F]" />
                <span className="text-[#7A6B5A] text-xs">No Spam</span>
              </div>
              <div className="w-px h-3 bg-[#F4A261]/15" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E9C46A]" />
                <span className="text-[#7A6B5A] text-xs">Secure</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}
