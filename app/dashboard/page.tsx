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
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Filter by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option>All Models</option>
              <option>BMW</option>
              <option>Mercedes</option>
              <option>Audi</option>
              <option>Volkswagen</option>
            </select>
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
                  <span>Fix digital speedometer issues</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Repair LCD display malfunctions</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom gauge and display solutions</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mileage correction and calibration</span>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-80 z-10"></div>
              <Image
                src="/images/dashboard-hero.jpg"
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
                src="/images/speedometer-repair.jpg"
                alt="Digital Speedometer Repair"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Digital Speedometer Repair</h3>
              <p className="text-gray-600 mb-4">
                Solutions to fix faulty digital speedometers and instrument clusters.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold">€49.99</span>
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
                src="/images/lcd-display.jpg"
                alt="LCD Display Repair"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">LCD Display Repair</h3>
              <p className="text-gray-600 mb-4">
                Fix missing pixels, dim displays, and other LCD panel issues in dashboards.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold">€59.99</span>
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
                src="/images/custom-gauges.jpg"
                alt="Custom Gauge Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Custom Gauge Solutions</h3>
              <p className="text-gray-600 mb-4">
                Specialized files for installing and calibrating custom gauges and displays.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold">€79.99</span>
                <Button variant="primary" size="sm" href="/dashboard/custom-gauges">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Vehicles Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Compatible Vehicles
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Our dashboard solutions are compatible with a wide range of vehicles. Below are the most common
            makes and models we support. If your vehicle is not listed, please contact us for availability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-semibold mb-2">BMW</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>3 Series (E90, E92, F30, G20)</li>
                <li>5 Series (E60, F10, G30)</li>
                <li>7 Series (E65, F01, G11)</li>
                <li>X5, X6, X3, X1</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-semibold mb-2">Mercedes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>C-Class (W203, W204, W205)</li>
                <li>E-Class (W211, W212, W213)</li>
                <li>S-Class (W221, W222)</li>
                <li>ML, GL, GLE, GLC</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-semibold mb-2">Audi</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>A3, A4, A5, A6</li>
                <li>Q3, Q5, Q7</li>
                <li>TT</li>
                <li>R8</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-semibold mb-2">Volkswagen</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Golf, Polo</li>
                <li>Passat, CC</li>
                <li>Tiguan, Touareg</li>
                <li>Jetta, Arteon</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-semibold mb-2">Volvo</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>S60, S90</li>
                <li>V60, V90</li>
                <li>XC60, XC90</li>
                <li>C30, C70</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-md p-3">
              <h3 className="font-semibold mb-2">Other Makes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Toyota, Lexus</li>
                <li>Honda, Acura</li>
                <li>Ford, Jaguar, Land Rover</li>
                <li>Porsche, Alfa Romeo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}