const tradingFlags = {

// =======================
// TRADING — WHOLESALE
// =======================

WHOLESALE_TRADING_RIGHTS: {
  meaning: "Right to conduct wholesale trading activities",
  explanation:
    "Wholesale trading allows the sale of goods to businesses or organizations rather than end consumers. Foreign-invested entities must register appropriate business lines and may face additional conditions for restricted goods.",
  authority: "Department of Planning and Investment (DPI)",
  legalBasis: "Law on Investment 2025 & Decree No. 342/2026/ND-CP",
  impact: "Conditional market access depending on goods traded",
  riskWeight: 20,
  category: "trading",
  priority: "medium",
  nextSteps: [
    {
      requirement:
        "Register appropriate wholesale trading business lines (e.g., VSIC 46xx series) in IRC/ERC"
    },
    {
      requirement:
        "Assess whether traded goods fall under restricted categories requiring additional licensing"
    }
  ]
},

// =======================
// TRADING — RETAIL
// =======================

RETAIL_BUSINESS_LICENSE: {
  meaning: "Business License required for retail sales to end consumers",
  explanation:
    "Foreign-invested enterprises must obtain a Business License to sell goods directly to consumers, including through physical stores or online channels.",
  authority:
    "Provincial People's Committee / Department of Industry and Trade (DOIT)",
  legalBasis: "Decree No. 342/2026/ND-CP",
  impact:
    "Mandatory secondary license required before retail operations can begin",
  riskWeight: 75,
  category: "trading",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Apply for Business License after obtaining Enterprise Registration Certificate"
    },
    {
      requirement:
        "Ensure tax compliance status is clean if the entity has been operating for more than 12 months"
    },
    {
      requirement:
        "Assess whether the head office will function as a retail outlet and requires additional licensing"
    }
  ]
},

RETAIL_OUTLET_LICENSE: {
  meaning: "License required for each physical retail outlet",
  explanation:
    "Each physical retail location operated by a foreign-invested company requires a separate Retail Outlet License.",
  authority: "Provincial Department of Industry and Trade (DOIT)",
  legalBasis: "Decree No. 342/2026/ND-CP",
  impact: "Facility-level approval required prior to operation",
  riskWeight: 60,
  category: "construction",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Ensure retail location complies with local zoning and commercial planning regulations"
    },
    {
      requirement:
        "Apply for Retail Outlet License for each physical location"
    }
  ]
},

ECONOMIC_NEEDS_TEST: {  // adjust this when country of origin is modeled in later files
  meaning: "Economic Needs Test required for additional retail outlets",
  explanation:
    "Opening second and subsequent retail outlets may require an Economic Needs Test assessing market impact, unless exemptions apply under trade agreements or location criteria.",
  authority:
    "Provincial People's Committee (ENT Council)",
  legalBasis: "Decree No. 342/2026/ND-CP",
  impact:
    "Major regulatory barrier to scaling retail operations",
  riskWeight: 85,
  category: "construction",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Determine whether the outlet qualifies for exemption (e.g., <500m² in a commercial center)"
    },
    {
      requirement:
        "Assess investor nationality against CPTPP, EVFTA, or UKVFTA exemptions"
    },
    {
      requirement:
        "Prepare documentation for ENT Council review if no exemption applies"
    }
  ]
}

};

module.exports = tradingFlags;
