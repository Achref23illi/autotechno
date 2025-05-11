// app/admin/tokens/page.tsx
'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { TokenPackage } from '../../types';

// Sample token packages data
const initialTokenPackages: TokenPackage[] = [
  {
    id: '1',
    name: 'Basic',
    tokens: 10,
    price: 9.99,
    discountPercentage: 0,
  },
  {
    id: '2',
    name: 'Standard',
    tokens: 50,
    price: 39.99,
    discountPercentage: 20,
    popular: true,
  },
  {
    id: '3',
    name: 'Professional',
    tokens: 100,
    price: 69.99,
    discountPercentage: 30,
  },
  {
    id: '4',
    name: 'Enterprise',
    tokens: 500,
    price: 299.99,
    discountPercentage: 40,
  }
];

// Sample token transactions
const tokenTransactions = [
  { id: 1, userId: 'user123', userName: 'John Doe', type: 'purchase', amount: 50, date: '2023-05-10', method: 'Credit Card' },
  { id: 2, userId: 'user456', userName: 'Sara Smith', type: 'purchase', amount: 100, date: '2023-05-09', method: 'PayPal' },
  { id: 3, userId: 'user123', userName: 'John Doe', type: 'usage', amount: -2, date: '2023-05-08', service: 'ECU File Decryption' },
  { id: 4, userId: 'user789', userName: 'Mike Johnson', type: 'purchase', amount: 20, date: '2023-05-07', method: 'Bank Transfer' },
  { id: 5, userId: 'user456', userName: 'Sara Smith', type: 'usage', amount: -3, date: '2023-05-06', service: 'Airbag Reset' },
  { id: 6, userId: 'user789', userName: 'Mike Johnson', type: 'usage', amount: -2, date: '2023-05-05', service: 'ECU File Decryption' },
  { id: 7, userId: 'user123', userName: 'John Doe', type: 'usage', amount: -4, date: '2023-05-04', service: 'Dashboard Repair' },
  { id: 8, userId: 'user111', userName: 'Emma Wilson', type: 'purchase', amount: 50, date: '2023-05-03', method: 'Credit Card' },
];

// Token service costs
const tokenServiceCosts = [
  { id: 1, name: 'ECU File Decryption', cost: 2 },
  { id: 2, name: 'Airbag Reset', cost: 3 },
  { id: 3, name: 'Dashboard Repair', cost: 4 },
  { id: 4, name: 'Immobilizer Bypass', cost: 5 },
  { id: 5, name: 'Special Files', cost: 10 },
];

