
export interface Match {
  page: number;
  textBefore: string;
  matchedText: string;
  textAfter: string;
}

export interface SearchResult {
  title: string;
  url: string;
  date: string;
  source: string;
  fileSize: string;
  matches: Match[];
}
