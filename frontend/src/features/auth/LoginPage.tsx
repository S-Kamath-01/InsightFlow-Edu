/**
 * Login page component
 * Provides authentication form with role-based login
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from './AuthProvider';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import type { ApiResponse, LoginRequest, LoginResponse } from '@/api/types';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Login page with form validation and error handling
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axiosClient.post<ApiResponse<LoginResponse>>(
        API_ENDPOINTS.LOGIN,
        data as LoginRequest
      );

      const { token, role, user } = response.data.data;
      login(token, user, role);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick login helper for demo
  const quickLogin = (username: string, password: string) => {
    handleSubmit(() => onSubmit({ username, password }))();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-900">InsightFlow EDU</h1>
          <p className="mt-2 text-sm text-gray-600">
            Student Performance Analytics & Risk Detection
          </p>
        </div>

        {/* Login Card */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

          {errorMessage && (
            <div
              className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-md text-danger-700 text-sm"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className={`input ${errors.username ? 'border-danger-500' : ''}`}
                placeholder="Enter your username"
                {...register('username')}
                autoComplete="username"
              />
              {errors.username && (
                <p className="error-text">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`input ${errors.password ? 'border-danger-500' : ''}`}
                placeholder="Enter your password"
                {...register('password')}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="error-text">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">
              Quick demo login:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => quickLogin('faculty', 'faculty123')}
                className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => quickLogin('admin', 'admin123')}
                className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => quickLogin('it', 'it123')}
                className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                IT
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          DBMS + Software Engineering Mini Project © 2025
        </p>
      </div>
    </div>
  );
};
