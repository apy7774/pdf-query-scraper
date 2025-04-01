
/**
 * Formats a date string into a more readable format
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  // Check if date is valid
  if (!dateString) return 'Unknown date';
  
  try {
    const date = new Date(dateString);
    
    // If invalid date, return original string
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // Format date: Month DD, YYYY (e.g., March 15, 2023)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};
