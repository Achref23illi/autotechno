// app/admin/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, error: authError } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (authError) {
      setError('Invalid admin credentials');
    }
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Log the email and password to verify they match what we're sending
    console.log('Logging in with:', { email, password });

    setIsLoading(true);
    setError('');

    try {
      // Note for testing: admin@autotechno.com / admin123
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      setError('Invalid admin credentials. Use admin@autotechno.com / admin123');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the administration dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4 px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-800">
            <p className="text-sm font-medium">Admin Credentials for Testing:</p>
            <ul className="text-sm list-disc pl-5 mt-1">
              <li>Email: admin@autotechno.com</li>
              <li>Password: admin123</li>
            </ul>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Admin email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-yellow-400' : 'bg-yellow-600 hover:bg-yellow-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Sign in</>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}