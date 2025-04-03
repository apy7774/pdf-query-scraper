
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultsList from "@/components/ResultsList";
import { SearchResult } from "@/types/types";
import { searchPDFs } from "@/utils/pdfUtils";
import { Toaster } from "@/components/ui/sonner";
import { icbSites } from "@/data/icbSites";

const Index = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSites, setSelectedSites] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string, sites?: string[]) => {
    setIsLoading(true);
    setQuery(searchQuery);
    setSelectedSites(sites || []);
    
    try {
      // If sites array is provided, we search in those sites, otherwise search all
      const searchResults = await searchPDFs(searchQuery, sites);
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching PDFs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the names of the selected sites for display
  const getSelectedSitesDescription = () => {
    if (selectedSites.length === 0) return "";
    
    if (selectedSites.length === 1) {
      const site = icbSites.find(s => s.url === selectedSites[0]);
      return site ? ` in ${site.name}` : "";
    }
    
    return ` in ${selectedSites.length} selected sites`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">NHS ICB Info Searcher</h1>
          <p className="mt-2 text-sm text-gray-600">
            Search for specific content across NHS Integrated Care Board (ICB) websites
          </p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <>
            {query && (
              <div className="mt-6 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {results.length === 0 
                    ? "No results found" 
                    : `Found ${results.length} results for "${query}"${getSelectedSitesDescription()}`}
                </h2>
              </div>
            )}
            <ResultsList results={results} />
          </>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto py-6 px-4 text-center text-gray-500 text-sm">
          NHS ICB Info Searcher - Search and extract content from NHS Integrated Care Board websites
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
