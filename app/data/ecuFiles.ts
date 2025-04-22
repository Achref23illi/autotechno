// app/data/ecuFiles.ts
import { FileCardProps } from '../components/ui/FileCard';

// Extended type for ECU files
export interface ECUFile extends Omit<FileCardProps, 'className'> {
  brandId: string;
  model?: string;
  year?: string;
  category?: string;
  system?: string;
}

// Sample ECU files data
export const ecuFiles: ECUFile[] = [
  {
    id: 'ecu001',
    title: 'BMW M4 3.0T G82 - Stage 1',
    brandId: 'bmw',
    model: 'M4 3.0T G82',
    year: '2022',
    system: 'EDC17C64',
    description: 'Performance tune for BMW M4 3.0T G82 models. Increases power to 520hp and 650nm of torque.',
    date: '2025-04-22',
    tags: ['Stage 1', 'Performance'],
    category: 'performance',
    price: '€99.99',
    isOriginal: true,
    commentCount: 8,
  },
  {
    id: 'ecu002',
    title: 'Audi RS6 4.0 TFSI - Stage 2',
    brandId: 'audi',
    model: 'RS6 4.0 TFSI',
    year: '2021',
    system: 'MED17',
    description: 'Stage 2 tune for Audi RS6 4.0 TFSI. Includes decat, increased boost pressure, and optimized timing.',
    date: '2025-04-21',
    tags: ['Stage 2', 'Performance'],
    category: 'performance',
    price: '€149.99',
    isOriginal: true,
    commentCount: 5,
  },
  {
    id: 'ecu003',
    title: 'Mercedes C63 AMG - ECO Tune',
    brandId: 'mercedes',
    model: 'C63 AMG',
    year: '2020',
    system: 'ME9',
    description: 'Eco-friendly tune for Mercedes C63 AMG. Optimizes fuel consumption while maintaining performance.',
    date: '2025-04-20',
    tags: ['ECO', 'Fuel Efficiency'],
    category: 'economy',
    price: '€79.99',
    isOriginal: true,
    commentCount: 3,
  },
  {
    id: 'ecu004',
    title: 'Volkswagen Golf GTI - Stage 1+',
    brandId: 'volkswagen',
    model: 'Golf GTI',
    year: '2022',
    system: 'MED17.5',
    description: 'Stage 1+ tune for VW Golf GTI with hardware upgrades. Increases power and torque significantly.',
    date: '2025-04-19',
    tags: ['Stage 1+', 'Performance'],
    category: 'performance',
    price: '€89.99',
    isOriginal: true,
    commentCount: 12,
  },
  {
    id: 'ecu005',
    title: 'BMW 335i E92 - Turbo Upgrade',
    brandId: 'bmw',
    model: '335i E92',
    year: '2011',
    system: 'MSD80',
    description: 'Special tune for upgraded turbos on BMW 335i E92. Compatible with various aftermarket turbos.',
    date: '2025-04-18',
    tags: ['Turbo', 'Custom'],
    category: 'custom',
    price: '€129.99',
    isOriginal: false,
    commentCount: 6,
  },
  {
    id: 'ecu006',
    title: 'Audi S3 8V - DQ250 DSG Tune',
    brandId: 'audi',
    model: 'S3 8V',
    year: '2019',
    system: 'DQ250',
    description: 'Transmission tune for Audi S3 8V with DQ250 DSG. Improves shift times and launch control.',
    date: '2025-04-17',
    tags: ['Transmission', 'DSG'],
    category: 'transmission',
    price: '€69.99',
    isOriginal: true,
    commentCount: 4,
  },
  {
    id: 'ecu007',
    title: 'Mercedes E350d - DPF Off',
    brandId: 'mercedes',
    model: 'E350d',
    year: '2018',
    system: 'MED17.7',
    description: 'DPF off solution for Mercedes E350d. Removes DPF restrictions and improves performance.',
    date: '2025-04-16',
    tags: ['DPF Off', 'Diesel'],
    category: 'emissions',
    price: '€119.99',
    isOriginal: true,
    commentCount: 9,
  },
  {
    id: 'ecu008',
    title: 'BMW 520d F10 - EGR Delete',
    brandId: 'bmw',
    model: '520d F10',
    year: '2016',
    system: 'MSD87',
    description: 'EGR delete file for BMW 520d F10. Eliminates EGR-related issues and improves reliability.',
    date: '2025-04-15',
    tags: ['EGR Delete', 'Diesel'],
    category: 'emissions',
    price: '€89.99',
    isOriginal: true,
    commentCount: 7,
  },
  {
    id: 'ecu009',
    title: 'Audi A4 B8 2.0 TDI - DTC Removal',
    brandId: 'audi',
    model: 'A4 B8 2.0 TDI',
    year: '2014',
    system: 'EDC17C46',
    description: 'Complete DTC removal for Audi A4 B8 2.0 TDI. Eliminates fault codes for modified vehicles.',
    date: '2025-04-14',
    tags: ['DTC', 'Diesel'],
    category: 'diagnostics',
    price: '€59.99',
    isOriginal: true,
    commentCount: 3,
  },
  {
    id: 'ecu010',
    title: 'Mercedes CLA45 AMG - Stage 3',
    brandId: 'mercedes',
    model: 'CLA45 AMG',
    year: '2023',
    system: 'MED17.7.2',
    description: 'Aggressive Stage 3 tune for Mercedes CLA45 AMG. Requires upgraded turbo, injectors, and fuel pump.',
    date: '2025-04-13',
    tags: ['Stage 3', 'Performance'],
    category: 'performance',
    price: '€199.99',
    isOriginal: true,
    commentCount: 15,
  },
  {
    id: 'ecu011',
    title: 'BMW X5 M50d - Transmission Tune',
    brandId: 'bmw',
    model: 'X5 M50d',
    year: '2021',
    system: 'ZF8HP',
    description: 'Transmission calibration for BMW X5 M50d with ZF 8-speed. Improves shift quality and response time.',
    date: '2025-04-12',
    tags: ['Transmission', 'ZF8'],
    category: 'transmission',
    price: '€79.99',
    isOriginal: true,
    commentCount: 6,
  },
  {
    id: 'ecu012',
    title: 'Volkswagen Touareg 3.0 TDI - Adblue Off',
    brandId: 'volkswagen',
    model: 'Touareg 3.0 TDI',
    year: '2020',
    system: 'EDC17C64',
    description: 'Adblue/SCR removal solution for VW Touareg 3.0 TDI. Disables adblue system completely.',
    date: '2025-04-11',
    tags: ['Adblue Off', 'Diesel'],
    category: 'emissions',
    price: '€109.99',
    isOriginal: true,
    commentCount: 8,
  },
  {
    id: 'ecu013',
    title: 'Alfa Romeo Giulia QV - Pop & Bang',
    brandId: 'alfa-romeo',
    model: 'Giulia Quadrifoglio',
    year: '2022',
    system: 'Bosch MD1',
    description: 'Pop and bang map for Alfa Romeo Giulia Quadrifoglio. Adds dramatic exhaust sounds on deceleration.',
    date: '2025-04-10',
    tags: ['Pop & Bang', 'Performance'],
    category: 'performance',
    price: '€69.99',
    isOriginal: true,
    commentCount: 11,
  },
  {
    id: 'ecu014',
    title: 'Cadillac CTS-V - E85 Conversion',
    brandId: 'cadillac',
    model: 'CTS-V',
    year: '2019',
    system: 'E38',
    description: 'E85 flex fuel conversion for Cadillac CTS-V. Optimized for maximum power on E85 ethanol fuel.',
    date: '2025-04-09',
    tags: ['E85', 'Flex Fuel'],
    category: 'performance',
    price: '€139.99',
    isOriginal: true,
    commentCount: 7,
  },
  {
    id: 'ecu015',
    title: 'BMW M5 F90 - Burble Tune',
    brandId: 'bmw',
    model: 'M5 F90',
    year: '2023',
    system: 'MG1CS002',
    description: 'Burble tune for BMW M5 F90. Creates aggressive pops and bangs with minimal impact on reliability.',
    date: '2025-04-08',
    tags: ['Burble', 'Performance'],
    category: 'performance',
    price: '€89.99',
    isOriginal: true,
    commentCount: 9,
  },
];

