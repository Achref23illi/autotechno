// app/components/ecu/BrandSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface BrandSelectorProps {
  brands: Brand[];
  selectedBrandId?: string;
  onSelectBrand?: (brandId: string) => void;
}

const BrandSelector = ({ 
  brands, 
  selectedBrandId,
  onSelectBrand
}: BrandSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);
  
  // Filter brands when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter(brand => 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [searchTerm, brands]);

  // Handle brand selection
  const handleSelectBrand = (brandId: string) => {
    if (onSelectBrand) {
      onSelectBrand(brandId);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
        <h3 className="text-white font-medium">Car Brands</h3>
      </div>
      
      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Brands List */}
      <div className="px-2 py-2 max-h-[400px] overflow-y-auto">
        <ul>
          {filteredBrands.map((brand) => (
            <li key={brand.id}>
              {onSelectBrand ? (
                // Interactive version (client component)
                <button
                  onClick={() => handleSelectBrand(brand.id)}
                  className={`flex items-center w-full px-2 py-2 rounded-md ${
                    selectedBrandId === brand.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{brand.name}</span>
                </button>
              ) : (
                // Link version (for server components)
                <Link 
                  href={`/ecu/${brand.id}`}
                  className={`flex items-center w-full px-2 py-2 rounded-md ${
                    selectedBrandId === brand.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{brand.name}</span>
                </Link>
              )}
            </li>
          ))}
          
          {filteredBrands.length === 0 && (
            <li className="px-2 py-3 text-gray-400 text-center">
              No brands found matching &quot;{searchTerm}&quot;
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BrandSelector;