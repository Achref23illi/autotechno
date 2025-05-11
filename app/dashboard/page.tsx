// app/dashboard/page.tsx
import { SearchBar } from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="w-full bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">DASHBOARD SOLUTIONS</h1>
          <p className="text-gray-400">
            Digital speedometer repair and dashboard modification files
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full bg-gray-200 py-4 border-b border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <SearchBar placeholder="Search dashboard solutions..." />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium whitespace-nowrap">Filter by:</span>
              <div className="relative inline-block">
                <select className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-md bg-white appearance-none shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer">
                  <option value="">All Brands</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="audi">Audi</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="volvo">Volvo</option>
                  <option value="toyota">Toyota</option>
                  <option value="lexus">Lexus</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Type:</span>
              <div className="relative inline-block">
                <select className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-md bg-white appearance-none shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer">
                  <option value="">All Types</option>
                  <option value="lcd">LCD Repair</option>
                  <option value="speedo">Speedometer</option>
                  <option value="mileage">Mileage</option>
                  <option value="custom">Custom</option>
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Digital Dashboard Solutions
              </h2>
              <p className="text-gray-600 mb-4">
                We offer specialized solutions for dashboard repair, modification, and customization.
                From fixing faulty digital speedometers to installing custom gauges and displays, our
                files provide professional-grade solutions for technicians and automotive workshops.
              </p>
                <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Fix digital speedometer issues</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Repair LCD display malfunctions</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Custom gauge and display solutions</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Mileage correction and calibration</span>
                </li>
                </ul>
              <Button
                variant="primary"
                size="lg"
                href="/dashboard/solutions"
              >
                Browse Solutions
              </Button>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-800 opacity-80 z-10"></div>
              <Image
                src="/images/dashboard-hero.png"
                alt="Digital dashboard solutions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">Expert Solutions</h3>
                  <p className="text-lg">Professional dashboard repair and customization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Solutions Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Featured Dashboard Solutions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solution 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/speedometer-repair.png"
                alt="Digital Speedometer Repair"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Digital Speedometer Repair</h3>
              <p className="text-gray-600 mb-4">
                Solutions to fix faulty digital speedometers and instrument clusters.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-semibold">€49.99</span>
                <Button variant="primary" size="sm" href="/dashboard/speedometer-repair">
                  View Details
                </Button>
              </div>
            </div>
          </div>
          
          {/* Solution 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/lcd-display.png"
                alt="LCD Display Repair"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">LCD Display Repair</h3>
              <p className="text-gray-600 mb-4">
                Fix missing pixels, dim displays, and other LCD panel issues in dashboards.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-semibold">€59.99</span>
                <Button variant="primary" size="sm" href="/dashboard/lcd-repair">
                  View Details
                </Button>
              </div>
            </div>
          </div>
          
          {/* Solution 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/custom-gauges.png"
                alt="Custom Gauge Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Custom Gauge Solutions</h3>
              <p className="text-gray-600 mb-4">
                Specialized files for installing and calibrating custom gauges and displays.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-semibold">€79.99</span>
                <Button variant="primary" size="sm" href="/dashboard/custom-gauges">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Vehicles Section */}
      <section className="container mx-auto px-4 py-12 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          <span className="inline-block border-b-2 border-yellow-500 pb-2">Compatible Vehicle Brands</span>
        </h2>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Our dashboard solutions are engineered to be compatible with a wide range of vehicles from premium 
            to mainstream manufacturers. Select your vehicle brand below to see supported models and solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BMW */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="w-14 h-14 relative mr-4 flex-shrink-0">
                  <Image 
                    src="/images/brands/bmw.webp" 
                    alt="BMW Logo" 
                    fill
                    className="object-contain" 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">BMW</h3>
              </div>
              <div className="p-5">
                <ul className="text-gray-700 space-y-2 divide-y divide-gray-100">
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>3 Series <span className="text-gray-500 text-sm">(E90, E92, F30, G20)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>5 Series <span className="text-gray-500 text-sm">(E60, F10, G30)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>7 Series <span className="text-gray-500 text-sm">(E65, F01, G11)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>X Series <span className="text-gray-500 text-sm">(X1, X3, X5, X6)</span></span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" href="/dashboard/bmw">
                    View BMW Solutions
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mercedes */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="w-14 h-14 relative mr-4 flex-shrink-0">
                  <div className="rounded-full overflow-hidden w-full h-full flex items-center justify-center bg-gray-900">
                    <Image 
                      src="/images/brands/mercedes.webp" 
                      alt="Mercedes Logo" 
                      fill
                      className="object-contain p-1" 
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Mercedes-Benz</h3>
              </div>
              <div className="p-5">
                <ul className="text-gray-700 space-y-2 divide-y divide-gray-100">
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>C-Class <span className="text-gray-500 text-sm">(W203, W204, W205)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>E-Class <span className="text-gray-500 text-sm">(W211, W212, W213)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>S-Class <span className="text-gray-500 text-sm">(W221, W222)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>SUV Models <span className="text-gray-500 text-sm">(ML, GL, GLE, GLC)</span></span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" href="/dashboard/mercedes">
                    View Mercedes Solutions
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Audi */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="w-14 h-14 relative mr-4 flex-shrink-0">
                  <Image 
                    src="/images/brands/audi.webp" 
                    alt="Audi Logo" 
                    fill
                    className="object-contain" 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Audi</h3>
              </div>
              <div className="p-5">
                <ul className="text-gray-700 space-y-2 divide-y divide-gray-100">
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>A Series <span className="text-gray-500 text-sm">(A3, A4, A5, A6)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Q Series <span className="text-gray-500 text-sm">(Q3, Q5, Q7)</span></span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>TT Models</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>R8</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" href="/dashboard/audi">
                    View Audi Solutions
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Volkswagen */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="w-14 h-14 relative mr-4 flex-shrink-0">
                  <div className="rounded-full overflow-hidden w-full h-full flex items-center justify-center bg-yellow-900">
                    <Image 
                      src="/images/brands/volkswagen.webp" 
                      alt="Volkswagen Logo" 
                      fill
                      className="object-contain p-1" 
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Volkswagen</h3>
              </div>
              <div className="p-5">
                <ul className="text-gray-700 space-y-2 divide-y divide-gray-100">
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Golf, Polo</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Passat, CC</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Tiguan, Touareg</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Jetta, Arteon</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" href="/dashboard/volkswagen">
                    View VW Solutions
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Volvo */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="w-14 h-14 relative mr-4 flex-shrink-0">
                  <Image 
                    src="/images/brands/volvo.webp" 
                    alt="Volvo Logo" 
                    fill
                    className="object-contain" 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Volvo</h3>
              </div>
              <div className="p-5">
                <ul className="text-gray-700 space-y-2 divide-y divide-gray-100">
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>S60, S90</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>V60, V90</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>XC60, XC90</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>C30, C70</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" href="/dashboard/volvo">
                    View Volvo Solutions
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Other Makes */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-xl font-bold text-gray-800">Additional Brands</h3>
              </div>
              <div className="p-5">
                <ul className="text-gray-700 space-y-2 divide-y divide-gray-100">
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Toyota, Lexus</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Honda, Acura</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ford, Jaguar, Land Rover</span>
                  </li>
                  <li className="py-2 flex items-start">
                    <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Porsche, Alfa Romeo</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" href="/dashboard/other-brands">
                    View All Brands
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="mb-4 text-gray-600">Can&apos;t find your vehicle? Contact our support team for custom solutions</p>
            <Button variant="primary" href="/contact">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}