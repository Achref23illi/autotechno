'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ModalStyles from '../components/ModalStyles';
import { motion } from 'framer-motion';
import { ECUFile } from '../../types';
import { ecuFiles } from '../../data/ecuFiles';

// File Status types for admin management
enum FileStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  ARCHIVED = 'archived'
}

// Extended ECU file for admin management with additional fields
interface AdminECUFile extends ECUFile {
  status: FileStatus;
  uploadedBy?: string;
  uploadDate: string;
  lastModified?: string;
  downloads?: number;
  approvedBy?: string;
  notes?: string;
}

// Convert regular ECU files to admin files with status
const initialAdminFiles: AdminECUFile[] = ecuFiles.map(file => ({
  ...file,
  status: FileStatus.ACTIVE,
  uploadDate: file.date,
  lastModified: new Date().toISOString().split('T')[0],
  downloads: Math.floor(Math.random() * 100),
}));

// File categories
const fileCategories = [
  { id: 'performance', name: 'Performance' },
  { id: 'economy', name: 'Economy' },
  { id: 'emissions', name: 'Emissions' },
  { id: 'transmission', name: 'Transmission' },
  { id: 'diagnostics', name: 'Diagnostics' },
  { id: 'custom', name: 'Custom' },
];

// Empty file template for new files
const emptyFile: AdminECUFile = {
  id: '',
  title: '',
  description: '',
  brandId: '',
  model: '',
  year: '',
  system: '',
  category: '',
  price: '',
  isOriginal: false,
  date: new Date().toISOString().split('T')[0],
  uploadDate: new Date().toISOString().split('T')[0],
  status: FileStatus.PENDING,
  downloads: 0,
  notes: ''
} as AdminECUFile;

