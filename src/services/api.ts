
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
    
    // Use real search API
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
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Server error: ${response.status}`;
      console.error("API error response:", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("API returned data:", data);
    return data.results || []; // Ensure we always return an array, even if results is undefined
  } catch (error) {
    console.error("Search API error:", error);
    if (error instanceof Error) {
      toast.error(`Search failed: ${error.message}`);
    } else {
      toast.error("Search failed due to an unknown error");
    }
    throw error;
  }
};

/**
 * Opens a Google search for the provided query in a new tab
 * @param query Search query string
 */
export const openGoogleSearch = (query: string): void => {
  if (!query.trim()) return;
  
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;
  window.open(googleSearchUrl, '_blank');
};

/**
 * Fallback local search function that searches using Google site: operator
 * @param query Search query string
 * @param sites Optional array of specific ICB sites to search
 * @returns Promise with search results
 */
export const fallbackSearchUsingGoogle = async (query: string, sites?: string[]): Promise<SearchResult[]> => {
  try {
    let searchQuery = query;
    
    // If specific sites are provided, use Google's site: operator
    if (sites && sites.length > 0) {
      // Create a search query with site: operators for each selected site
      const siteQueries = sites.map(site => `site:${site}`).join(" OR ");
      searchQuery = `(${siteQueries}) ${query}`;
    } else {
      // Search across all ICB sites with a combination of OR operators
      const siteQueries = [
        "site:bedfordshirelutonandmiltonkeynes.icb.nhs.uk",
        "site:cpics.org.uk",
        "site:hertsandwestessex.ics.nhs.uk",
        // Add more sites as needed from your list
      ].join(" OR ");
      
      searchQuery = `(${siteQueries}) ${query}`;
    }
    
    // Open Google search in a new tab
    openGoogleSearch(searchQuery);
    
    // Return empty results since we're just redirecting to Google
    return [];
  } catch (error) {
    console.error("Error in fallback search:", error);
    return [];
  }
};
