
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, AlertCircle, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { icbSites, getICBSitesByRegion } from "@/data/icbSites";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  onSearch: (query: string, selectedSites?: string[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sitesByRegion = getICBSitesByRegion();
  const regions = Object.keys(sitesByRegion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), selectedSites.length > 0 ? selectedSites : undefined);
    }
  };

  const handleSiteToggle = (siteUrl: string) => {
    setSelectedSites(prev => {
      if (prev.includes(siteUrl)) {
        return prev.filter(url => url !== siteUrl);
      } else {
        return [...prev, siteUrl];
      }
    });
  };

  const clearSelections = () => {
    setSelectedSites([]);
  };

  const getSelectedSitesLabel = () => {
    if (selectedSites.length === 0) {
      return "All ICB Sites";
    }
    if (selectedSites.length === 1) {
      const site = icbSites.find(site => site.url === selectedSites[0]);
      return site ? site.name : "1 site selected";
    }
    return `${selectedSites.length} sites selected`;
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
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full h-12 bg-gray-50 border-gray-200 justify-between font-normal">
                  <span className="text-sm truncate">{getSelectedSitesLabel()}</span>
                  <div className="flex items-center">
                    {selectedSites.length > 0 && (
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-1 mr-1 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearSelections();
                        }}
                      >
                        <X size={16} />
                      </Button>
                    )}
                    <SearchIcon className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 max-h-[400px] overflow-auto p-0">
                <div className="p-2">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md mb-2">
                    <span className="font-medium">Select sites</span>
                    {selectedSites.length > 0 && (
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs"
                        onClick={clearSelections}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                  
                  {regions.map((region) => (
                    <div key={region} className="mb-3">
                      <div className="text-sm font-semibold px-2 py-1.5 bg-gray-50 rounded">
                        {region}
                      </div>
                      <div className="mt-1">
                        {sitesByRegion[region].map((site) => (
                          <div 
                            key={site.url} 
                            className="flex items-center space-x-2 px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer"
                            onClick={() => handleSiteToggle(site.url)}
                          >
                            <Checkbox 
                              id={`site-${site.url}`}
                              checked={selectedSites.includes(site.url)}
                              onCheckedChange={() => handleSiteToggle(site.url)}
                              className="h-4 w-4 rounded-sm" 
                            />
                            <label 
                              htmlFor={`site-${site.url}`}
                              className="text-sm flex-grow cursor-pointer"
                            >
                              {site.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Button 
            type="submit" 
            className="h-12 px-6 bg-blue-700 hover:bg-blue-800"
            disabled={!query.trim()}
          >
            Search ICBs
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          Tip: Be specific with your search terms for better results. You can filter your search to specific ICB sites using the dropdown menu.
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