export default function TokenManagementPage() {
  const [activeTab, setActiveTab] = useState('packages');
  const [tokenPackages, setTokenPackages] = useState<TokenPackage[]>(initialTokenPackages);
  const [editingPackage, setEditingPackage] = useState<TokenPackage | null>(null);
  const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);
  const [serviceCosts, setServiceCosts] = useState(tokenServiceCosts);
  const [editingService, setEditingService] = useState<any | null>(null);
  
  // Stats for the dashboard
  const totalTokensSold = tokenTransactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalTokensUsed = Math.abs(
    tokenTransactions
      .filter(t => t.type === 'usage')
      .reduce((sum, t) => sum + t.amount, 0)
  );
  
  const totalRevenue = tokenTransactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => {
      const package_ = tokenPackages.find(p => p.tokens === t.amount);
      return sum + (package_ ? package_.price : 0);
    }, 0);
  
  const handleEditPackage = (pkg: TokenPackage) => {
    setEditingPackage({ ...pkg });
  };
  
  const handleSavePackage = () => {
    if (!editingPackage) return;
    
    setTokenPackages(prev => 
      prev.map(p => p.id === editingPackage.id ? editingPackage : p)
    );
    
    setEditingPackage(null);
  };
  
  const handleCancelEdit = () => {
    setEditingPackage(null);
  };
  
  const handleEditService = (service: any) => {
    setEditingService({ ...service });
  };
  
  const handleSaveService = () => {
    if (!editingService) return;
    
    setServiceCosts(prev => 
      prev.map(s => s.id === editingService.id ? editingService : s)
    );
    
    setEditingService(null);
  };
  
  const handleCancelEditService = () => {
    setEditingService(null);
  };

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Token Management</h1>
      </div>

      {/* Token Stats */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                    Total Tokens Sold
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalTokensSold.toLocaleString()}
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
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tokens Used
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalTokensUsed.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="packages">Token Packages</option>
            <option value="services">Service Costs</option>
            <option value="transactions">Token Transactions</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('packages')}
                className={`${
                  activeTab === 'packages'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Token Packages
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`${
                  activeTab === 'services'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Service Costs
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`${
                  activeTab === 'transactions'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Token Transactions
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Token Packages Tab */}
      {activeTab === 'packages' && (
        <motion.div 
          className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Token Packages
            </h3>
            <button
              type="button"
              onClick={() => setIsAddPackageModalOpen(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Add Package
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tokens
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokenPackages.map((pkg) => (
                  <tr key={pkg.id}>
                    {editingPackage && editingPackage.id === pkg.id ? (
                      // Editing row
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            value={editingPackage.name}
                            onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            value={editingPackage.tokens}
                            onChange={(e) => setEditingPackage({ ...editingPackage, tokens: parseInt(e.target.value) })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">$</span>
                            <input
                              type="number"
                              step="0.01"
                              className="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                              value={editingPackage.price}
                              onChange={(e) => setEditingPackage({ ...editingPackage, price: parseFloat(e.target.value) })}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                              value={editingPackage.discountPercentage || 0}
                              onChange={(e) => setEditingPackage({ ...editingPackage, discountPercentage: parseInt(e.target.value) })}
                            />
                            <span className="text-gray-500 ml-1">%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                            checked={editingPackage.popular || false}
                            onChange={(e) => setEditingPackage({ ...editingPackage, popular: e.target.checked })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={handleSavePackage} className="text-green-600 hover:text-green-900 mr-3">
                            Save
                          </button>
                          <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-900">
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      // Regular row
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{pkg.tokens}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${pkg.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{pkg.discountPercentage || 0}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pkg.popular ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditPackage(pkg)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Service Costs Tab */}
      {activeTab === 'services' && (
        <motion.div 
          className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Service Token Costs
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Set the token cost for each service type.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token Cost
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceCosts.map((service) => (
                  <tr key={service.id}>
                    {editingService && editingService.id === service.id ? (
                      // Editing row
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            value={editingService.name}
                            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            className="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            value={editingService.cost}
                            onChange={(e) => setEditingService({ ...editingService, cost: parseInt(e.target.value) })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={handleSaveService} className="text-green-600 hover:text-green-900 mr-3">
                            Save
                          </button>
                          <button onClick={handleCancelEditService} className="text-red-600 hover:text-red-900">
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      // Regular row
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{service.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{service.cost} tokens</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditService(service)} className="text-yellow-600 hover:text-yellow-900">
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <motion.div 
          className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Token Transactions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Recent token purchases and usage.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokenTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.userName}</div>
                      <div className="text-sm text-gray-500">{transaction.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'purchase' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        transaction.amount > 0 
                          ? 'text-green-600' 
                          : 'text-blue-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.type === 'purchase' 
                        ? `Payment Method: ${transaction.method}` 
                        : `Service: ${transaction.service}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Simplified Pagination Example */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button type="button" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">8</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button type="button" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button type="button" className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
                    1
                  </button>
                  <button type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Simplified Add Package Modal Placeholder */}
      {isAddPackageModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add Token Package
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        Create a new token package.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Package Name</label>
                          <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="tokens" className="block text-sm font-medium text-gray-700">Tokens</label>
                          <input type="number" id="tokens" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                          <input type="number" step="0.01" id="price" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                          <input type="number" id="discount" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                        </div>
                        <div className="flex items-center">
                          <input id="popular" type="checkbox" className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" />
                          <label htmlFor="popular" className="ml-2 block text-sm font-medium text-gray-700">
                            Mark as popular
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Add Package
                </button>
                <button type="button" onClick={() => setIsAddPackageModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}