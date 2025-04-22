// app/components/ui/FileCard.tsx
import React from 'react';
import Link from 'next/link';
import Button from './Button';

export interface FileCardProps {
  id: string;
  title: string;
  system?: string;
  description: string;
  date: string;
  tags?: string[];
  downloadUrl?: string;
  price?: string | number;
  isOriginal?: boolean;
  commentCount?: number;
  className?: string;
}

const FileCard = ({
  id,
  title,
  system,
  description,
  date,
  tags = [],
  downloadUrl,
  price,
  isOriginal = false,
  commentCount = 0,
  className = '',
}: FileCardProps) => {
  return (
    <div className={`bg-white rounded-md shadow-md p-4 border-l-4 border-blue-600 ${className}`}>
      {/* Header section with title and date */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <Link href={`/ecu/file/${id}`}>
            <span className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {title}
            </span>
          </Link>
          {system && (
            <span className="text-gray-500 text-sm ml-2">{system}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">{date}</span>
          {commentCount > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {commentCount}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3">{description}</p>

      {/* Footer with tags and actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-wrap gap-2">
          {isOriginal && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Original
            </span>
          )}
          
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {price && (
            <span className="font-medium text-gray-800">
              {typeof price === 'number' ? `€${price.toFixed(2)}` : price}
            </span>
          )}
          
          {downloadUrl ? (
            <Button 
              variant="primary" 
              size="sm" 
              href={downloadUrl}
            >
              Download
            </Button>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              href={`/ecu/file/${id}`}
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileCard;