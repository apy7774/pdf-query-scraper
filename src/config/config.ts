
/**
 * Application configuration
 */
export const config = {
  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
    useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  },
  
  // Feature flags
  features: {
    enableAdvancedSearch: import.meta.env.VITE_ENABLE_ADVANCED_SEARCH === 'true',
    enableGoogleSearch: true,
  }
};
