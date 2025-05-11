// app/tokens/page.tsx
'use client';

import { useState } from 'react';
//import { useAuth } from '../context/AuthContext';
import { tokenPackages } from '../data/tokens';
import TokenPackageCard from '../components/tokens/TokenPackageCard';
import TokenBalanceCard from '../components/tokens/TokenBalanceCard';
import FileDecryptUploader from '../components/tokens/FileDecryptUploader';
import PaymentMethodSelector from '../components/tokens/PaymentMethodSelector';
import AnimatedFAQ from '../components/tokens/AnimatedFAQ';
import { motion } from 'framer-motion';

export default function TokensPage() {
  //const { user } = useAuth();
  
  // Dummy token balance for demo - this would come from an API in a real app
  const [tokenBalance, setTokenBalance] = useState(5);
  
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  
  // Functions to handle the token purchase flow
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handlePurchaseTokens = async () => {
    if (!selectedPackageId || !setSelectedPaymentMethod) return;

    setIsProcessingPayment(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would be an API call to process the payment
    const selectedPackage = tokenPackages.find(pkg => pkg.id === selectedPackageId);
    
    if (selectedPackage) {
      // Add tokens to user's balance
      setTokenBalance(prev => prev + selectedPackage.tokens);
      setIsPaymentComplete(true);
    }
    
    setIsProcessingPayment(false);
  };

  const handleFileUpload = (file: File, serviceType: string) => {
    // This function would handle the file upload and processing 
    // In a real app, this would make an API call to process the file
    
    alert(`File uploaded: ${file.name}\nService: ${serviceType}\nThis is a demo. In a real app, the file would be sent to the server for processing.`);
  };

  const resetPaymentFlow = () => {
    setSelectedPackageId('');
    setIsPaymentComplete(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-yellow-700"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
          >
            ECU File Decryption & Tokens
          </motion.h1>
          <motion.p
            className="text-lg text-gray-800 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Use tokens to decrypt ECU files, get airbag reset codes, and unlock other automotive services. The more tokens you purchase, the better value you get.
          </motion.p>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Left Column - File Upload & Token Balance */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FileDecryptUploader
                userTokenBalance={tokenBalance}
                onFileUpload={handleFileUpload}
              />
            </motion.div>
            
            <motion.div
              className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 shadow-md"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.2)" }}
            >
              <h3 className="text-lg font-bold mb-4 text-yellow-800">How It Works</h3>
              <ol className="space-y-3 list-decimal list-inside text-gray-800">
                {["Purchase tokens using one of our secure payment methods",
                  "Upload your ECU file or select another service",
                  "Our system will process your file using tokens from your balance",
                  "Download your processed file, typically ready within minutes"].map((step, index) => (
                  <motion.li
                    key={index}
                    className="text-sm font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                  >
                    {step}
                  </motion.li>
                ))}
              </ol>
              <motion.div
                className="mt-4 p-3 bg-yellow-100 rounded-md border border-yellow-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <p className="text-sm font-medium text-yellow-900">
                  <strong>Note:</strong> Different services require different token amounts. Check the token cost before uploading.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Token Balance & Purchase */}
          <motion.div
            className="space-y-8"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TokenBalanceCard tokenBalance={tokenBalance} />
            </motion.div>
            
            <motion.div
              id="buy-tokens"
              className="bg-white rounded-lg border-2 border-yellow-300 shadow-md p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.2)" }}
            >
              <motion.h3
                className="text-xl font-bold mb-6 text-yellow-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Buy More Tokens
              </motion.h3>
              {isPaymentComplete ? (
                <div className="text-center py-8">
                  <div className="mb-6 mx-auto bg-green-100 border-2 border-green-200 rounded-full p-3 w-20 h-20 flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-green-700">Payment Complete!</h4>
                  <p className="text-gray-800 mb-6 text-lg">Your tokens have been added to your balance.</p>
                  <button
                    onClick={resetPaymentFlow}
                    className="px-8 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-bold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Buy More Tokens
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {tokenPackages.map((pkg) => (
                      <TokenPackageCard
                        key={pkg.id}
                        tokenPackage={pkg}
                        onSelect={handlePackageSelect}
                        selectedId={selectedPackageId}
                      />
                    ))}
                  </div>

                  {selectedPackageId && (
                    <>
                      <PaymentMethodSelector
                        onSelect={handlePaymentMethodSelect}
                        className="mb-6"
                      />

                      <button
                        onClick={handlePurchaseTokens}
                        disabled={isProcessingPayment}
                        className={`
                          w-full py-3 px-6 rounded-md font-bold text-base shadow-md transition-all duration-200 text-white
                          ${isProcessingPayment
                            ? 'bg-gray-400 cursor-not-allowed border-2 border-gray-300'
                            : 'bg-yellow-600 hover:bg-yellow-700 hover:shadow-lg border-2 border-yellow-500'}
                        `}
                      >
                        {isProcessingPayment ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Complete Purchase'
                        )}
                      </button>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-yellow-700">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <AnimatedFAQ
            items={[
              {
                question: "What are tokens used for?",
                answer: "Tokens are used to pay for our ECU decryption services, airbag reset codes, dashboard repairs, and other automotive services. Each service requires a specific number of tokens, with more complex services costing more tokens."
              },
              {
                question: "Do tokens expire?",
                answer: "No, your purchased tokens do not expire and will remain in your account until you use them. You can purchase tokens in advance and use them whenever you need our services."
              },
              {
                question: "How long does file processing take?",
                answer: "Most ECU files are processed within 5-10 minutes once the token payment has been verified. Complex files or special services may take up to 24 hours. You'll receive an email notification when your file is ready for download."
              },
              {
                question: "Are refunds available?",
                answer: "If we're unable to process your file successfully due to technical reasons, the tokens will be refunded to your account immediately. However, purchased tokens are non-refundable for cash and cannot be transferred to other accounts."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers for token purchases. All payment information is processed securely through our payment providers."
              },
              {
                question: "Can I use tokens for multiple files?",
                answer: "Yes, you can use your token balance for as many files as you can afford. Different file types consume different amounts of tokens, so having a larger balance allows you to process multiple files without repurchasing."
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function setSelectedPaymentMethod(methodId: string) {
  setSelectedPaymentMethod(methodId);
}
