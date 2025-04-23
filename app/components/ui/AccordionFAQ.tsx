'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
}

const AccordionFAQ = ({ items }: AccordionFAQProps) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 last:border-b-0">
          <button 
            className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index ? true : false}
            aria-controls={`item-${index}`}
          >
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">{item.question}</h3>
            <svg 
              className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'pb-4 max-h-96' : 'max-h-0'}`}
          >
            <p className="text-gray-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionFAQ;