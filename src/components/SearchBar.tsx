
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Globe, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { icbSites } from "@/data/icbSites";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SearchBarProps {
  onSearch: (query: string, selectedSite?: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [showAlert, setShowAlert] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Pass empty string when "all" is selected
      onSearch(query.trim(), selectedSite === "all" ? "" : selectedSite);
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
      {showAlert && (
        <Alert className="mb-4 bg-blue-50 border-blue-100">
          <AlertCircle className="h-4 w-4 text-blue-700" />
          <AlertDescription className="text-blue-700">
            This tool searches across NHS ICB websites. For best results, use specific terms and filter by site if needed.
            <button 
              className="ml-2 text-blue-800 font-medium underline"
              onClick={() => setShowAlert(false)}
            >
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium">NHS ICB Info Searcher</h2>
          <p className="text-sm text-gray-500">
            Search for specific content across NHS Integrated Care Board (ICB) websites.
            For example: "find mentions of pathology in NHS ICB minutes"
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
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
          
          <div className="w-full md:w-72">
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                <SelectValue placeholder="All ICB Sites" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ICB Sites</SelectItem>
                {icbSites.map((site) => (
                  <SelectItem key={site.url} value={site.url}>
                    {site.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="h-12 px-6 bg-blue-700 hover:bg-blue-800"
              disabled={!query.trim()}
            >
              Search ICBs
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
          Tip: Be specific with your search terms for better results. You can filter your search to a specific ICB site using the dropdown menu.
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
