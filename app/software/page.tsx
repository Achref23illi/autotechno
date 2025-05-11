// app/software/page.tsx
import { SearchBar } from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Image from 'next/image';

// Temporary software data structure
const softwareData = [
  {
    id: 'obdtool-pro',
    name: 'OBD Tool Pro',
    category: 'Diagnostic',
    description: 'Professional OBD2 diagnostic software with advanced ECU reading and writing capabilities.',
    features: ['Full ECU diagnostics', 'Live data monitoring', 'DTC reading and clearing', 'ECU programming'],
    price: 149.99,
    image: '/images/obd-tool.jpg',
    compatibility: 'Windows 10/11',
  },
  {
    id: 'ecu-flasher',
    name: 'ECU Flasher Suite',
    category: 'Tuning',
    description: 'Complete ECU flashing and tuning solution for professional automotive tuners.',
    features: ['ECU file reading/writing', 'Map editing', 'Checksum correction', 'Multi-brand support'],
    price: 299.99,
    image: '/images/ecu-flasher.jpg',
    compatibility: 'Windows 10/11',
  },
  {
    id: 'dashboard-toolkit',
    name: 'Dashboard Toolkit',
    category: 'Dashboard',
    description: 'Specialized software for digital dashboard repair and customization.',
    features: ['Instrument cluster programming', 'Mileage calibration', 'Display repair utilities', 'Virtual dashboards'],
    price: 199.99,
    image: '/images/dashboard-hero.png',
    compatibility: 'Windows 10/11',
  },
  {
    id: 'airbag-reset-pro',
    name: 'Airbag Reset Pro',
    category: 'Airbag',
    description: 'Professional tool for resetting airbag modules and clearing crash data.',
    features: ['SRS reset functions', 'Crash data clearing', 'Multi-brand compatibility', 'OBD2 interface'],
    price: 129.99,
    image: '/images/airbag-reset.png',
    compatibility: 'Windows 10/11',
  }
];

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="w-full bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">AUTOMOTIVE SOFTWARE</h1>
          <p className="text-gray-400">
            Professional diagnostic and tuning software tools
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="w-full bg-gray-200 py-4 border-b border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <SearchBar placeholder="Search software tools..." />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium whitespace-nowrap">Filter by:</span>
              <div className="relative inline-block">
                <select className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-md bg-white appearance-none shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer">
                  <option value="">All Categories</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="tuning">Tuning</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="airbag">Airbag</option>
                  <option value="programming">Programming</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Compatibility:</span>
              <div className="relative inline-block">
                <select className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-md bg-white appearance-none shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer">
                  <option value="">All OS</option>
                  <option value="windows">Windows</option>
                  <option value="mac">MacOS</option>
                  <option value="linux">Linux</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Apply Filter
            </button>
          </div>
        </div>
      </section>

      {/* Hero/Info Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-white">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Professional Automotive Software
              </h2>
              <p className="text-gray-300 mb-4">
                Take your automotive business to the next level with our professional-grade 
                diagnostic and tuning software. Our tools are designed for automotive technicians, 
                tuning specialists, and repair workshops.
              </p>
              <ul className="space-y-2 mb-6 text-gray-300">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>User-friendly interfaces with advanced features</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular updates with new vehicle compatibility</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technical support from automotive experts</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Compatible with standard OBD2 interfaces</span>
                </li>
              </ul>
              <Button
                variant="primary"
                size="lg"
                href="#software-list"
              >
                Browse Software
              </Button>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/images/software-hero.png"
                alt="Automotive software tools"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Software List Section */}
      <section id="software-list" className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Software Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softwareData.map((software) => (
            <div key={software.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                src={software.image}
                alt={software.name}
                fill
                className="object-cover"
                />
              </div>
              <div className="md:w-2/3 p-4">
                <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-black">{software.name}</h3>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  {software.category}
                  </span>
                </div>
                <span className="font-bold text-yellow-600">€{software.price.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 text-black">
                {software.description}
                </p>
                
                <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1 text-black">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc text-black">
                  {software.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                  ))}
                </ul>
                </div>
                
                <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 text-black">
                  Compatibility: {software.compatibility}
                </span>
                <Button 
                  variant="primary" 
                  size="sm" 
                  href={`/software/${software.id}`}
                >
                  View Details
                </Button>
                </div>
              </div>
              </div>
            </div>
            ))}
        </div>
      </section>

      {/* System Requirements Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          System Requirements
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-black">Minimum Requirements</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Windows 10 (64-bit)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Intel Core i3 or AMD Ryzen 3 processor</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>4GB RAM</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>5GB free disk space</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>USB 2.0 port</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Internet connection for updates</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-black">Recommended Specifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Windows 10/11 (64-bit)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Intel Core i5/i7 or AMD Ryzen 5/7 processor</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>8GB RAM or more</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>10GB or more free disk space (SSD preferred)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>USB 3.0 port</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>High-speed internet connection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}