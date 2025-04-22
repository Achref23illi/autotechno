// app/api/ecu/route.ts
import { NextResponse } from 'next/server';

// Mock ECU files data until we connect to a database
const mockEcuFiles = [
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
    price: 99.99,
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
    price: 149.99,
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
    price: 79.99,
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
    price: 89.99,
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
    price: 129.99,
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
    price: 69.99,
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
    price: 119.99,
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
    price: 89.99,
    isOriginal: true,
    commentCount: 7,
  },
];

// GET handler for ECU files
export async function GET(request: Request) {
  try {
    // Parse URL to get query parameters
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const brandId = searchParams.get('brandId');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const originalOnly = searchParams.get('originalOnly') === 'true';
    
    // Apply filters
    let filteredFiles = [...mockEcuFiles];
    
    // Filter by brand if specified
    if (brandId) {
      filteredFiles = filteredFiles.filter(file => file.brandId === brandId);
    }
    
    // Filter by category if specified
    if (category && category !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.category === category);
    }
    
    // Filter by search term if specified
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredFiles = filteredFiles.filter(file => 
        file.title.toLowerCase().includes(searchTerm) ||
        file.description.toLowerCase().includes(searchTerm) ||
        file.system.toLowerCase().includes(searchTerm) ||
        file.model.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by original files only if specified
    if (originalOnly) {
      filteredFiles = filteredFiles.filter(file => file.isOriginal);
    }
    
    // Return filtered files
    return NextResponse.json({
      files: filteredFiles,
      total: filteredFiles.length,
    });
  } catch (error) {
    console.error('Error fetching ECU files:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler for adding a new ECU file
export async function POST(request: Request) {
  try {
    // In a real app, this would validate authentication and permissions
    // For now, we'll just parse the request body
    const fileData = await request.json();
    
    // Validate required fields
    if (!fileData.title || !fileData.brandId || !fileData.description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real app, this would insert the file into a database
    // For now, we'll just return a success message
    return NextResponse.json({
      message: 'File added successfully',
      file: {
        id: `ecu${mockEcuFiles.length + 1}`,
        ...fileData,
        date: new Date().toISOString().split('T')[0],
        commentCount: 0,
      },
    });
  } catch (error) {
    console.error('Error adding ECU file:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}