
import { useState } from "react";
import { SearchResult } from "@/types/types";
import ResultCard from "./ResultCard";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

interface ResultsListProps {
  results: SearchResult[];
}

const ResultsList = ({ results }: ResultsListProps) => {
  const [sortBy, setSortBy] = useState<"relevance" | "date">("date");
  
  // Safely sort results - handle invalid dates and empty arrays
  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      // Handle invalid dates
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      
      return dateB - dateA; // Sort by newest first
    }
    // Sort by match count (relevance) as fallback
    return b.matches.length - a.matches.length;
  });

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700">Search Results</h3>
        <div className="flex items-center gap-2 text-sm">
          <FilterIcon size={16} className="text-gray-500" />
          <span className="text-gray-500">Sort by:</span>
          <Button
            variant={sortBy === "relevance" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("relevance")}
            className="h-8"
          >
            Relevance
          </Button>
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
            className="h-8"
          >
            Date
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedResults.map((result, index) => (
          <ResultCard key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
