// app/admin/customers/page.tsx
'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';

// Sample customer data
const customersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', tokens: 25, status: 'Active', dateCreated: '2023-01-15', lastActive: '2023-05-10', totalSpent: '$249' },
  { id: 2, name: 'Sara Smith', email: 'sara@example.com', tokens: 42, status: 'Active', dateCreated: '2023-02-22', lastActive: '2023-05-09', totalSpent: '$425' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', tokens: 18, status: 'Active', dateCreated: '2023-03-05', lastActive: '2023-05-08', totalSpent: '$180' },
  { id: 4, name: 'Emma Wilson', email: 'emma@example.com', tokens: 36, status: 'Active', dateCreated: '2023-03-12', lastActive: '2023-05-06', totalSpent: '$362' },
  { id: 5, name: 'Alex Brown', email: 'alex@example.com', tokens: 54, status: 'Inactive', dateCreated: '2023-01-08', lastActive: '2023-04-15', totalSpent: '$540' },
  { id: 6, name: 'Rachel Green', email: 'rachel@example.com', tokens: 8, status: 'Active', dateCreated: '2023-04-18', lastActive: '2023-05-05', totalSpent: '$80' },
  { id: 7, name: 'Chris Black', email: 'chris@example.com', tokens: 60, status: 'Active', dateCreated: '2023-02-14', lastActive: '2023-05-07', totalSpent: '$600' },
  { id: 8, name: 'Jessica Lee', email: 'jessica@example.com', tokens: 12, status: 'Inactive', dateCreated: '2023-04-01', lastActive: '2023-04-12', totalSpent: '$120' },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(customersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  
  // Filter customers based on search term and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearchTerm = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    
    return matchesSearchTerm && matchesStatus;
  });
  
  // Sort customers based on sortConfig
  const sortedCustomers = sortConfig 
    ? [...filteredCustomers].sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    : filteredCustomers;
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCustomers(sortedCustomers.map(customer => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };
  
  const handleSelectCustomer = (customerId: number) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      } else {
        return [...prev, customerId];
      }
    });
  };
  
  const addTokens = (customerId: number, amount: number) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, tokens: customer.tokens + amount } 
          : customer
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setIsAddCustomerModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add Customer
          </button>
        </div>
      </div>
      
      {/* Filter and Search */}
      <div className="mt-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Status:</span>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mt-3 sm:mt-0 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Actions for selected customers */}
      {selectedCustomers.length > 0 && (
        <div className="mt-4 bg-gray-50 p-3 rounded-md flex items-center justify-between">
          <span className="text-sm text-gray-700">
            {selectedCustomers.length} {selectedCustomers.length === 1 ? 'customer' : 'customers'} selected
          </span>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Add Tokens
            </button>
            <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Customers table */}
      <motion.div 
        className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="relative pl-4 pr-3 py-3">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    onChange={handleSelectAll}
                    checked={selectedCustomers.length === sortedCustomers.length && sortedCustomers.length > 0}
                  />
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Name {getSortIndicator('name')}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('email')}
                >
                  Email {getSortIndicator('email')}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('tokens')}
                >
                  Tokens {getSortIndicator('tokens')}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('status')}
                >
                  Status {getSortIndicator('status')}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('lastActive')}
                >
                  Last Active {getSortIndicator('lastActive')}
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('totalSpent')}
                >
                  Total Spent {getSortIndicator('totalSpent')}
                </th>
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.map((customer) => (
                <tr key={customer.id} className={selectedCustomers.includes(customer.id) ? 'bg-yellow-50' : undefined}>
                  <td className="pl-4 pr-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-yellow-700">{customer.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Created {customer.dateCreated}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{customer.tokens}</div>
                    <button
                      className="text-xs text-yellow-600 hover:text-yellow-800"
                      onClick={() => addTokens(customer.id, 5)}
                    >
                      + Add tokens
                    </button>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastActive}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalSpent}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button type="button" className="text-yellow-600 hover:text-yellow-800 mr-3">
                      Edit
                    </button>
                    <button type="button" className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedCustomers.length === 0 && (
          <div className="px-6 py-8 text-center">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try a different search term or filter, or add a new customer to get started.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsAddCustomerModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <svg 
                  className="-ml-1 mr-2 h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Add customer
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between bg-white px-4 py-3 sm:px-6 shadow rounded-lg">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedCustomers.length}</span> of{' '}
              <span className="font-medium">{sortedCustomers.length}</span> customers
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
              <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-yellow-600 hover:bg-yellow-50">
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

      {/* Add Customer Modal (simplified placeholder) */}
      {isAddCustomerModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add Customer
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Fill in the customer details below.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                          <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="initial-tokens" className="block text-sm font-medium text-gray-700">Initial Tokens</label>
                          <input type="number" id="initial-tokens" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" defaultValue="0" min="0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Add
                </button>
                <button type="button" onClick={() => setIsAddCustomerModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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