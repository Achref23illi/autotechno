// app/ecu/page.tsx
import { SearchBar } from '../components/ui/SearchBar';
import CarBrandGrid from '../components/ui/CarBrandGrid';
import { carBrands } from '../data/brands';

export default function ECUPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="w-full bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">ECU FILES</h1>
          <p className="text-gray-400">
            Browse our collection of ECU files for various vehicle brands
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="w-full bg-gray-200 py-4 border-b border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <SearchBar placeholder="Search ECU files..." />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Filter by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option>All Files</option>
              <option>Original Files</option>
              <option>Tuned Files</option>
            </select>
          </div>
        </div>
      </section>

      {/* Brands Grid Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Brands
        </h2>
        <CarBrandGrid brands={carBrands} />
      </section>

      {/* Latest Files Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Latest ECU Files</h2>
          <button className="text-blue-600 hover:text-blue-800">View All</button>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 mb-4 border-l-4 border-blue-600">
          <div className="flex justify-between mb-2">
            <div>
              <span className="font-semibold">BMW M4 3.0T G82 - Stage 1</span>
              <span className="text-gray-500 ml-2">EDC17C64 system</span>
            </div>
            <span className="text-gray-500 text-sm">April 22, 2025</span>
          </div>
          <p className="text-gray-600 mb-3">
            Performance tune for BMW M4 3.0T G82 models. Increases power to 520hp and 650nm of torque.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Original</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Stage 1</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 mb-4 border-l-4 border-blue-600">
          <div className="flex justify-between mb-2">
            <div>
              <span className="font-semibold">Audi RS6 4.0 TFSI - Stage 2</span>
              <span className="text-gray-500 ml-2">MED17 system</span>
            </div>
            <span className="text-gray-500 text-sm">April 21, 2025</span>
          </div>
          <p className="text-gray-600 mb-3">
            Stage 2 tune for Audi RS6 4.0 TFSI. Includes decat, increased boost pressure, and optimized timing.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Original</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Stage 2</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700">
              Download
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 border-l-4 border-blue-600">
          <div className="flex justify-between mb-2">
            <div>
              <span className="font-semibold">Mercedes C63 AMG - ECO Tune</span>
              <span className="text-gray-500 ml-2">ME9 system</span>
            </div>
            <span className="text-gray-500 text-sm">April 20, 2025</span>
          </div>
          <p className="text-gray-600 mb-3">
            Eco-friendly tune for Mercedes C63 AMG. Optimizes fuel consumption while maintaining performance.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Original</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">ECO</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700">
              Download
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}