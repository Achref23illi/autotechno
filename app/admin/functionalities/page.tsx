'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Types for functionality categories and items
interface FunctionalityItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'coming-soon' | 'beta' | 'deprecated';
  path?: string;
  comingSoonDate?: string;
}

interface FunctionalityCategory {
  id: string;
  name: string;
  description: string;
  items: FunctionalityItem[];
}

export default function FunctionalitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Define functionalities with categories
  const functionalityCategories: FunctionalityCategory[] = [
    {
      id: 'file-management',
      name: 'File Management',
      description: 'Tools for managing ECU files, tuning records, and file operations',
      items: [
        {
          id: 'ecu-file-decrypt',
          name: 'ECU File Decryption',
          description: 'Decrypt ECU files using token-based system',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          ),
          status: 'active',
          path: '/admin/functionalities/ecu-decrypt',
        },
        {
          id: 'file-batch-processor',
          name: 'Batch File Processor',
          description: 'Process multiple files with the same operations at once',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q3 2023',
        },
        {
          id: 'file-analyzer',
          name: 'File Analyzer',
          description: 'Analyze ECU files for content, structure, and compatibility',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          ),
          status: 'beta',
          path: '/admin/functionalities/file-analyzer',
        },
      ],
    },
    {
      id: 'customer-tools',
      name: 'Customer Tools',
      description: 'Tools for managing customers, communication, and CRM features',
      items: [
        {
          id: 'bulk-email',
          name: 'Bulk Email Sender',
          description: 'Send customized emails to multiple customers at once',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          status: 'active',
          path: '/admin/functionalities/bulk-email',
        },
        {
          id: 'customer-segmentation',
          name: 'Customer Segmentation',
          description: 'Group customers based on purchase history and behavior',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q4 2023',
        },
        {
          id: 'customer-feedback',
          name: 'Customer Feedback Manager',
          description: 'Collect and analyze customer feedback and reviews',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q2 2023',
        },
      ],
    },
    {
      id: 'token-management',
      name: 'Token Management',
      description: 'Tools for managing the token system, payments, and pricing',
      items: [
        {
          id: 'token-analytics',
          name: 'Token Analytics',
          description: 'Analyze token usage, sales, and customer behavior',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          status: 'active',
          path: '/admin/functionalities/token-analytics',
        },
        {
          id: 'custom-pricing',
          name: 'Custom Pricing Engine',
          description: 'Create custom pricing rules and promotions',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q1 2024',
        },
        {
          id: 'subscription-manager',
          name: 'Subscription Manager',
          description: 'Manage recurring token subscriptions and memberships',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          ),
          status: 'beta',
          path: '/admin/functionalities/subscription-manager',
        },
      ],
    },
    {
      id: 'data-tools',
      name: 'Data & Reports',
      description: 'Advanced data analysis, reporting, and business intelligence tools',
      items: [
        {
          id: 'custom-reports',
          name: 'Custom Report Builder',
          description: 'Create custom reports using various data sources',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q3 2023',
        },
        {
          id: 'data-export',
          name: 'Data Export Tools',
          description: 'Export data in various formats (CSV, Excel, PDF)',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          status: 'active',
          path: '/admin/functionalities/data-export',
        },
        {
          id: 'sales-forecasting',
          name: 'Sales Forecasting',
          description: 'Predict future sales based on historical data',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q2 2024',
        },
      ],
    },
    {
      id: 'system-tools',
      name: 'System Tools',
      description: 'System maintenance, backup, and administration tools',
      items: [
        {
          id: 'system-backup',
          name: 'System Backup & Restore',
          description: 'Create and manage system backups',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          ),
          status: 'active',
          path: '/admin/functionalities/system-backup',
        },
        {
          id: 'error-logs',
          name: 'Error Log Viewer',
          description: 'View and analyze system error logs',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          status: 'beta',
          path: '/admin/functionalities/error-logs',
        },
        {
          id: 'system-health',
          name: 'System Health Monitor',
          description: 'Monitor system performance and health metrics',
          icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          status: 'coming-soon',
          comingSoonDate: 'Q4 2023',
        },
      ],
    },
  ];

  // Filter functionalities based on search term, category and status
  const getFilteredFunctionalities = (): FunctionalityCategory[] => {
    // Start with all categories
    let filteredCategories = [...functionalityCategories];

    // Filter by category if selected
    if (selectedCategory) {
      filteredCategories = filteredCategories.filter(
        (category) => category.id === selectedCategory
      );
    }

    // Filter categories with items that match the search term and status
    filteredCategories = filteredCategories.map((category) => {
      // Filter items by search term
      let filteredItems = category.items.filter((item) =>
        searchTerm
          ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );

      // Filter items by status
      if (selectedStatus) {
        filteredItems = filteredItems.filter((item) => item.status === selectedStatus);
      }

      // Return category with filtered items
      return { ...category, items: filteredItems };
    });

    // Only keep categories that have items after filtering
    return filteredCategories.filter((category) => category.items.length > 0);
  };

  const filteredFunctionalities = getFilteredFunctionalities();

  // Get status badge styles
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'coming-soon':
        return 'bg-blue-100 text-blue-800';
      case 'beta':
        return 'bg-purple-100 text-purple-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Functionalities</h1>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Request New Functionality
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-700">
          Access and manage system functionalities and tools.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search functionality..."
              className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {functionalityCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sm:col-span-1">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="beta">Beta</option>
              <option value="coming-soon">Coming Soon</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-400 mr-2"></span>
          <span className="text-sm text-gray-600">Active</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-purple-400 mr-2"></span>
          <span className="text-sm text-gray-600">Beta</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-400 mr-2"></span>
          <span className="text-sm text-gray-600">Coming Soon</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-red-400 mr-2"></span>
          <span className="text-sm text-gray-600">Deprecated</span>
        </div>
      </div>

      {/* Functionality Categories */}
      <div className="mt-6 space-y-8">
        {filteredFunctionalities.length > 0 ? (
          filteredFunctionalities.map((category) => (
            <div key={category.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-yellow-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{category.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {category.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {category.items.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow"
                  >
                    {item.path ? (
                      <Link href={item.path} className="block p-4">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 p-2 rounded-md ${
                            item.status === 'active' ? 'bg-green-100' :
                            item.status === 'beta' ? 'bg-purple-100' :
                            item.status === 'coming-soon' ? 'bg-blue-100' : 'bg-red-100'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyles(item.status)}`}>
                                {item.status === 'coming-soon' && item.comingSoonDate
                                  ? `Coming ${item.comingSoonDate}`
                                  : item.status.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 p-2 rounded-md ${
                            item.status === 'active' ? 'bg-green-100' :
                            item.status === 'beta' ? 'bg-purple-100' :
                            item.status === 'coming-soon' ? 'bg-blue-100' : 'bg-red-100'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyles(item.status)}`}>
                                {item.status === 'coming-soon' && item.comingSoonDate
                                  ? `Coming ${item.comingSoonDate}`
                                  : item.status.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white shadow rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No functionalities found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedStatus(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Request New Functionality Section */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Need a new functionality?</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Can't find what you're looking for? Submit a request for a new functionality or feature.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Request New Functionality
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}