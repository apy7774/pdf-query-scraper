
import { SearchResult } from "@/types/types";
import { icbSites } from "./icbSites";

// Mock data - NHS Pathology related results
export const mockNHSPathologyResults: SearchResult[] = [
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

// Mock data - Climate related results
export const mockClimateResults: SearchResult[] = [
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

// Mock data - Finance related results
export const mockFinanceResults: SearchResult[] = [
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

// Mock data - General results
export const mockGeneralResults: SearchResult[] = [
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

/**
 * Generate mock search results based on query and optional sites
 * @param query Search query string
 * @param sites Optional array of specific ICB sites to search
 * @returns Promise with mock search results
 */
export const getMockSearchResults = async (query: string, sites?: string[]): Promise<SearchResult[]> => {
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
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
  
  // If specific sites are selected, filter results to only those sites
  if (sites && sites.length > 0) {
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
    
    // Now filter by the selected sites
    results = results.filter(result => {
      return sites.some(siteUrl => {
        const selectedSite = icbSites.find(s => s.url === siteUrl);
        return selectedSite && (
          result.source.includes(selectedSite.name) || 
          result.url.startsWith(selectedSite.url)
        );
      });
    });
  }
  
  return results;
};
