// app/utils/formatters.ts

/**
 * Format a date string to a more readable format
 * @param dateString ISO date string or Date object
 * @param options Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
    dateString: string | Date,
    options: {
      format?: 'short' | 'medium' | 'long'; // Output format style
      includeTime?: boolean;                // Whether to include time
    } = {}
  ): string => {
    const { format = 'medium', includeTime = false } = options;
    
    const date = typeof dateString === 'string' 
      ? new Date(dateString) 
      : dateString;
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
  
    // Format options based on the requested format
    let formatOptions: Intl.DateTimeFormatOptions = {};
    
    switch (format) {
      case 'short':
        formatOptions = { 
          day: 'numeric', 
          month: 'numeric', 
          year: 'numeric'
        };
        break;
      case 'medium':
        formatOptions = { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric'
        };
        break;
      case 'long':
        formatOptions = { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          weekday: 'long'
        };
        break;
    }
    
    // Add time formatting if requested
    if (includeTime) {
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';
    }
    
    return date.toLocaleDateString('en-US', formatOptions);
  };
  
  /**
   * Format a file size in bytes to a human-readable format
   * @param bytes File size in bytes
   * @param decimals Number of decimal places
   * @returns Formatted file size string (e.g., "1.5 MB")
   */
  export const formatFileSize = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };
  
  /**
   * Format a price to a standardized currency format
   * @param price Price as number or string
   * @param currency Currency code (default: EUR)
   * @param locale Locale for formatting (default: en-US)
   * @returns Formatted price string
   */
  export const formatPrice = (
    price: number | string,
    currency: string = 'EUR',
    locale: string = 'en-US'
  ): string => {
    // If price is a string with a currency symbol, extract the numeric value
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.]/g, '')) 
      : price;
    
    if (isNaN(numericPrice)) {
      return 'Invalid price';
    }
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericPrice);
  };
  
  /**
   * Truncate a string to a specified length and add ellipsis if needed
   * @param text Text to truncate
   * @param maxLength Maximum length of the truncated text
   * @returns Truncated text
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    
    // Try to truncate at a word boundary
    const truncated = text.substring(0, maxLength).replace(/\s+\S*$/, '');
    
    return truncated + '...';
  };
  
  /**
   * Format a phone number to a standardized format
   * @param phoneNumber Phone number string
   * @returns Formatted phone number
   */
  export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if we have an international format
    if (cleaned.startsWith('1') && cleaned.length === 11) {
      // US format: +1 (XXX) XXX-XXXX
      return `+1 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
    } else if (cleaned.length === 10) {
      // Generic 10-digit format: (XXX) XXX-XXXX
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    }
    
    // If it doesn't match standard formats, return as is
    return phoneNumber;
  };
  
  /**
   * Convert a string to slug format (for URLs)
   * @param text Text to convert to slug
   * @returns URL-friendly slug
   */
  export const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')    // Remove non-word characters
      .replace(/\-\-+/g, '-')      // Replace multiple hyphens with single hyphen
      .replace(/^-+/, '')          // Trim hyphens from start
      .replace(/-+$/, '');         // Trim hyphens from end
  };
  
  /**
   * Format a file name for display by removing extension and special characters
   * @param fileName Original file name
   * @returns Cleaned file name
   */
  export const formatFileName = (fileName: string): string => {
    // Remove file extension
    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
    
    // Replace underscores and hyphens with spaces
    return nameWithoutExtension
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };
  
  /**
   * Create initials from a name (e.g., "John Doe" -> "JD")
   * @param name Full name
   * @param maxInitials Maximum number of initials to include
   * @returns Initials string
   */
  export const getInitials = (name: string, maxInitials: number = 2): string => {
    if (!name) return '';
    
    const parts = name.split(' ').filter(part => part.length > 0);
    
    if (parts.length === 0) return '';
    
    if (parts.length === 1) {
      // For single names, use the first two characters
      return parts[0].substring(0, maxInitials).toUpperCase();
    }
    
    // For multiple names, take initials from first and last parts
    if (parts.length > maxInitials) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    
    // Take initials from each part
    return parts.slice(0, maxInitials).map(part => part[0]).join('').toUpperCase();
  };