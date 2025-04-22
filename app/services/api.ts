'use client';

/**
 * API service for handling HTTP requests
 */
class ApiService {
  /**
   * Base URL for API requests
   */
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

  /**
   * Default headers for API requests
   */
  private defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  /**
   * Get authentication headers using token from localStorage
   * @returns Headers with authentication token
   */
  private getAuthHeaders(): HeadersInit {
    if (typeof window === 'undefined') {
      return this.defaultHeaders;
    }

    const token = localStorage.getItem('autotechno_token');
    
    if (!token) {
      return this.defaultHeaders;
    }

    return {
      ...this.defaultHeaders,
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Handle API response
   * @param response Fetch response object
   * @returns Promise with response data
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to get error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `API error ${response.status}: ${response.statusText}`);
      } catch (error) {
        // If parsing fails, throw generic error
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(`API error ${response.status}: ${response.statusText}`);
      }
    }

    // Return parsed JSON response
    return response.json();
  }

  /**
   * Perform GET request
   * @param endpoint API endpoint
   * @param requireAuth Whether authentication is required
   * @returns Promise with response data
   */
  async get<T>(endpoint: string, requireAuth: boolean = false): Promise<T> {
    const headers = requireAuth ? this.getAuthHeaders() : this.defaultHeaders;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers,
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Perform POST request
   * @param endpoint API endpoint
   * @param data Request body data
   * @param requireAuth Whether authentication is required
   * @returns Promise with response data
   */
  async post<T, U = unknown>(endpoint: string, data: U, requireAuth: boolean = false): Promise<T> {
    const headers = requireAuth ? this.getAuthHeaders() : this.defaultHeaders;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Perform PUT request
   * @param endpoint API endpoint
   * @param data Request body data
   * @param requireAuth Whether authentication is required
   * @returns Promise with response data
   */
  async put<T, U = unknown>(endpoint: string, data: U, requireAuth: boolean = false): Promise<T> {
    const headers = requireAuth ? this.getAuthHeaders() : this.defaultHeaders;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Perform DELETE request
   * @param endpoint API endpoint
   * @param requireAuth Whether authentication is required
   * @returns Promise with response data
   */
  async delete<T>(endpoint: string, requireAuth: boolean = false): Promise<T> {
    const headers = requireAuth ? this.getAuthHeaders() : this.defaultHeaders;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers,
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Upload a file
   * @param endpoint API endpoint
   * @param formData Form data with file
   * @param requireAuth Whether authentication is required
   * @returns Promise with response data
   */
  async uploadFile<T>(endpoint: string, formData: FormData, requireAuth: boolean = true): Promise<T> {
    // For file uploads, we remove the Content-Type header to let the browser set it with the boundary
    const headers: HeadersInit = {};
    
    if (requireAuth) {
      const token = localStorage.getItem('autotechno_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    return this.handleResponse<T>(response);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;