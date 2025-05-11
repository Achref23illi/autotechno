// app/components/tokens/PaymentMethodSelector.tsx
'use client';

import { FC, useState } from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PaymentMethodSelectorProps {
  onSelect: (methodId: string) => void;
  className?: string;
}

const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({ 
  onSelect,
  className = ''
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="#00457C">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 2.966-2.612 6.502-8.633 6.502H9.99L8.57 19.74h4.18c.438 0 .81-.323.9-.768l.037-.189.615-3.918.042-.222c.086-.446.459-.77.897-.77h.57c3.655 0 6.518-1.482 7.357-5.773.365-1.76.179-3.245-.945-4.282z"/>
        </svg>
      )
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    }
  ];
  
  const handleMethodChange = (methodId: string) => {
    setSelectedMethod(methodId);
    onSelect(methodId);
  };
  
  return (
    <div className={`bg-white rounded-lg border-2 border-yellow-300 p-6 shadow-md ${className}`}>
      <h3 className="text-lg font-bold mb-4 text-yellow-800">Choose Payment Method</h3>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`
              flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedMethod === method.id
                ? 'border-yellow-500 bg-yellow-50 shadow-md'
                : 'border-gray-200 hover:border-yellow-300 hover:shadow-sm'}
            `}
            onClick={() => handleMethodChange(method.id)}
          >
            <div className={`mr-4 ${selectedMethod === method.id ? 'text-yellow-700' : 'text-gray-700'}`}>
              {method.icon}
            </div>

            <div className="flex-grow">
              <span className={`font-medium ${selectedMethod === method.id ? 'text-yellow-800' : 'text-gray-800'}`}>
                {method.name}
              </span>
            </div>

            <div className="flex-shrink-0">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id ? 'border-yellow-600' : 'border-gray-400'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-700 bg-yellow-50 p-3 rounded-md border border-yellow-100">
        <p>All payments are processed securely. Your payment information is never stored on our servers.</p>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;