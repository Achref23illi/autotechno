// app/components/ui/CarBrandGrid.tsx
import Image from 'next/image';
import Link from 'next/link';

type Brand = {
  id: string;
  name: string;
  logo: string;
};

interface CarBrandGridProps {
  brands: Brand[];
}

const CarBrandGrid = ({ brands }: CarBrandGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {brands.map((brand) => (
        <Link 
          key={brand.id} 
          href={`/ecu/${brand.id}`}
          className="bg-white p-4 rounded-md transition-transform hover:scale-105"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-full h-24 mb-2">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-blue-600 font-medium text-center">{brand.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarBrandGrid;