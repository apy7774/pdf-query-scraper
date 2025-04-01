
import { useState } from "react";
import { SearchResult, Match } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const displayMatches = expanded ? result.matches : result.matches.slice(0, 2);
  const hasMoreMatches = result.matches.length > 2;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-blue-800 line-clamp-1">
            {result.title}
          </CardTitle>
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
            {result.matches.length} {result.matches.length === 1 ? 'match' : 'matches'}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <Clock size={14} />
          <span>{formatDate(result.date)}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="text-sm mb-3">
          <span className="font-medium">Source: </span>
          <span className="text-gray-600">{result.source}</span>
        </div>
        
        <Separator className="my-3" />
        
        <div className="space-y-3">
          {displayMatches.map((match, index) => (
            <MatchItem key={index} match={match} />
          ))}
        </div>
        
        {hasMoreMatches && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full text-gray-600 hover:text-gray-900 flex items-center justify-center"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                Show {result.matches.length - 2} more matches
              </>
            )}
          </Button>
        )}
      </CardContent>

      <CardFooter className="bg-gray-50 pt-3 pb-3 flex justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <FileText size={14} className="mr-1" />
          <span>{result.fileSize}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-700 border-blue-200 hover:bg-blue-50"
          onClick={() => window.open(result.url, '_blank')}
        >
          View PDF <ExternalLink size={14} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const MatchItem = ({ match }: { match: Match }) => (
  <div className="text-sm border-l-2 border-blue-300 pl-3 py-1">
    <div className="font-medium text-gray-700 mb-1">Page {match.page}</div>
    <p className="text-gray-600 leading-relaxed">
      {match.textBefore}
      <span className="bg-yellow-100 font-medium">{match.matchedText}</span>
      {match.textAfter}
    </p>
  </div>
);

export default ResultCard;
