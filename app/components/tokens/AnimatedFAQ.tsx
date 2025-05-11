// app/components/tokens/AnimatedFAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface AnimatedFAQProps {
  items: FAQItem[];
  className?: string;
}

const AnimatedFAQ: React.FC<AnimatedFAQProps> = ({ items, className = '' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg border-2 border-yellow-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.01 }}
        >
          <motion.button
            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            onClick={() => toggleExpand(index)}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-bold text-yellow-800">{item.question}</h3>
            <motion.div
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 flex items-center justify-center text-yellow-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 pt-1 border-t border-yellow-100">
                  <motion.p 
                    className="text-gray-800"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {item.answer}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedFAQ;