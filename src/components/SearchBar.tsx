
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Globe } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleGoogleSearch = () => {
    if (query.trim()) {
      // Open Google search in a new tab
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query.trim())}`, '_blank');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium">Search PDF Documents</h2>
          <p className="text-sm text-gray-500">
            Enter a query to search for specific content within PDF documents. 
            For example: "find mentions of pathology in NHS ICB minutes"
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Enter your search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10 h-12 bg-gray-50 border-gray-200"
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="h-12 px-6 bg-blue-700 hover:bg-blue-800"
              disabled={!query.trim()}
            >
              Search PDFs
            </Button>
            <Button 
              type="button" 
              className="h-12 px-4 bg-green-600 hover:bg-green-700"
              disabled={!query.trim()}
              onClick={handleGoogleSearch}
            >
              <Globe className="mr-2" size={18} />
              Google
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Tip: Be specific with your search terms for better results. Use the Google search button to search the web for the same query.
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
