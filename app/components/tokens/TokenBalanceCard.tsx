// app/components/tokens/TokenBalanceCard.tsx
'use client';

import { FC } from 'react';

interface TokenBalanceCardProps {
  tokenBalance: number;
  className?: string;
}

const TokenBalanceCard: FC<TokenBalanceCardProps> = ({ 
  tokenBalance, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg border-2 border-yellow-300 shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-yellow-800">Your Token Balance</h3>
        <span className="text-yellow-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </div>

      <div className="flex items-center justify-center my-8">
        <span className="text-6xl font-bold text-yellow-600">{tokenBalance}</span>
        <span className="ml-2 text-gray-700 font-medium">tokens</span>
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-800 font-medium">
          Use tokens to decrypt ECU files, get airbag reset codes, and access other automotive solutions.
        </p>
        <a href="#buy-tokens" className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-full text-sm font-medium transition-colors">
          Need more tokens? Buy now →
        </a>
      </div>
    </div>
  );
};

export default TokenBalanceCard;