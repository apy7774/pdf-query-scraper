
import { SearchResult } from "@/types/types";
import { toast } from "sonner";
import { config } from "@/config/config";
import { icbSites } from "@/data/icbSites";

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
 * This now uses all ICB sites instead of just 3
 * @param query Search query string
 * @param sites Optional array of specific ICB sites to search
 * @returns Promise with search results (now returns directly to the app)
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
      const siteQueries = icbSites.map(site => `site:${site.url}`).join(" OR ");
      searchQuery = `(${siteQueries}) ${query}`;
    }
    
    // Instead of opening Google in a new tab, return mock results to display in the app
    // In a real app, we would make an API call here or use a proxy to get real results
    toast.info("Using fallback search method. Displaying available results in-app.");
    
    // Return a basic result set that indicates we're using the fallback
    return [{
      title: `Fallback Search Results for "${query}"`,
      url: "#",
      date: new Date().toISOString().split('T')[0],
      source: "Fallback Search",
      fileSize: "N/A",
      matches: [{
        page: 1,
        textBefore: "Your search query: ",
        matchedText: query,
        textAfter: " - Please try again later when the primary search API is available."
      }]
    }];
  } catch (error) {
    console.error("Error in fallback search:", error);
    return [];
  }
};
