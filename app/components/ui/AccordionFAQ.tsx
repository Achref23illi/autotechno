'use client';

import { useState, useRef, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
}

const AccordionFAQ = ({ items }: AccordionFAQProps) => {
  const [openIndex, setOpenIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Pre-populate the refs array with the correct length
    contentRefs.current = contentRefs.current.slice(0, items.length);
  }, [items.length]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      const nextButton = document.querySelector(`[data-faq-button="${nextIndex}"]`);
      if (nextButton instanceof HTMLElement) {
        nextButton.focus();
      }
      const prevIndex = (index - 1 + items.length) % items.length;
      const prevButton = document.querySelector(`[data-faq-button="${prevIndex}"]`);
      if (prevButton instanceof HTMLElement) {
        prevButton.focus();
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index} className="py-2">
          <button 
            className="flex justify-between items-center w-full py-4 text-left focus:outline-none group focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-md px-2"
            onClick={() => toggleItem(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
            data-faq-button={index}
          >
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              {item.question}
            </h3>
            <div className={`flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600 transition-all duration-300 ${openIndex === index ? 'transform rotate-180 bg-blue-500 text-white' : ''}`}>
              <svg 
                className="h-4 w-4"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          <div 
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'
            }`}
          >
            <div className="py-2 px-2 text-gray-600 border-l-4 border-blue-500 bg-blue-50 my-2 rounded-r-md">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionFAQ;