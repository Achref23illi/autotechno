'use client';

import { ECUFile, ECUFilterOptions } from '../data/ecuFiles';
import { API_ROUTES } from '../utils/constants';

/**
 * Service for ECU file operations
 */
class ECUService {
  /**
   * Get all ECU files with optional filtering
   * @param options Filter options
   * @returns Promise with ECU files
   */
  async getECUFiles(options?: ECUFilterOptions): Promise<ECUFile[]> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (options?.brandId) {
        queryParams.append('brandId', options.brandId);
      }
      
      if (options?.category) {
        queryParams.append('category', options.category);
      }
      
      if (options?.year) {
        queryParams.append('year', options.year);
      }
      
      if (options?.system) {
        queryParams.append('system', options.system);
      }
      
      if (options?.searchTerm) {
        queryParams.append('search', options.searchTerm);
      }
      
      if (options?.isOriginal !== undefined) {
        queryParams.append('originalOnly', options.isOriginal.toString());
      }
      
      if (options?.sortBy) {
        queryParams.append('sortBy', options.sortBy);
        queryParams.append('sortOrder', options.sortOrder || 'desc');
      }
      
      // Make API request
      const url = `${API_ROUTES.ECU.LIST}?${queryParams.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ECU files: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error fetching ECU files:', error);
      throw error;
    }
  }
  
  /**
   * Get a single ECU file by ID
   * @param id ECU file ID
   * @returns Promise with ECU file
   */
  async getECUFileById(id: string): Promise<ECUFile> {
    try {
      const response = await fetch(API_ROUTES.ECU.DETAIL(id));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ECU file: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.file;
    } catch (error) {
      console.error(`Error fetching ECU file with ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Search ECU files by query
   * @param query Search query
   * @returns Promise with matching ECU files
   */
  async searchECUFiles(query: string): Promise<ECUFile[]> {
    try {
      const response = await fetch(`${API_ROUTES.ECU.SEARCH}?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to search ECU files: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error searching ECU files:', error);
      throw error;
    }
  }
  
  /**
   * Upload a new ECU file
   * @param fileData ECU file data and metadata
   * @param actualFile The file to upload
   * @returns Promise with the created ECU file
   */
  async uploadECUFile(fileData: Partial<ECUFile>, actualFile: File): Promise<ECUFile> {
    try {
      // Create form data
      const formData = new FormData();
      
      // Add file
      formData.append('file', actualFile);
      
      // Add metadata as JSON
      formData.append('metadata', JSON.stringify(fileData));
      
      // Make API request
      const response = await fetch(API_ROUTES.ECU.UPLOAD, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload ECU file: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.file;
    } catch (error) {
      console.error('Error uploading ECU file:', error);
      throw error;
    }
  }
  
  /**
   * Get ECU files by brand
   * @param brandId Brand ID
   * @returns Promise with ECU files for the brand
   */
  async getECUFilesByBrand(brandId: string): Promise<ECUFile[]> {
    return this.getECUFiles({ brandId });
  }
  
  /**
   * Get ECU files by category
   * @param category Category name
   * @returns Promise with ECU files for the category
   */
  async getECUFilesByCategory(category: string): Promise<ECUFile[]> {
    return this.getECUFiles({ category });
  }
  
  /**
   * Get the latest ECU files
   * @param limit Maximum number of files to return
   * @returns Promise with the latest ECU files
   */
  async getLatestECUFiles(limit: number = 5): Promise<ECUFile[]> {
    const files = await this.getECUFiles({ sortBy: 'date', sortOrder: 'desc' });
    return files.slice(0, limit);
  }
  
  /**
   * Get popular ECU files based on comment count
   * @param limit Maximum number of files to return
   * @returns Promise with popular ECU files
   */
  async getPopularECUFiles(limit: number = 5): Promise<ECUFile[]> {
    try {
      const response = await fetch(`${API_ROUTES.ECU.LIST}?sortBy=popularity&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch popular ECU files: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error fetching popular ECU files:', error);
      throw error;
    }
  }
  
  /**
   * Get related ECU files based on the given file ID
   * @param fileId Reference file ID
   * @param limit Maximum number of files to return
   * @returns Promise with related ECU files
   */
  async getRelatedECUFiles(fileId: string, limit: number = 3): Promise<ECUFile[]> {
    try {
      const response = await fetch(`${API_ROUTES.ECU.DETAIL(fileId)}/related?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch related ECU files: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error fetching related ECU files:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const ecuService = new ECUService();
export default ecuService;