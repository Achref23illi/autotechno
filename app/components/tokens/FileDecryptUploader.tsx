// app/components/tokens/FileDecryptUploader.tsx
'use client';

import { useState } from 'react';
import { tokenUsageCosts } from '../../data/tokens';

interface FileDecryptUploaderProps {
  userTokenBalance: number;
  onFileUpload: (file: File, serviceType: string) => void;
  className?: string;
}

const FileDecryptUploader = ({ 
  userTokenBalance, 
  onFileUpload,
  className = '' 
}: FileDecryptUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [serviceType, setServiceType] = useState('ecuDecrypt');
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (file) {
      onFileUpload(file, serviceType);
    }
  };
  
  const tokensRequired = tokenUsageCosts[serviceType as keyof typeof tokenUsageCosts] || 0;
  const canAfford = userTokenBalance >= tokensRequired;
  
  return (
    <div className={`bg-white rounded-lg border-2 border-yellow-300 p-6 shadow-md ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-yellow-800">Upload File for Processing</h3>

      <form onSubmit={handleSubmit}>
        {/* Service Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Select Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-3 py-2 border-2 border-yellow-200 rounded-md shadow-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="ecuDecrypt">ECU File Decryption ({tokenUsageCosts.ecuDecrypt} tokens)</option>
            <option value="airbagReset">Airbag Reset File ({tokenUsageCosts.airbagReset} tokens)</option>
            <option value="dashboardRepair">Dashboard Repair ({tokenUsageCosts.dashboardRepair} tokens)</option>
            <option value="immobilizerBypass">Immobilizer Bypass ({tokenUsageCosts.immobilizerBypass} tokens)</option>
            <option value="specialFiles">Special Files ({tokenUsageCosts.specialFiles} tokens)</option>
          </select>
        </div>
        
        {/* File Upload Area */}
        <div
          className={`
            border-3 border-dashed rounded-lg p-6 mb-6 text-center
            ${isDragging ? 'border-yellow-500 bg-yellow-50' : 'border-yellow-300'}
            ${file ? 'bg-green-50 border-green-500' : 'bg-yellow-50'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center">
              <div className="mr-4 bg-green-600 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-700 font-medium">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="ml-auto text-gray-700 hover:text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-14 w-14 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-800">
                Drag and drop your file here, or
                <label className="ml-1 text-yellow-600 hover:text-yellow-700 cursor-pointer underline">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".bin,.hex,.ori,.BIN,.HEX,.ORI"
                  />
                </label>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Supported formats: .bin, .hex, .ori (Max 100MB)
              </p>
            </>
          )}
        </div>
        
        {/* Token Balance & Submit */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
          <div className="text-gray-800 font-medium">
            <span className="mr-2 text-yellow-800">Token Balance:</span>
            <span className={`font-bold text-lg ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
              {userTokenBalance} tokens
            </span>
            <div className="mt-1 text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full inline-block">
              This service costs <span className="font-bold">{tokensRequired} tokens</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || !canAfford}
            className={`
              px-6 py-3 rounded-md font-bold text-base shadow-md
              ${(!file || !canAfford)
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed border border-gray-400'
                : 'bg-yellow-600 text-white hover:bg-yellow-700 hover:shadow-lg transition-all duration-200'}
            `}
          >
            {!canAfford
              ? 'Insufficient Tokens'
              : !file
                ? 'Select a File'
                : 'Process File'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileDecryptUploader;