
import { SearchResult } from "@/types/types";
import { toast } from "sonner";
import { searchPDFsAPI } from "@/services/api";
import { icbSites } from "@/data/icbSites";

/**
 * Search PDFs using the backend API
 * Falls back to mock data if API_USE_MOCK_DATA environment variable is set
 * @param query Search query string
 * @param site Optional specific ICB site to search
 */
export const searchPDFs = async (query: string, site?: string): Promise<SearchResult[]> => {
  // Check if we should use mock data (for development/testing)
  const useMockData = process.env.NODE_ENV === 'development' && 
                      (process.env.VITE_USE_MOCK_DATA === 'true' || !process.env.VITE_API_BASE_URL);
  
  try {
    if (useMockData) {
      // Use mock data for development/testing
      return await getMockSearchResults(query, site);
    } else {
      // Use real API for production
      const results = await searchPDFsAPI(query, site);
      
      if (results.length > 0) {
        toast.success("Search completed successfully");
      } else {
        toast.info("No results found");
      }
      
      return results;
    }
  } catch (error) {
    console.error("Error searching PDFs:", error);
    return [];
  }
};

// This function handles mock data for development/testing purposes
const getMockSearchResults = async (query: string, site?: string): Promise<SearchResult[]> => {
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  toast.success("Search completed successfully (mock data)");
  
  // Get all mock results based on query
  let results: SearchResult[] = [];
  
  // Check if query contains key terms to return different mock results
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("pathology") && lowerQuery.includes("nhs")) {
    results = [...mockNHSPathologyResults];
  } else if (lowerQuery.includes("climate") || lowerQuery.includes("environment")) {
    results = [...mockClimateResults];
  } else if (lowerQuery.includes("finance") || lowerQuery.includes("budget")) {
    results = [...mockFinanceResults];
  } else {
    // Return a subset of general results
    if (Math.random() > 0.8) {
      results = [];
    } else {
      results = [...mockGeneralResults.slice(0, Math.floor(Math.random() * 5) + 1)];
    }
  }
  
  // If a specific site is selected, filter results to only that site
  // For mock data, we'll simulate this by associating results with random ICB sites
  if (site) {
    // First, ensure each result has a site assigned (for mock data purposes)
    results = results.map(result => {
      if (!result.source.includes('ICB')) {
        const randomSite = icbSites[Math.floor(Math.random() * icbSites.length)];
        return { 
          ...result, 
          source: randomSite.name,
          url: `${randomSite.url}/documents/${result.title.toLowerCase().replace(/\s+/g, '-')}.pdf`
        };
      }
      return result;
    });
    
    // Now filter by the selected site
    const selectedSite = icbSites.find(s => s.url === site);
    if (selectedSite) {
      results = results.filter(result => 
        result.source.includes(selectedSite.name) || 
        result.url.startsWith(selectedSite.url)
      );
    }
  }
  
  return results;
};

// Mock data - In a real app, this would come from a backend
const mockNHSPathologyResults: SearchResult[] = [
  {
    title: "NHS North West London ICB Board Meeting Minutes",
    url: "https://example.com/nhs-nwl-minutes-may-2023.pdf",
    date: "2023-05-15",
    source: "NHS North West London",
    fileSize: "2.4 MB",
    matches: [
      {
        page: 12,
        textBefore: "The committee discussed the ongoing challenges in ",
        matchedText: "pathology services",
        textAfter: " across the region, with specific concerns about laboratory turnaround times."
      },
      {
        page: 14,
        textBefore: "Dr. Thompson presented the quarterly ",
        matchedText: "pathology network",
        textAfter: " report, highlighting improvements in blood sciences integration."
      },
      {
        page: 27,
        textBefore: "The budget allocation for ",
        matchedText: "pathology modernization",
        textAfter: " was approved, with £3.2m designated for equipment upgrades."
      }
    ]
  },
  {
    title: "NHS South East ICB Quality Committee Report",
    url: "https://example.com/nhs-se-quality-report-2023.pdf",
    date: "2023-07-22",
    source: "NHS South East England",
    fileSize: "1.8 MB",
    matches: [
      {
        page: 5,
        textBefore: "The digital ",
        matchedText: "pathology implementation",
        textAfter: " timeline was reviewed, with expected completion in Q4 2023/24."
      },
      {
        page: 8,
        textBefore: "Concerns were raised about staffing levels in ",
        matchedText: "pathology departments",
        textAfter: ", particularly in histopathology where vacancy rates remain high."
      }
    ]
  },
  {
    title: "NHS Midlands Partnership Strategic Planning Document",
    url: "https://example.com/nhs-midlands-strategic-plan.pdf",
    date: "2023-03-10",
    source: "NHS Midlands",
    fileSize: "4.2 MB",
    matches: [
      {
        page: 42,
        textBefore: "The consolidation of ",
        matchedText: "pathology services",
        textAfter: " into regional hubs continues to deliver efficiency savings while maintaining quality standards."
      }
    ]
  }
];

