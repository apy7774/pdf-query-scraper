
import { SearchResult } from "@/types/types";
import { toast } from "sonner";
import { searchPDFsAPI } from "@/services/api";

/**
 * Search PDFs using the backend API
 * Returns real data or throws an error - no mock data fallbacks
 * @param query Search query string
 * @param sites Optional array of specific ICB sites to search
 */
export const searchPDFs = async (query: string, sites?: string[]): Promise<SearchResult[]> => {
  try {
    console.log("Searching with real API using sites:", sites);
    // Use the main API - no fallbacks to mock data
    const results = await searchPDFsAPI(query, sites);
    
    if (results.length > 0) {
      toast.success("Search completed successfully");
    } else {
      toast.info("No results found for your query");
    }
    
    return results;
  } catch (error) {
    console.error("Error searching PDFs:", error);
    // Don't use mock data as fallback - let the error propagate
    if (error instanceof Error) {
      toast.error(`Search failed: ${error.message}`);
    } else {
      toast.error("Search failed due to an unknown error");
    }
    throw error; // Rethrow the error to be handled by the calling component
  }
};
