// app/components/ecu/ECUFilesList.tsx
'use client';

import { useState, useEffect } from 'react';
import FileCard, { FileCardProps } from '../ui/FileCard';
import { SearchBar } from '../ui/SearchBar';

interface ECUFile extends Omit<FileCardProps, 'className'> {
  brandId: string;
  model?: string;
  year?: string;
  category?: string;
}

interface ECUFilesListProps {
  files: ECUFile[];
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  selectedBrandId?: string;
}

const ECUFilesList = ({
  files,
  title = 'ECU Files',
  showFilters = true,
  showSearch = true,
  selectedBrandId,
}: ECUFilesListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<ECUFile[]>(files);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'price'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(files.map(file => file.category || 'uncategorized'))];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...files];

    // Apply brand filter if selected
    if (selectedBrandId) {
      result = result.filter(file => file.brandId === selectedBrandId);
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(file => 
        file.title.toLowerCase().includes(term) || 
        file.description.toLowerCase().includes(term) ||
        (file.system && file.system.toLowerCase().includes(term)) ||
        (file.model && file.model.toLowerCase().includes(term))
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(file => file.category === filterCategory);
    }

    // Apply sorting
    result = result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) > new Date(b.date) ? 1 : -1;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'price') {
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price || '0');
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price || '0');
        return priceA - priceB;
      }
      return 0;
    });

    // Apply sort order
    if (sortOrder === 'desc') {
      result.reverse();
    }

    setFilteredFiles(result);
  }, [files, searchTerm, sortBy, sortOrder, filterCategory, selectedBrandId]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>}
      
      {/* Filters and Search */}
      {(showFilters || showSearch) && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {showSearch && (
              <div className="w-full md:w-1/2">
                <SearchBar
                  placeholder="Search by title, description, system..."
                  onSearch={handleSearch}
                />
              </div>
            )}
            
            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'price')}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Files List */}
      {filteredFiles.length > 0 ? (
        <div className="space-y-4">
          {filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              {...file}
              className="transition-all hover:shadow-lg"
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No files found</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm 
              ? `No results matching "${searchTerm}"`
              : 'No ECU files available for the selected filters'
            }
          </p>
        </div>
      )}
      
      {/* Files Count */}
      {filteredFiles.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredFiles.length} of {files.length} files
        </div>
      )}
    </div>
  );
};

export default ECUFilesList;