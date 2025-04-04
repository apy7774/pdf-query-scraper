
import { SearchResult } from "@/types/types";
import { toast } from "sonner";
import { searchPDFsAPI, fallbackSearchUsingGoogle } from "@/services/api";
import { getMockSearchResults } from "@/data/mockSearchResults";

/**
 * Search PDFs using the backend API
 * Falls back to mock data if API_USE_MOCK_DATA environment variable is set
 * @param query Search query string
 * @param sites Optional array of specific ICB sites to search
 */
export const searchPDFs = async (query: string, sites?: string[]): Promise<SearchResult[]> => {
  // Force using real API regardless of environment unless explicitly instructed to use mock data
  // This ensures the app always uses real data by default
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  
  try {
    if (useMockData) {
      // Use mock data for development/testing
      toast.success("Search completed successfully (mock data)");
      return await getMockSearchResults(query, sites);
    } else {
      // Use real API for production
      try {
        console.log("Searching with real API using sites:", sites);
        // First try the main API
        const results = await searchPDFsAPI(query, sites);
        
        if (results.length > 0) {
          toast.success("Search completed successfully");
        } else {
          toast.info("No results found");
        }
        
        return results;
      } catch (error) {
        console.error("Error using primary search API:", error);
        
        // If main API fails, use the fallback Google search method
        // This now returns results to the app instead of redirecting
        toast.info("Using fallback search method...");
        return await fallbackSearchUsingGoogle(query, sites);
      }
    }
  } catch (error) {
    console.error("Error searching PDFs:", error);
    return [];
  }
};
