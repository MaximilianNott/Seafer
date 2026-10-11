const ecommerceFlags = {

// =======================
// E-COMMERCE — DIRECT ONLINE RETAIL (B2C)
// =======================

APP_NOTIFICATION_MOIT: {
  meaning:
    "Mobile applications or websites offering e-commerce or digital retail services must be notified to or registered with the Ministry of Industry and Trade.",
  explanation:
    "E-commerce websites and applications engaging in online retail activities must complete notification procedures through the MOIT E-commerce Management Portal.",
  authority: "Ministry of Industry and Trade (MOIT)",
  legalBasis:
    "Decree No. 52/2013/ND-CP & Decree No. 85/2021/ND-CP",
  impact:
    "Mandatory market entry compliance requirement for online retail operations.",
  riskWeight: 30,
  category: "digital",
  type: "compliance",
  priority: "medium",
  nextSteps: [
    {
      requirement:
        "Complete the online notification process via the MOIT E-commerce Portal once the platform is operational."
    },
    {
      requirement:
        "Ensure the website displays the official MOIT notification badge and registration link."
    }
  ]
},

// =======================
// E-COMMERCE — MARKETPLACE PLATFORMS
// =======================

MOIT_MARKETPLACE_REGISTRATION: {
  meaning:
    "E-commerce service platforms such as marketplaces, auction platforms, or deal sites must complete formal registration with MOIT.",
  explanation:
    "Marketplace operators facilitating third-party transactions are subject to a more rigorous registration and approval regime than standard B2C retail websites.",
  authority: "Ministry of Industry and Trade (MOIT)",
  legalBasis:
    "Decree No. 52/2013/ND-CP & Decree No. 85/2021/ND-CP",
  impact:
    "Critical operational approval required before commercial marketplace launch.",
  riskWeight: 80,
  category: "digital",
  type: "compliance",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Prepare and submit a detailed Service Provision Scheme outlining transaction flows, seller verification, and dispute handling processes."
    },
    {
      requirement:
        "Obtain formal MOIT marketplace registration approval and display the official registration badge."
    }
  ]
},

ECOMMERCE_TAX_WITHHOLDING: {
  meaning:
    "E-commerce platform operators may be required to declare and remit taxes on behalf of individual sellers using the platform.",
  explanation:
    "Vietnamese tax regulations increasingly impose withholding and reporting obligations on marketplace operators facilitating transactions for individual merchants.",
  authority: "General Department of Taxation",
  legalBasis:
    "Law on Tax Administration 2019 & Circular No. 40/2021/TT-BTC",
  impact:
    "Significant operational and systems compliance burden for marketplace operators.",
  riskWeight: 55,
  category: "tax",
  type: "operational",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Integrate tax withholding, reporting, and seller classification functionality into the platform payment architecture."
    },
    {
      requirement:
        "Implement procedures for seller tax identification and transaction reporting."
    }
  ]
},

// =======================
// E-COMMERCE — FOREIGN INVESTMENT / RETAIL LINKAGE
// =======================

FDI_ECOMMERCE_BUSINESS_LICENSE: {
  meaning:
    "Foreign-invested enterprises conducting retail activities through e-commerce channels require a Business License.",
  explanation:
    "E-commerce retail activities conducted by foreign-invested entities are treated as retail trading activities and require licensing under Decree 09.",
  authority:
    "Provincial Department of Industry and Trade (DOIT) in coordination with MOIT",
  legalBasis:
    "Decree No. 342/2026/ND-CP",
  impact:
    "Prerequisite licensing requirement for lawful foreign-invested e-commerce retail operations.",
  riskWeight: 90,
  category: "digital",
  type: "compliance",
  priority: "critical",
  applies: (input) => {
  return (
    input.foreignInvestor &&
    (
      input.sectors.includes("ecommerce_marketplace") ||
      input.sectors.includes("direct_online_retail_b2c")
    )
  );
},
  nextSteps: [
    {
      requirement:
        "Obtain the Business License for retail trading activities prior to completing MOIT e-commerce notification or registration procedures."
    },
    {
      requirement:
        "Assess whether planned activities constitute direct retail trading or marketplace intermediation."
    }
  ]
},

// =======================
// E-COMMERCE — PAYMENTS / FINTECH
// =======================

PAYMENT_INTERMEDIARY_LICENSE: {
  meaning:
    "Specialized licensing may be required where the platform collects, holds, or settles customer payments on behalf of third parties.",
  explanation:
    "Platforms operating escrow, wallet, or payment intermediary functions may fall within regulated payment intermediary service activities supervised by the State Bank of Vietnam.",
  authority: "State Bank of Vietnam (SBV)",
  legalBasis:
    "Decree 52/2024/ND-CP",
  impact:
    "Potential operational blocker involving significant licensing and capital requirements.",
  riskWeight: 50,
  category: "digital",
  type: "compliance",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Assess whether the platform's payment flow constitutes regulated payment intermediary activity."
    },
    {
      requirement:
        "Consider partnering with an already licensed Vietnamese payment intermediary provider to avoid direct licensing obligations."
    }
  ]
},

// =======================
// E-COMMERCE — MARKET ACCESS / SECURITY REVIEW
// =======================

ECOMMERCE_MARKET_ACCESS_CHECK: {
  meaning:
    "Foreign investors operating e-commerce marketplace platforms may be subject to enhanced security and market access review.",
  explanation:
    "Marketplace platforms with significant scale, user data collection, or foreign ownership structures may undergo enhanced scrutiny relating to cybersecurity and public order considerations.",
  authority:
    "Ministry of Industry and Trade (MOIT) and Ministry of Public Security (MPS)",
  legalBasis:
    "Decree No. 85/2021/ND-CP & Law on Cybersecurity 2018",
  impact:
    "Potential market entry restriction and enhanced regulatory review.",
  riskWeight: 60,
  category: "digital",
  type: "compliance",
  priority: "high",

  applies: (input) => {
    return (
      input.foreignInvestor &&
      input.sectors.includes("ecommerce_marketplace")
    );
  },

  nextSteps: [
    {
      requirement:
        "Assess whether the investor profile or platform scale may trigger enhanced security or public order review."
    },
    {
      requirement:
        "Prepare supporting documentation relating to cybersecurity, data management, and operational control structure."
    }
  ]
}

};

module.exports = ecommerceFlags;