// Function to get ECU files by brand
export const getEcuFilesByBrand = (brandId: string): ECUFile[] => {
  return ecuFiles.filter(file => file.brandId === brandId);
};

// Function to get the latest ECU files (for homepage)
export const getLatestEcuFiles = (limit: number = 5): ECUFile[] => {
  return [...ecuFiles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Function to get ECU files by year
export const getEcuFilesByYear = (year: string): ECUFile[] => {
  return ecuFiles.filter(file => file.year === year);
};

// Function to get ECU files by system
export const getEcuFilesBySystem = (system: string): ECUFile[] => {
  return ecuFiles.filter(file => file.system && file.system.includes(system));
};

// Function to filter by original/non-original files
export const getOriginalEcuFiles = (isOriginal: boolean = true): ECUFile[] => {
  return ecuFiles.filter(file => file.isOriginal === isOriginal);
};

// Function to sort ECU files by different criteria
export const sortEcuFiles = (
  files: ECUFile[],
  sortBy: 'date' | 'title' | 'price' = 'date',
  sortOrder: 'asc' | 'desc' = 'desc'
): ECUFile[] => {
  const sortedFiles = [...files];
  
  sortedFiles.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'price') {
      // Convert price strings to numbers for comparison
      const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
      const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
      return priceA - priceB;
    }
    return 0;
  });
  
  // Apply sort order
  if (sortOrder === 'desc') {
    sortedFiles.reverse();
  }
  
  return sortedFiles;
};

