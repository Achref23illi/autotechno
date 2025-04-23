// app/other/page.tsx
import { SearchBar } from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Image from 'next/image';
import AccordionFAQ from '../components/ui/AccordionFAQ';

export default function OtherPage() {
  // FAQ items for the accordion
  const faqItems = [
    {
      question: "What types of immobilizer solutions do you offer?",
      answer: "We provide solutions for a wide range of immobilizer systems, including key programming for transponder keys, immobilizer bypass solutions for lost keys, and ECU immobilizer data modification."
    },
    {
      question: "Is mileage correction legal?",
      answer: "Mileage correction is a legitimate service when used for proper purposes such as replacing damaged instrument clusters, ECU replacements, or correcting technical errors. It is illegal to use these services to manipulate vehicle history for fraudulent purposes. Our services are provided for professional automotive technicians only."
    },
    {
      question: "How does remote programming work?",
      answer: "Our remote programming service uses secure remote access technology that allows our technicians to connect to your diagnostic device. You'll need an internet connection and one of our supported interfaces. Once connected, we can perform various programming tasks without needing to be physically present."
    },
    {
      question: "What diagnostic hardware do you recommend for beginners?",
      answer: "For beginners, we recommend starting with a universal OBD2 interface that supports multiple protocols, such as our AutoTechno Basic Kit. As you advance, you may want to consider more specialized tools like the ProDiag Elite or brand-specific interfaces depending on the vehicles you work with most frequently."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="w-full bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">OTHER SOLUTIONS</h1>
          <p className="text-gray-400">
            Additional automotive tools and specialized services
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full bg-gray-200 py-4 border-b border-gray-300">
        <div className="container mx-auto px-4">
          <SearchBar placeholder="Search for additional solutions..." />
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/immobilizer.jpg"
                alt="Immobilizer Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Immobilizer Solutions</h3>
              <p className="text-gray-600 mb-4">
                Key programming, immobilizer bypass, and lost key solutions for all major vehicle brands.
              </p>
              <Button variant="primary" size="sm" href="/other/immobilizer">
                View Solutions
              </Button>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/mileage.png"
                alt="Mileage Correction"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Mileage Correction</h3>
              <p className="text-gray-600 mb-4">
                Professional mileage calibration services for all digital dashboards and ECU systems.
              </p>
              <Button variant="primary" size="sm" href="/other/mileage">
                View Solutions
              </Button>
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/egr.jpg"
                alt="EGR Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">EGR/DPF Solutions</h3>
              <p className="text-gray-600 mb-4">
                EGR delete, DPF removal, and emissions optimization for improved engine performance.
              </p>
              <Button variant="primary" size="sm" href="/other/emissions">
                View Solutions
              </Button>
            </div>
          </div>
          
          {/* Service 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/remote.jpg"
                alt="Remote Programming"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Remote Programming</h3>
              <p className="text-gray-600 mb-4">
                Remote services for ECU programming, key coding, and module configuration.
              </p>
              <Button variant="primary" size="sm" href="/other/remote">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Service 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/training.jpg"
                alt="Technical Training"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Technical Training</h3>
              <p className="text-gray-600 mb-4">
                Professional training programs for automotive diagnostic and programming techniques.
              </p>
              <Button variant="primary" size="sm" href="/other/training">
                View Courses
              </Button>
            </div>
          </div>
          
          {/* Service 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/hardware.jpg"
                alt="Diagnostic Hardware"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Diagnostic Hardware</h3>
              <p className="text-gray-600 mb-4">
                Specialized diagnostic tools, interfaces, and hardware for ECU programming.
              </p>
              <Button variant="primary" size="sm" href="/other/hardware">
                Shop Hardware
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