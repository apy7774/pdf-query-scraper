
/**
 * Application configuration
 */
export const config = {
  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.web-scrape-search.dev',
    useMockData: false, // Force real data by default
  },
  
  // Feature flags
  features: {
    enableAdvancedSearch: import.meta.env.VITE_ENABLE_ADVANCED_SEARCH === 'true',
    enableGoogleSearch: true,
  }
};
