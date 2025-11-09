export interface QueryResponse {
  isValid: boolean
  scope: "pharma" | "out-of-scope"
  message: string
  agents?: string[]
}

export function analyzeQuery(query: string): QueryResponse {
  const pharmaKeywords = [
    "drug",
    "molecule",
    "compound",
    "clinical",
    "trial",
    "patent",
    "market",
    "analysis",
    "pharmaceutical",
    "biotech",
    "disease",
    "therapy",
    "treatment",
    "research",
    "development",
    "fda",
    "approval",
    "indication",
    "efficacy",
    "safety",
    "formulation",
    "manufacturing",
    "supply",
    "competitor",
    "investment",
    "pricing",
    "regulatory",
    "compliance",
    "phase",
    "adverse",
    "event",
    "data",
    "diabetes",
    "cancer",
    "cardiovascular",
    "neurology",
    "immunology",
    "orphan",
    "rare",
  ]

  const query_lower = query.toLowerCase()
  const containsPharmaKeyword = pharmaKeywords.some((kw) => query_lower.includes(kw))

  if (!containsPharmaKeyword) {
    return {
      isValid: false,
      scope: "out-of-scope",
      message: `This query is out of scope. I'm specialized in pharmaceutical research, drug development, market analysis, patents, and clinical trials. Please ask questions related to the pharma industry.`,
    }
  }

  return {
    isValid: true,
    scope: "pharma",
    message: "Query is valid for analysis",
    agents: [
      "IQVIA Insights",
      "EXIM Trends",
      "Patent Landscape",
      "Clinical Trials",
      "Internal Knowledge",
      "Web Intelligence",
    ],
  }
}
