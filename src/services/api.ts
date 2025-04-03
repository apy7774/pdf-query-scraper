
import { SearchResult } from "@/types/types";
import { toast } from "sonner";
import { config } from "@/config/config";

const API_BASE_URL = config.api.baseUrl;

/**
 * Search PDFs through the backend API
 * @param query Search query string
 * @returns Promise with search results
 */
export const searchPDFsAPI = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Server error: ${response.status}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
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
