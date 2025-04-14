
import { SearchResult } from "@/types/types";
import { toast } from "sonner";
import { config } from "@/config/config";

// Use import.meta.env for environment variables with Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || config.api.baseUrl || "https://api.web-scrape-search.dev"; 

/**
 * Search PDFs through the backend API
 * @param query Search query string
 * @param sites Optional array of specific ICB sites to search
 * @returns Promise with search results
 */
export const searchPDFsAPI = async (query: string, sites?: string[]): Promise<SearchResult[]> => {
  try {
    console.log(`Searching with query "${query}" and sites:`, sites);
    console.log(`Using API endpoint: ${API_BASE_URL}/api/search-icb`);
    
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    // Use real search API - no fallbacks
    const response = await fetch(`${API_BASE_URL}/api/search-icb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        query,
        sites: sites && sites.length > 0 ? sites : undefined,  // Only send sites if they're provided
        maxResults: 20 // Limit the number of results to improve performance
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Server error: ${response.status}`;
      console.error("API error response:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("API returned data:", data);
    return data.results || []; // Ensure we always return an array, even if results is undefined
  } catch (error) {
    console.error("Search API error:", error);
    // Don't use mock data as fallback - let the error propagate to be handled by the caller
    throw error;
  }
};
