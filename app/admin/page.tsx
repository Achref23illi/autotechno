// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import DashboardLayout from './components/DashboardLayout';

// Define some fake data for our dashboard
const dashboardData = {
  kpis: [
    { id: 1, name: 'Total Customers', value: 256, change: '+12%', trend: 'up' },
    { id: 2, name: 'Monthly Revenue', value: '$5,234', change: '+23%', trend: 'up' },
    { id: 3, name: 'Active Tokens', value: '1,432', change: '+8%', trend: 'up' },
    { id: 4, name: 'Files Processed', value: '328', change: '+15%', trend: 'up' },
  ],
  recentFiles: [
    { id: 1, name: 'BMW_E46_2.0D.bin', type: 'ECU File', status: 'Processed', customer: 'John Doe', date: '2023-05-10' },
    { id: 2, name: 'Mercedes_W204_ECU.hex', type: 'ECU File', status: 'Processing', customer: 'Sara Smith', date: '2023-05-09' },
    { id: 3, name: 'Audi_A4_B8_Airbag.bin', type: 'Airbag Reset', status: 'Processed', customer: 'Mike Johnson', date: '2023-05-08' },
    { id: 4, name: 'VW_Golf_2.0TDI.bin', type: 'ECU File', status: 'Failed', customer: 'Emma Wilson', date: '2023-05-07' },
    { id: 5, name: 'Ford_Focus_Dashboard.hex', type: 'Dashboard', status: 'Processed', customer: 'Alex Brown', date: '2023-05-06' },
  ],
  recentCustomers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', tokens: 25, lastActive: '2023-05-10' },
    { id: 2, name: 'Sara Smith', email: 'sara@example.com', tokens: 42, lastActive: '2023-05-09' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', tokens: 18, lastActive: '2023-05-08' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', tokens: 36, lastActive: '2023-05-06' },
  ],
};

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="pb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user.name}! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {dashboardData.kpis.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">{kpi.name}</h2>
              <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Files */}
        <motion.div
          className="bg-white shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Recent Files</h3>
          </div>
          <div className="px-4 py-3">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.recentFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{file.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{file.type}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            file.status === 'Processed'
                              ? 'bg-green-100 text-green-800'
                              : file.status === 'Processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {file.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{file.customer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-center">
              <button className="text-sm text-yellow-600 hover:text-yellow-800 font-medium">View All Files</button>
            </div>
          </div>
        </motion.div>

        {/* Recent Customers */}
        <motion.div
          className="bg-white shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Recent Customers</h3>
          </div>
          <div className="px-4 py-3">
            <ul className="divide-y divide-gray-200">
              {dashboardData.recentCustomers.map((customer) => (
                <li key={customer.id} className="py-3 flex items-center hover:bg-gray-50 px-2 rounded-md">
                  <div className="w-10 h-10 bg-yellow-200 text-yellow-700 rounded-full flex items-center justify-center font-bold">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-gray-800">{customer.tokens} tokens</span>
                    <p className="text-xs text-gray-500">Last active: {customer.lastActive}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-center">
              <button className="text-sm text-yellow-600 hover:text-yellow-800 font-medium">View All Customers</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="mt-8 bg-white shadow-md rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="h-8 w-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Add New File</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="h-8 w-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Add Customer</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="h-8 w-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Manage Tokens</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="h-8 w-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">View Reports</span>
          </button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}