export default function FileManagementPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [adminFiles, setAdminFiles] = useState<AdminECUFile[]>(initialAdminFiles);
  const [isEditFileModalOpen, setIsEditFileModalOpen] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [currentFile, setCurrentFile] = useState<AdminECUFile | null>(null);
  const [newFile, setNewFile] = useState<AdminECUFile>({...emptyFile});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<FileStatus | ''>('');
  const [sortField, setSortField] = useState<'date' | 'title' | 'downloads'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // File statistics
  const totalFiles = adminFiles.length;
  const activeFiles = adminFiles.filter(file => file.status === FileStatus.ACTIVE).length;
  const pendingFiles = adminFiles.filter(file => file.status === FileStatus.PENDING).length;
  const popularFileId = adminFiles.reduce((prev, current) => 
    (prev && prev.downloads && current.downloads && prev.downloads > current.downloads) ? prev : current, adminFiles[0]
  ).id;

  // Filtered files based on search, category, and status
  const getFilteredFiles = () => {
    let filtered = [...adminFiles];

    // Apply tab filter
    if (activeTab === 'pending') {
      filtered = filtered.filter(file => file.status === FileStatus.PENDING);
    } else if (activeTab === 'active') {
      filtered = filtered.filter(file => file.status === FileStatus.ACTIVE);
    } else if (activeTab === 'archived') {
      filtered = filtered.filter(file => file.status === FileStatus.ARCHIVED);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(file => 
        file.title.toLowerCase().includes(term) || 
        file.description.toLowerCase().includes(term) ||
        (file.model && file.model.toLowerCase().includes(term)) ||
        (file.system && file.system.toLowerCase().includes(term))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(file => file.category === selectedCategory);
    }

    // Apply status filter (if not already filtered by tab)
    if (selectedStatus && activeTab === 'all') {
      filtered = filtered.filter(file => file.status === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortField === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortField === 'downloads') {
        return (a.downloads || 0) - (b.downloads || 0);
      }
      return 0;
    });

    // Apply sort direction
    if (sortDirection === 'desc') {
      filtered.reverse();
    }

    return filtered;
  };

  const handleEditFile = (file: AdminECUFile) => {
    setCurrentFile({ ...file });
    setIsEditFileModalOpen(true);
  };

  const handleAddNewFile = () => {
    setIsAddingFile(true);
    setNewFile({...emptyFile});
    
    // Scroll to form
    setTimeout(() => {
      const addFileForm = document.getElementById('add-file-form');
      if (addFileForm) {
        addFileForm.scrollIntoView({ behavior: 'smooth' });
        const titleInput = document.getElementById('new-title');
        if (titleInput) {
          titleInput.focus();
        }
      }
    }, 100);
  };

  const handleCancelAdd = () => {
    setIsAddingFile(false);
    setNewFile({...emptyFile});
  };

  const handleSaveNewFile = () => {
    // Validate required fields
    if (!newFile.title || !newFile.brandId || !newFile.description) {
      alert('Please fill in all required fields: Title, Brand, and Description');
      return;
    }

    // Add new file
    const fileToAdd: AdminECUFile = {
      ...newFile,
      id: `ecu${String(adminFiles.length + 1).padStart(3, '0')}`,
      uploadDate: new Date().toISOString().split('T')[0],
      date: new Date().toISOString().split('T')[0],
      status: FileStatus.PENDING,
      downloads: 0
    };

    setAdminFiles(prev => [...prev, fileToAdd]);
    setIsAddingFile(false);
    setNewFile({...emptyFile});
  };

  const handleSaveFile = () => {
    if (!currentFile) return;

    // Validate required fields
    if (!currentFile.title || !currentFile.brandId || !currentFile.description) {
      alert('Please fill in all required fields: Title, Brand, and Description');
      return;
    }

    // Update existing file
    setAdminFiles(prev =>
      prev.map(file =>
        file.id === currentFile.id
          ? { ...currentFile, lastModified: new Date().toISOString().split('T')[0] }
          : file
      )
    );
    setIsEditFileModalOpen(false);
    setCurrentFile(null);
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      setAdminFiles(prev => prev.filter(file => file.id !== id));
    }
  };

  const handleChangeStatus = (id: string, newStatus: FileStatus) => {
    setAdminFiles(prev => prev.map(file => {
      if (file.id === id) {
        return {
          ...file,
          status: newStatus,
          lastModified: new Date().toISOString().split('T')[0]
        };
      }
      return file;
    }));
  };

  const filteredFiles = getFilteredFiles();

  return (
    <DashboardLayout>
      <ModalStyles />
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">File Management</h1>
        <button
          type="button"
          onClick={handleAddNewFile}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New File
        </button>
      </div>

      {/* File Stats */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Files
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalFiles}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Files
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {activeFiles}
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
              <div className="flex-shrink-0 bg-yellow-600 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Approval
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {pendingFiles}
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
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Most Popular
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 truncate">
                      {adminFiles.find(file => file.id === popularFileId)?.title || 'N/A'}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add New File Form */}
      {isAddingFile && (
        <motion.div
          id="add-file-form"
          className="mt-6 bg-white shadow sm:rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New File</h3>
            <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="new-title" className="block text-sm font-medium text-gray-700">
                  File Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="new-title"
                    id="new-title"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.title}
                    onChange={(e) => setNewFile({...newFile, title: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="new-brand" className="block text-sm font-medium text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="new-brand"
                    id="new-brand"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.brandId}
                    onChange={(e) => setNewFile({...newFile, brandId: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="new-model" className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="new-model"
                    id="new-model"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.model || ''}
                    onChange={(e) => setNewFile({...newFile, model: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="new-year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="new-year"
                    id="new-year"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.year || ''}
                    onChange={(e) => setNewFile({...newFile, year: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="new-system" className="block text-sm font-medium text-gray-700">
                  ECU System
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="new-system"
                    id="new-system"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.system || ''}
                    onChange={(e) => setNewFile({...newFile, system: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="new-category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    id="new-category"
                    name="new-category"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.category || ''}
                    onChange={(e) => setNewFile({...newFile, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    {fileCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="new-description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="new-description"
                    name="new-description"
                    rows={3}
                    className="shadow-sm block w-full border border-gray-300 rounded-md sm:text-sm"
                    value={newFile.description}
                    onChange={(e) => setNewFile({...newFile, description: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="new-price" className="block text-sm font-medium text-gray-700">
                  Price (€)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="new-price"
                    id="new-price"
                    className="shadow-sm block w-full border-gray-300 rounded-md sm:text-sm"
                    value={newFile.price || ''}
                    onChange={(e) => setNewFile({...newFile, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <div className="flex items-center h-full">
                  <input
                    id="new-isOriginal"
                    name="new-isOriginal"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 border-gray-300 rounded mt-6"
                    checked={newFile.isOriginal || false}
                    onChange={(e) => setNewFile({...newFile, isOriginal: e.target.checked})}
                  />
                  <label htmlFor="new-isOriginal" className="ml-2 block text-sm text-gray-700 mt-6">
                    Is Original File
                  </label>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">File Upload</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose File
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleSaveNewFile}
              >
                Save File
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, model, or system..."
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {fileCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as FileStatus | '')}
              disabled={activeTab !== 'all'}
            >
              <option value="">All Statuses</option>
              {Object.entries(FileStatus).map(([key, value]) => (
                <option key={key} value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <div className="flex">
              <select
                id="sort"
                className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-l-md"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as 'date' | 'title' | 'downloads')}
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="downloads">Downloads</option>
              </select>
              <button
                type="button"
                onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                {sortDirection === 'asc' ? (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="all">All Files</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('all')}
                className={`${
                  activeTab === 'all'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                All Files
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`${
                  activeTab === 'active'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`${
                  activeTab === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <span>Pending</span>
                {pendingFiles > 0 && (
                  <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full text-xs">
                    {pendingFiles}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`${
                  activeTab === 'archived'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Archived
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Files Table */}
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-md flex items-center justify-center">
                          <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{file.title}</div>
                          <div className="text-sm text-gray-500">{file.brandId} - {file.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">System: {file.system || 'N/A'}</div>
                      <div className="text-sm text-gray-500">Category: {file.category || 'N/A'}</div>
                      <div className="text-sm text-gray-500">Year: {file.year || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        file.status === FileStatus.ACTIVE 
                          ? 'bg-green-100 text-green-800' 
                          : file.status === FileStatus.PENDING
                            ? 'bg-yellow-100 text-yellow-800'
                            : file.status === FileStatus.REJECTED
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Added: {file.uploadDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        Modified: {file.lastModified || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Price: {file.price}</div>
                      <div>Downloads: {file.downloads}</div>
                      <div>Comments: {file.commentCount || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditFile(file)}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        Edit
                      </button>
                      
                      {file.status !== FileStatus.ACTIVE && (
                        <button
                          onClick={() => handleChangeStatus(file.id, FileStatus.ACTIVE)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Approve
                        </button>
                      )}
                      
                      {file.status !== FileStatus.ARCHIVED && (
                        <button
                          onClick={() => handleChangeStatus(file.id, FileStatus.ARCHIVED)}
                          className="text-gray-600 hover:text-gray-900 mr-3"
                        >
                          Archive
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No files found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredFiles.length}</span> of <span className="font-medium">{filteredFiles.length}</span> results
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

      {/* Edit File Modal */}
      {isEditFileModalOpen && currentFile && (
        <div className="fixed z-30 inset-0 overflow-y-auto modal-form">
          <div 
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            onClick={(e) => {
              // Only close if clicking the backdrop directly, not on modal content
              if (e.target === e.currentTarget) {
                setIsEditFileModalOpen(false);
                setCurrentFile(null);
              }
            }}
          >
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Edit File
                    </h3>
                    <div className="mt-2">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Title</label>
                          <input 
                            type="text" 
                            id="edit-title" 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            value={currentFile.title}
                            onChange={(e) => setCurrentFile({...currentFile, title: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="edit-brandId" className="block text-sm font-medium text-gray-700">Brand</label>
                            <input 
                              type="text" 
                              id="edit-brandId" 
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                              value={currentFile.brandId}
                              onChange={(e) => setCurrentFile({...currentFile, brandId: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="edit-model" className="block text-sm font-medium text-gray-700">Model</label>
                            <input 
                              type="text" 
                              id="edit-model" 
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                              value={currentFile.model || ''}
                              onChange={(e) => setCurrentFile({...currentFile, model: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="edit-year" className="block text-sm font-medium text-gray-700">Year</label>
                            <input 
                              type="text" 
                              id="edit-year" 
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                              value={currentFile.year || ''}
                              onChange={(e) => setCurrentFile({...currentFile, year: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="edit-system" className="block text-sm font-medium text-gray-700">ECU System</label>
                            <input 
                              type="text" 
                              id="edit-system" 
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                              value={currentFile.system || ''}
                              onChange={(e) => setCurrentFile({...currentFile, system: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            id="edit-category"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            value={currentFile.category || ''}
                            onChange={(e) => setCurrentFile({...currentFile, category: e.target.value})}
                          >
                            <option value="">Select Category</option>
                            {fileCategories.map(category => (
                              <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            id="edit-description"
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            value={currentFile.description}
                            onChange={(e) => setCurrentFile({...currentFile, description: e.target.value})}
                          ></textarea>
                        </div>
                        
                        <div>
                          <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700">Price</label>
                          <input 
                            type="text" 
                            id="edit-price" 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            value={currentFile.price || ''}
                            onChange={(e) => setCurrentFile({...currentFile, price: e.target.value})}
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            id="edit-isOriginal" 
                            type="checkbox" 
                            className="h-4 w-4 text-yellow-600 border-gray-300 rounded"
                            checked={currentFile.isOriginal || false}
                            onChange={(e) => setCurrentFile({...currentFile, isOriginal: e.target.checked})}
                          />
                          <label htmlFor="edit-isOriginal" className="ml-2 block text-sm font-medium text-gray-700">
                            Is Original File
                          </label>
                        </div>
                        
                        <div>
                          <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">Status</label>
                          <select
                            id="edit-status"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            value={currentFile.status}
                            onChange={(e) => setCurrentFile({...currentFile, status: e.target.value as FileStatus})}
                          >
                            {Object.entries(FileStatus).map(([key, value]) => (
                              <option key={key} value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700">Admin Notes</label>
                          <textarea
                            id="edit-notes"
                            rows={2}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                            value={currentFile.notes || ''}
                            onChange={(e) => setCurrentFile({...currentFile, notes: e.target.value})}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveFile}
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsEditFileModalOpen(false)}
                >
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