const mockClimateResults: SearchResult[] = [
  {
    title: "Climate Change Impact Assessment 2023",
    url: "https://example.com/climate-impact-2023.pdf",
    date: "2023-09-05",
    source: "Environmental Protection Agency",
    fileSize: "5.7 MB",
    matches: [
      {
        page: 8,
        textBefore: "Rising sea levels pose a significant threat to coastal communities, with projections indicating a ",
        matchedText: "0.5m rise by 2050",
        textAfter: " in worst-case scenarios."
      },
      {
        page: 12,
        textBefore: "Extreme weather events have increased by ",
        matchedText: "37% in the last decade",
        textAfter: ", resulting in economic damages exceeding $1.2 trillion globally."
      }
    ]
  },
  {
    title: "Environmental Policy Framework 2023-2028",
    url: "https://example.com/env-policy-framework.pdf",
    date: "2023-02-18",
    source: "Department of Environment",
    fileSize: "3.2 MB",
    matches: [
      {
        page: 24,
        textBefore: "Carbon neutrality targets will be implemented across all government sectors by ",
        matchedText: "2035",
        textAfter: ", five years ahead of the previous timeline."
      }
    ]
  }
];

const mockFinanceResults: SearchResult[] = [
  {
    title: "Annual Financial Report FY2022-23",
    url: "https://example.com/annual-finance-2022-23.pdf",
    date: "2023-04-30",
    source: "Ministry of Finance",
    fileSize: "8.3 MB",
    matches: [
      {
        page: 15,
        textBefore: "The fiscal deficit stands at ",
        matchedText: "3.8% of GDP",
        textAfter: ", a decrease of 0.6 percentage points from the previous financial year."
      },
      {
        page: 42,
        textBefore: "Public debt is projected to reach ",
        matchedText: "67.2% of GDP",
        textAfter: " by the end of FY2023-24, raising concerns about long-term fiscal sustainability."
      }
    ]
  },
  {
    title: "Budget Allocation Report 2023",
    url: "https://example.com/budget-allocation-2023.pdf",
    date: "2023-01-15",
    source: "Budget Office",
    fileSize: "6.1 MB",
    matches: [
      {
        page: 7,
        textBefore: "Education spending increased by ",
        matchedText: "12.5% year-on-year",
        textAfter: ", representing the largest percentage increase across all sectors."
      }
    ]
  }
];

const mockGeneralResults: SearchResult[] = [
  {
    title: "Research on Artificial Intelligence in Healthcare",
    url: "https://example.com/ai-healthcare-research.pdf",
    date: "2023-08-12",
    source: "National Institute of Health",
    fileSize: "4.5 MB",
    matches: [
      {
        page: 18,
        textBefore: "AI-powered diagnostic tools demonstrated an accuracy rate of ",
        matchedText: "94.3%",
        textAfter: " in detecting early-stage lung cancer, outperforming traditional methods."
      }
    ]
  },
  {
    title: "Digital Transformation Strategy 2023-2025",
    url: "https://example.com/digital-transformation.pdf",
    date: "2023-06-20",
    source: "Department of Digital Innovation",
    fileSize: "3.7 MB",
    matches: [
      {
        page: 5,
        textBefore: "Cloud adoption across government services is expected to reach ",
        matchedText: "75% by 2024",
        textAfter: ", resulting in projected savings of $150M annually."
      }
    ]
  },
  {
    title: "Public Health Strategy 2023",
    url: "https://example.com/public-health-2023.pdf",
    date: "2023-03-28",
    source: "Department of Health",
    fileSize: "5.2 MB",
    matches: [
      {
        page: 23,
        textBefore: "Mental health services will receive a ",
        matchedText: "30% increase in funding",
        textAfter: " over the next three years, addressing the growing demand for support services."
      }
    ]
  }
];
