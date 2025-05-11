// app/airbag/page.tsx
import { SearchBar } from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Image from 'next/image';
import AccordionFAQ from '../components/ui/AccordionFAQ';

export default function AirbagPage() {
  // FAQ data
  const faqItems = [
    {
      question: "How does airbag module reset work?",
      answer: "Our airbag reset solutions provide the software needed to clear crash data from the airbag control module. This process removes fault codes and resets the module to its original state, allowing for proper operation without the need for expensive module replacement."
    },
    {
      question: "Will this fix my airbag light on the dashboard?",
      answer: "In most cases, yes. If the airbag warning light is on due to crash data or fault codes stored in the module, our reset solutions will clear these codes and turn off the warning light. However, if there is a physical fault with the airbag system components, additional repairs may be needed."
    },
    {
      question: "What vehicles are supported?",
      answer: "We offer solutions for all major vehicle brands including BMW, Mercedes, Audi, Volkswagen, Toyota, Honda, Ford, and many more. You can use the search function to find solutions specific to your vehicle make and model."
    },
    {
      question: "Do I need special hardware to use these solutions?",
      answer: "Most of our airbag solutions require a standard OBD2 diagnostic interface compatible with your vehicle. Some advanced solutions may require specific interfaces or adapters, which will be clearly specified in the product description."
    },
    {
      question: "How long does the reset process take?",
      answer: "The airbag reset process typically takes between 10-30 minutes, depending on the vehicle make and model. Our solutions are designed to be efficient and straightforward, with step-by-step instructions to guide you through the entire process."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="w-full bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">AIRBAG SOLUTIONS</h1>
          <p className="text-gray-400">
            Professional airbag reset services and dashboard solutions
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full bg-gray-200 py-4 border-b border-gray-300">
        <div className="container mx-auto px-4">
          <SearchBar placeholder="Search airbag solutions by make, model..." />
        </div>
      </section>

      {/* Hero/Info Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Airbag Module Reset Solutions
              </h2>
              <p className="text-gray-600 mb-4">
                Our airbag solutions help reset crash data, clear fault codes, and restore proper 
                functionality to your vehicle&apos;s safety systems. We provide professional-grade 
                solutions for all major vehicle manufacturers.
              </p>
                <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Clear crash data and fault codes</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Reset airbag modules after deployment</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Restore dashboard functionality</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black">Compatible with all major vehicle brands</span>
                </li>
                </ul>
              <Button
                variant="primary"
                size="lg"
                href="/airbag/solutions"
              >
                Browse Solutions
              </Button>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-80 z-10"></div>
              <Image
                src="/images/airbag-hero.png"
                alt="Airbag module reset service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">Professional Solutions</h3>
                  <p className="text-lg">Save time and money with our tested solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Our Airbag Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/airbag-reset.png"
                alt="Airbag Module Reset"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Airbag Module Reset</h3>
              <p className="text-gray-600 mb-4">
                Complete reset of airbag control modules after deployment or crash data detection.
              </p>
              <Button variant="primary" size="sm" href="/airbag/module-reset">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/srs-repair.png"
                alt="SRS System Repair"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">SRS System Repair</h3>
              <p className="text-gray-600 mb-4">
                Software solutions for SRS system faults and dashboard warning lights.
              </p>
              <Button variant="primary" size="sm" href="/airbag/srs-repair">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/crash-data.png"
                alt="Crash Data Clearing"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Crash Data Clearing</h3>
              <p className="text-gray-600 mb-4">
                Remove crash data from vehicle ECUs and restore normal system operation.
              </p>
              <Button variant="primary" size="sm" href="/airbag/crash-data">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Frequently Asked Questions
        </h2>
        
        <AccordionFAQ items={faqItems} />
      </section>
    </main>
  );
}