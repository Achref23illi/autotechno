import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from './components/ui/SearchBar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-900 to-black py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Professional ECU Files & Automotive Solutions
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Quality ECU files, dashboard solutions, and software tools for automotive professionals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/ecu"
                  className="bg-yellow-600 text-white font-medium py-3 px-6 rounded-md hover:bg-yellow-700 transition duration-300"
                >
                  Browse ECU Files
                </Link>
                <Link 
                  href="/software" 
                  className="bg-gray-700 text-white font-medium py-3 px-6 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Explore Software
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md h-auto">
                <Image 
                  src="/images/ecu-hero.png" 
                  alt="ECU Programming" 
                  width={400} 
                  height={400} 
                  className="object-contain rounded-lg shadow-xl"
                  priority
                />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Find the perfect solution for your vehicle</h2>
            <div className="w-full max-w-2xl">
              <SearchBar placeholder="Search for ECU files, vehicle models, or brands..." />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ECU Files */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="mb-4 text-yellow-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">ECU Files</h3>
              <p className="text-gray-300 text-center">
                Original and modified ECU files for all major vehicle brands. 
                Custom tuning available for optimal performance.
              </p>
              <div className="mt-4 flex justify-center">
                <Link href="/ecu" className="text-yellow-400 hover:text-yellow-300">
                  View Files →
                </Link>
              </div>
            </div>
            
            {/* Airbag Reset */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="mb-4 text-yellow-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">Airbag Solutions</h3>
              <p className="text-gray-300 text-center">
                Airbag reset services and solutions for dashboards. 
                Quick and professional resolution for crash data issues.
              </p>
              <div className="mt-4 flex justify-center">
                <Link href="/airbag" className="text-yellow-400 hover:text-yellow-300">
                  Explore Options →
                </Link>
              </div>
            </div>
            
            {/* Software */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="mb-4 text-yellow-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">Software Tools</h3>
              <p className="text-gray-300 text-center">
                Professional diagnostic software and programming tools.
                Everything you need for automotive modification work.
              </p>
              <div className="mt-4 flex justify-center">
                <Link href="/software" className="text-yellow-400 hover:text-yellow-300">
                  Get Software →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="w-full bg-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Latest Updates</h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="bg-yellow-600 text-white text-xs font-medium px-2 py-1 rounded">NEW</span>
                <span className="text-gray-400 text-sm ml-3">April 22, 2025</span>
              </div>
              <span className="text-gray-400 text-sm">3 comments</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Last Files Added to Database</h3>
            <p className="text-gray-300 mb-4">
              New ECU files have been added to our growing database, including the latest updates for BMW, Audi, and Mercedes vehicles.
            </p>
            <div className="flex items-center text-sm">
              <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer">ADMIN</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer">EDC17C64 system bosch</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}