// Function to get featured or popular files (based on comment count)
export const getPopularEcuFiles = (limit: number = 5): ECUFile[] => {
  return [...ecuFiles]
    .sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
    .slice(0, limit);
};

// Function to get related files (based on similar brands, models, or categories)
export const getRelatedEcuFiles = (fileId: string, limit: number = 3): ECUFile[] => {
  const targetFile = ecuFiles.find(file => file.id === fileId);
  
  if (!targetFile) {
    return [];
  }
  
  // Filter files by same brand or category, excluding the target file
  const relatedFiles = ecuFiles.filter(file => 
    file.id !== fileId && 
    (file.brandId === targetFile.brandId || file.category === targetFile.category)
  );
  
  // Sort by relevance (same brand AND category first, then either brand or category)
  relatedFiles.sort((a, b) => {
    const aRelevance = (a.brandId === targetFile.brandId ? 1 : 0) + (a.category === targetFile.category ? 1 : 0);
    const bRelevance = (b.brandId === targetFile.brandId ? 1 : 0) + (b.category === targetFile.category ? 1 : 0);
    return bRelevance - aRelevance;
  });
  
  return relatedFiles.slice(0, limit);
};

// Function to get ECU files with advanced filtering
export interface ECUFilterOptions {
  brandId?: string;
  category?: string;
  year?: string;
  system?: string;
  searchTerm?: string;
  isOriginal?: boolean;
  sortBy?: 'date' | 'title' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export const filterEcuFiles = (options: ECUFilterOptions): ECUFile[] => {
  let result = [...ecuFiles];
  
  // Apply brand filter
  if (options.brandId) {
    result = result.filter(file => file.brandId === options.brandId);
  }
  
  // Apply category filter
  if (options.category) {
    result = result.filter(file => file.category === options.category);
  }
  
  // Apply year filter
  if (options.year) {
    result = result.filter(file => file.year === options.year);
  }
  
  // Apply system filter
  if (options.system) {
    result = result.filter(file => file.system && options.system && file.system.includes(options.system));
  }
  
  // Apply search term filter
  if (options.searchTerm) {
    const term = options.searchTerm.toLowerCase();
    result = result.filter(file => 
      file.title.toLowerCase().includes(term) || 
      file.description.toLowerCase().includes(term) ||
      (file.system && file.system.toLowerCase().includes(term)) ||
      (file.model && file.model.toLowerCase().includes(term))
    );
  }
  
  // Apply original filter
  if (options.isOriginal !== undefined) {
    result = result.filter(file => file.isOriginal === options.isOriginal);
  }
  
  // Apply sorting
  if (options.sortBy) {
    return sortEcuFiles(result, options.sortBy, options.sortOrder || 'desc');
  }
  
  return result;
};

// Function to get ECU files by category
export const getEcuFilesByCategory = (category: string): ECUFile[] => {
  return ecuFiles.filter(file => file.category === category);
};

// Function to search ECU files
export const searchEcuFiles = (query: string): ECUFile[] => {
  const searchTerm = query.toLowerCase();
  return ecuFiles.filter(file => 
    file.title.toLowerCase().includes(searchTerm) ||
    file.description.toLowerCase().includes(searchTerm) ||
    (file.system && file.system.toLowerCase().includes(searchTerm)) ||
    (file.model && file.model.toLowerCase().includes(searchTerm))
  );
};