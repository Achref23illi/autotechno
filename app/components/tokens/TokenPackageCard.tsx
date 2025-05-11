// app/components/tokens/TokenPackageCard.tsx
'use client';

import { FC } from 'react';
import { TokenPackage } from '../../types';

interface TokenPackageCardProps {
  tokenPackage: TokenPackage;
  onSelect: (packageId: string) => void;
  selectedId?: string;
}

const TokenPackageCard: FC<TokenPackageCardProps> = ({ 
  tokenPackage, 
  onSelect,
  selectedId
}) => {
  const { id, name, tokens, price, discountPercentage, popular } = tokenPackage;
  
  const isSelected = selectedId === id;
  
  // Calculate original price if there's a discount
  const originalPrice = discountPercentage 
    ? (price / (1 - discountPercentage / 100)).toFixed(2) 
    : null;
  
  return (
    <div
      className={`
        relative border-2 rounded-lg p-6 transition-all duration-200 shadow-sm
        ${isSelected
          ? 'border-yellow-500 ring-2 ring-yellow-500 bg-yellow-50 shadow-md'
          : 'border-yellow-200 hover:border-yellow-400 hover:shadow-md'
        }
        ${popular ? 'transform hover:-translate-y-1' : ''}
      `}
    >
      {popular && (
        <div className="absolute -top-3 -right-3">
          <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2 text-yellow-800">{name}</h3>
        <div className="flex justify-center items-baseline mb-3">
          <span className="text-4xl font-extrabold text-yellow-700">${price}</span>
          {originalPrice && (
            <span className="text-gray-600 line-through ml-2 text-lg">${originalPrice}</span>
          )}
        </div>
        {(discountPercentage ?? 0) > 0 && (
          <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-bold border border-yellow-200">
            Save {discountPercentage}%
          </span>
        )}
      </div>

      <div className="border-t-2 border-b-2 border-yellow-200 py-4 my-4">
        <div className="flex justify-center items-center text-xl font-bold">
          <span className="text-yellow-700 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95a1 1 0 001.715 1.029zM6 10a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-gray-800">{tokens} Tokens</span>
        </div>
      </div>

      <button
        onClick={() => onSelect(id)}
        className={`
          w-full py-3 px-4 font-bold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md
          ${isSelected
            ? 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 border-2 border-yellow-500'
            : 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-500 border-2 border-yellow-300'
          }
        `}
      >
        {isSelected ? 'Selected' : 'Select Package'}
      </button>
    </div>
  );
};

export default TokenPackageCard;