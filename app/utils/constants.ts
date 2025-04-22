// app/utils/constants.ts

// Application information
export const APP_NAME = 'AutoTechno';
export const APP_DESCRIPTION = 'Professional ECU files and automotive software solutions for all major vehicle brands.';
export const COMPANY_NAME = 'AutoTechno Brahim';
export const CONTACT_EMAIL = 'support@autotechno.com';
export const CONTACT_PHONE = '+123 456 7890';
export const COMPANY_LOCATION = 'Tunis, Tunisia';

// API endpoints (for frontend usage)
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    CHECK: '/api/auth/check',
  },
  ECU: {
    LIST: '/api/ecu',
    DETAIL: (id: string) => `/api/ecu/${id}`,
    SEARCH: '/api/ecu/search',
    UPLOAD: '/api/ecu/upload',
  },
  AIRBAG: {
    LIST: '/api/airbag',
    DETAIL: (id: string) => `/api/airbag/${id}`,
  },
  DASHBOARD: {
    LIST: '/api/dashboard',
    DETAIL: (id: string) => `/api/dashboard/${id}`,
  },
  SOFTWARE: {
    LIST: '/api/software',
    DETAIL: (id: string) => `/api/software/${id}`,
  },
  USER: {
    PROFILE: '/api/user/profile',
    ORDERS: '/api/user/orders',
    DOWNLOADS: '/api/user/downloads',
  },
};

// Frontend routes
export const ROUTES = {
  HOME: '/',
  ECU: {
    INDEX: '/ecu',
    BRAND: (brandId: string) => `/ecu/${brandId}`,
    FILE: (fileId: string) => `/ecu/file/${fileId}`,
    UPLOAD: '/ecu/upload',
  },
  AIRBAG: {
    INDEX: '/airbag',
    SOLUTIONS: '/airbag/solutions',
    DETAIL: (solutionId: string) => `/airbag/solution/${solutionId}`,
  },
  DASHBOARD: {
    INDEX: '/dashboard',
    SOLUTIONS: '/dashboard/solutions',
    DETAIL: (solutionId: string) => `/dashboard/solution/${solutionId}`,
  },
  SOFTWARE: {
    INDEX: '/software',
    DETAIL: (softwareId: string) => `/software/${softwareId}`,
    DOWNLOAD: (softwareId: string) => `/software/download/${softwareId}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/user/profile',
    ORDERS: '/user/orders',
    DOWNLOADS: '/user/downloads',
    SETTINGS: '/user/settings',
  },
  ADMIN: {
    DASHBOARD: '/admin',
    ECU_FILES: '/admin/ecu-files',
    USERS: '/admin/users',
    ORDERS: '/admin/orders',
    SETTINGS: '/admin/settings',
  },
  STATIC: {
    ABOUT: '/about',
    CONTACT: '/contact',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    COOKIES: '/cookies',
    FAQ: '/faq',
  },
};

// ECU file categories
export const ECU_CATEGORIES = [
  { id: 'performance', name: 'Performance' },
  { id: 'economy', name: 'Economy' },
  { id: 'emissions', name: 'Emissions' },
  { id: 'transmission', name: 'Transmission' },
  { id: 'diagnostics', name: 'Diagnostics' },
  { id: 'custom', name: 'Custom' },
];

// ECU systems
export const ECU_SYSTEMS = [
  { id: 'edc17', name: 'EDC17' },
  { id: 'med17', name: 'MED17' },
  { id: 'msd80', name: 'MSD80' },
  { id: 'me9', name: 'ME9' },
  { id: 'dq250', name: 'DQ250 DSG' },
  { id: 'zf8hp', name: 'ZF 8HP' },
  { id: 'bosch', name: 'Bosch' },
  { id: 'siemens', name: 'Siemens' },
  { id: 'continental', name: 'Continental' },
];

// User roles and permissions
export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
  GUEST = 'guest',
}

// File types allowed for upload
export const ALLOWED_FILE_TYPES = [
  '.bin',
  '.ori',
  '.hex',
  '.frf',
  '.md5',
  '.ecu',
  '.kfx',
  '.zip',
];

// Maximum file size for uploads (in bytes)
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB