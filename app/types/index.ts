// app/types/index.ts

// User-related types
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt?: string;
    avatar?: string;
  }
  
  export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    USER = 'user',
    GUEST = 'guest',
  }
  
  // Car brand types
  export interface Brand {
    id: string;
    name: string;
    logo: string;
    description?: string;
    featured?: boolean;
  }
  
  // ECU file types
  export interface ECUFile {
    id: string;
    title: string;
    description: string;
    brandId: string;
    model?: string;
    year?: string;
    system?: string;
    date: string;
    tags?: string[];
    category?: string;
    price?: string | number;
    isOriginal?: boolean;
    downloadUrl?: string;
    commentCount?: number;
    fileSize?: number;
    previewUrl?: string;
    compatibility?: string[];
  }
  
  // Vehicle information
  export interface Vehicle {
    brandId: string;
    model: string;
    year: string;
    engine?: string;
    power?: string;
    torque?: string;
    transmission?: string;
    ecu?: string;
  }
  
  // Airbag solution types
  export interface AirbagSolution {
    id: string;
    title: string;
    description: string;
    brandId: string;
    models: string[];
    compatibility: string;
    price: string | number;
    date: string;
    featured?: boolean;
    downloadUrl?: string;
    fileSize?: number;
  }
  
  // Dashboard solution types
  export interface DashboardSolution {
    id: string;
    title: string;
    description: string;
    brandId: string;
    models: string[];
    compatibility: string;
    price: string | number;
    date: string;
    featured?: boolean;
    downloadUrl?: string;
    fileSize?: number;
  }
  
  // Software product types
  export interface SoftwareProduct {
    id: string;
    name: string;
    category: string;
    description: string;
    features: string[];
    price: number;
    image: string;
    compatibility: string;
    version?: string;
    releaseDate?: string;
    downloadUrl?: string;
    requirements?: SystemRequirements;
  }
  
  export interface SystemRequirements {
    os: string[];
    processor: string;
    memory: string;
    storage: string;
    additional?: string[];
  }
  
  // Order and transaction types
  export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    paymentMethod: string;
    paymentId?: string;
    invoice?: string;
  }
  
  export interface OrderItem {
    id: string;
    productId: string;
    productType: 'ecu' | 'airbag' | 'dashboard' | 'software';
    title: string;
    price: number;
    quantity: number;
  }
  
  export enum OrderStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded',
  }
  
  // API response types
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
    status: number;
    success: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  // Auth related types
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  // Filter and search types
  export interface FilterOptions {
    brandId?: string;
    category?: string;
    year?: string;
    system?: string;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }
  
  // Comment and rating types
  export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: string;
    rating?: number;
  }
  
  // File upload types
  export interface FileUploadResult {
    fileName: string;
    fileSize: number;
    fileType: string;
    url: string;
  }
  
  // Notification types
  export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    type: NotificationType;
    link?: string;
  }
  
  export enum NotificationType {
    ORDER = 'order',
    SYSTEM = 'system',
    PRODUCT = 'product',
    ACCOUNT = 'account',
  }
  
  // Search result types
  export interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: 'ecu' | 'airbag' | 'dashboard' | 'software' | 'brand';
    url: string;
    matches: string[];
  }
  
  // Dashboard statistics types
  export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalUsers: number;
    recentOrders: Order[];
    topProducts: {
      id: string;
      title: string;
      sales: number;
      revenue: number;
    }[];
    salesByMonth: {
      month: string;
      sales: number;
    }[];
  }

  // Token system types
  export interface TokenPackage {
    id: string;
    name: string;
    tokens: number;
    price: number;
    discountPercentage?: number;
    popular?: boolean;
  }

  export interface UserTokens {
    userId: string;
    balance: number;
    transactions: TokenTransaction[];
  }

  export interface TokenTransaction {
    id: string;
    userId: string;
    amount: number;
    type: 'purchase' | 'usage';
    description: string;
    createdAt: string;
    paymentMethod?: string;
    paymentId?: string;
  }