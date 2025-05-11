'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for charts
const generateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  // Create last 12 months labels (including current)
  const labels = Array(12).fill(0).map((_, i) => {
    const monthIndex = (currentMonth - 11 + i + 12) % 12;
    return months[monthIndex];
  });
  
  // Generate some revenue data with growth trend
  const revenueData = Array(12).fill(0).map((_, i) => {
    const base = 1000 + (i * 200);
    return base + Math.floor(Math.random() * 500);
  });
  
  // Generate some sales count data
  const salesData = Array(12).fill(0).map((_, i) => {
    const base = 30 + (i * 5);
    return base + Math.floor(Math.random() * 15);
  });
  
  // Generate some customer acquisition data
  const customerData = Array(12).fill(0).map((_, i) => {
    const base = 10 + (i * 2);
    return base + Math.floor(Math.random() * 8);
  });
  
  return { labels, revenueData, salesData, customerData };
};

const generateCategoryData = () => {
  const categories = ['Performance', 'Economy', 'Emissions', 'Transmission', 'Diagnostics', 'Custom'];
  
  const data = categories.map(() => Math.floor(Math.random() * 30) + 10);
  
  return { categories, data };
};

const generateBrandData = () => {
  const brands = ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Volvo', 'Others'];
  
  const data = brands.map(() => Math.floor(Math.random() * 25) + 5);
  
  return { brands, data };
};

const generateDeviceData = () => {
  return {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    data: [65, 30, 5],
  };
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('year');
  const [chartView, setChartView] = useState('revenue');
  
  const monthlyData = generateMonthlyData();
  const categoryData = generateCategoryData();
  const brandData = generateBrandData();
  const deviceData = generateDeviceData();
  
  // Overview metrics
  const totalRevenue = monthlyData.revenueData.reduce((sum, val) => sum + val, 0);
  const totalSales = monthlyData.salesData.reduce((sum, val) => sum + val, 0);
  const totalCustomers = monthlyData.customerData.reduce((sum, val) => sum + val, 0);
  const averageOrderValue = Math.round(totalRevenue / totalSales);
  
  // Data for line chart
  const lineChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Revenue (€)',
        data: monthlyData.revenueData,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Sales Count',
        data: monthlyData.salesData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3,
      },
      {
        label: 'New Customers',
        data: monthlyData.customerData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  // Data for category bar chart
  const categoryChartData = {
    labels: categoryData.categories,
    datasets: [
      {
        label: 'Sales by Category',
        data: categoryData.data,
        backgroundColor: [
          'rgba(234, 179, 8, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(244, 63, 94, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Data for brand pie chart
  const brandChartData = {
    labels: brandData.brands,
    datasets: [
      {
        label: 'Sales by Brand',
        data: brandData.data,
        backgroundColor: [
          'rgba(234, 179, 8, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(244, 63, 94, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Data for device pie chart
  const deviceChartData = {
    labels: deviceData.labels,
    datasets: [
      {
        label: 'Users by Device',
        data: deviceData.data,
        backgroundColor: [
          'rgba(234, 179, 8, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Over Time',
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales by File Category',
      },
    },
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Sales Distribution by Brand',
      },
    },
  };
  
  const devicePieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Users by Device Type',
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics & Reports</h1>
        <p className="mt-2 text-sm text-gray-700">
          Monitor your business performance and analyze key metrics.
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => setTimeRange('month')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            timeRange === 'month'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setTimeRange('quarter')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            timeRange === 'quarter'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          This Quarter
        </button>
        <button
          onClick={() => setTimeRange('year')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            timeRange === 'year'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          This Year
        </button>
        <button
          onClick={() => setTimeRange('all')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            timeRange === 'all'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Metrics Overview */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          className="bg-white overflow-hidden shadow rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      €{totalRevenue.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white overflow-hidden shadow rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Sales
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalSales.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white overflow-hidden shadow rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Customers
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalCustomers.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white overflow-hidden shadow rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Order Value
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      €{averageOrderValue.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Type Selector */}
      <div className="mt-8 flex flex-wrap space-x-4">
        <button
          onClick={() => setChartView('revenue')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            chartView === 'revenue'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } mb-2`}
        >
          Revenue Trends
        </button>
        <button
          onClick={() => setChartView('categories')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            chartView === 'categories'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } mb-2`}
        >
          Category Analysis
        </button>
        <button
          onClick={() => setChartView('brands')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            chartView === 'brands'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } mb-2`}
        >
          Brand Distribution
        </button>
        <button
          onClick={() => setChartView('devices')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            chartView === 'devices'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } mb-2`}
        >
          Device Analytics
        </button>
      </div>

      {/* Main Chart Display */}
      <div className="mt-4 bg-white shadow overflow-hidden rounded-lg p-6">
        <div className="h-80">
          {chartView === 'revenue' && <Line data={lineChartData} options={lineOptions} />}
          {chartView === 'categories' && <Bar data={categoryChartData} options={barOptions} />}
          {chartView === 'brands' && <Pie data={brandChartData} options={pieOptions} />}
          {chartView === 'devices' && <Pie data={deviceChartData} options={devicePieOptions} />}
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <motion.div
          className="bg-white shadow rounded-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Top Selling Files</h3>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">BMW M4 3.0T G82 - Stage 1</p>
                    <p className="text-sm text-gray-500 truncate">Performance tuning</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      78 sales
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Mercedes CLA45 AMG - Stage 3</p>
                    <p className="text-sm text-gray-500 truncate">Performance tuning</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      64 sales
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Volkswagen Touareg 3.0 TDI - Adblue Off</p>
                    <p className="text-sm text-gray-500 truncate">Emissions</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      52 sales
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">BMW 520d F10 - EGR Delete</p>
                    <p className="text-sm text-gray-500 truncate">Emissions</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      45 sales
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Audi S3 8V - DQ250 DSG Tune</p>
                    <p className="text-sm text-gray-500 truncate">Transmission</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      39 sales
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Recent Customers */}
        <motion.div
          className="bg-white shadow rounded-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Customers</h3>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium">JD</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                    <p className="text-sm text-gray-500 truncate">john.doe@example.com</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium">SS</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Sarah Smith</p>
                    <p className="text-sm text-gray-500 truncate">sarah.smith@example.com</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Returning
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium">MJ</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Mark Johnson</p>
                    <p className="text-sm text-gray-500 truncate">mark.johnson@example.com</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium">EB</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Emily Brown</p>
                    <p className="text-sm text-gray-500 truncate">emily.brown@example.com</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Returning
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium">RD</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Ryan Davis</p>
                    <p className="text-sm text-gray-500 truncate">ryan.davis@example.com</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Export & Reports Section */}
      <motion.div
        className="mt-8 bg-white shadow rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Export Reports</h3>
        <p className="text-sm text-gray-500 mb-6">
          Generate and download reports for your records or share with your team.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Sales Report
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Customer Report
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Inventory Report
          </button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}