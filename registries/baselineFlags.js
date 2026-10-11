const baselineFlags = {

  // =======================
  // BASELINE — COMPANY ESTABLISHMENT
  // =======================

  ERC_REQUIRED: {
    meaning:
      "Enterprise Registration Certificate (ERC) required for company establishment",
    explanation:
      "All Vietnamese companies must obtain an Enterprise Registration Certificate (ERC) before commencing business operations.",
    authority:
      "Department of Planning and Investment (DPI)",
    legalBasis:
      "Law on Enterprises 2020",
    impact:
      "Mandatory prerequisite for legal business operations in Vietnam.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => {
      return (
        input.establishingVietnamEntity === true
      );
    },

    nextSteps: [
      {
        requirement:
          "Prepare enterprise registration application dossier"
      },
      {
        requirement:
          "Submit ERC application to the competent DPI"
      }
    ]
  },

  IRC_REQUIRED: {
    meaning:
      "Investment Registration Certificate (IRC) required",
    explanation:
      "Foreign-invested entities with a foreign ownership stake exceeding 50% must secure an Investment Registration Certificate (IRC) to validate and execute their specific commercial project parameters.",
    authority:
      "Department of Planning and Investment (DPI)",
    legalBasis:
      "Law on Investment 2020",
    impact:
      "Mandatory investment approval for qualifying foreign investment structures.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => (
  input.foreignInvestor &&
  input.establishingVietnamEntity &&
  input.ownershipPercent >= 50
    ),

    nextSteps: [
      {
        requirement:
          "Prepare investment project dossier and financial capability documentation"
      },
      {
        requirement:
          "Submit Investment Registration Certificate (IRC) application"
      }
    ]
  },

  CAPITAL_ADEQUECY: {
    meaning:
      "Charter capital should be appropriate for the proposed business activities",
    explanation:
      "The declared charter capital should be commercially appropriate for the proposed business activities. Certain regulated sectors may prescribe statutory minimum capital requirements.",
    authority:
      "Department of Planning and Investment (DPI)",
    legalBasis:
      "Law on Investment 2025 & Law on Investment 2020",
    impact:
      "Insufficient capitalisation may delay or prevent investment approval.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

   applies: (input) => {
  return input.establishingVietnamEntity;
},

    nextSteps: [
      {
        requirement:
          "Align proposed charter capital with operational scale and projected expenditure"
      },
      {
        requirement:
          "Ensure capital contribution schedule is commercially feasible"
      },
      {
        requirement:
          "Assess whether sector-specific minimum capital thresholds apply"
      }
    ]
  },

 NAME_AVALABILITY_CHECK: {
    meaning:
      "Proposed company name must be available and compliant",
    explanation:
      "Vietnamese company names must not duplicate or cause confusion with existing registered entities.",
    authority:
      "National Business Registration Portal",
    legalBasis:
      "Law on Enterprises 2020",
    impact:
      "ERC application may be rejected if naming requirements are violated.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => {
      return input.establishingVietnamEntity === true;
    },

    nextSteps: [
      {
        requirement:
          "Verify the proposed name follows the statutory format: '[Enterprise Type] + [Proper Name]' (e.g., 'Công ty TNHH + [Brand Name]' for an LLC)."
      },
      {
        requirement:
          "Conduct a comprehensive look-up on the National Business Registration Portal to check for identical or confusingly similar phonetic variants."
      },
      {
        requirement:
          "Perform a secondary clearance check against the IP Viet Nam trademark database to ensure the proper name does not utilize protected brand elements owned by a third party."
      }
    ]
  },

  // =======================
  // BASELINE — FOREIGN INVESTMENT
  // =======================

  ICA_ACCOUNT_OPENING: {
  meaning:
    "Investment Capital Account (ICA) opening required",

  explanation:
    "Certain foreign-invested economic organizations must use an investment capital account to receive and transfer foreign investment capital and other permitted foreign-investment transactions in accordance with Vietnam's foreign-exchange regulations.",

  authority:
    "State Bank of Vietnam (SBV)",

  legalBasis:
    "Circular 38/2026/TT-NHNN",

  impact:
    "Applicable foreign-investment capital transactions must be routed through the required investment capital account framework.",

  riskWeight: 0,

  category: "banking",

  priority: "baseline",

  applies: (input) => {
    return ( 
      input.foreignInvestor && 
      input.establishingVietnamEntity &&
      input.ownershipPercent >= 50
    );
  },

  nextSteps: [
    {
      requirement:
        "Open the required investment capital account with an authorised bank in Vietnam."
    },
    {
      requirement:
        "Route applicable foreign-investment capital transactions through the required account."
    }
  ]
},


IIA_ACCOUNT_OPENING: {
  meaning:
    "Indirect Investment Account (IIA) opening required",

  explanation:
    "Foreign investors undertaking applicable indirect investment transactions in Vietnam may be required to use a VND-denominated Indirect Investment Account for receiving and making payments associated with those investments.",

  authority:
    "State Bank of Vietnam (SBV)",

  legalBasis:
    "Circular 03/2025/TT-NHNN",

  impact:
    "Applicable indirect-investment transactions must be routed through the required VND-denominated account framework to maintain foreign-exchange compliance.",

  riskWeight: 0,

  category: "banking",

  priority: "baseline",

  type: "baseline",

  applies: (input) => (
    input.foreignInvestor && 
    input.establishingVietnamEntity &&
    input.ownershipPercent < 50 &&
    input.isPubliclyTradedCompany === true
  ),

  nextSteps: [
    {
      requirement:
        "Confirm that the proposed investment falls within the indirect-investment regime."
    },
    {
      requirement:
        "Open and use the required VND-denominated Indirect Investment Account with an authorised bank in Vietnam."
    },
    {
      requirement:
        "Route applicable indirect-investment transactions through the required account."
    }
  ]
},

NOTARISED_VIETNAMESE_TRANSLATION: {
    meaning:
      "Foreign-language documents must be translated into Vietnamese and notarised",
    explanation:
      "Regulatory submissions generally require certified Vietnamese translations of foreign-language documentation.",
    authority:
      "Vietnamese Notary Offices",
    legalBasis:
      "Law on Notarisation 2014",
    impact:
      "Applications may be rejected if translation requirements are not satisfied.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => {
    return (
        input.establishingVietnamEntity &&
        input.foreignInvestor
    );
},

    nextSteps: [
      {
        requirement:
          "For DPI Corporate Files (ERC/IRC): Execute full consular legalization of the parent entity's certificate of incorporation, board resolutions, and audited financials in their home country, followed by certified translation into Vietnamese via a local notary office."
      },
      {
        requirement:
          "For Bank Account Opening Files (ICA/IIA): Leverage the modern banking waivers. Confirm if the chosen authorized commercial bank requires a formal Vietnamese translation or if they will accept standard English dossiers under their internal compliance validation policy."
      },
      {
        requirement:
          "Ensure that any foreign document presented to the bank—whether translated or not—holds a valid foreign or domestic notarization stamp dated within 12 months of the bank submission date."
      }
    ]
  },

 FOREIGN_DOCUMENT_LEGALISATION: {
    meaning:
      "Foreign-issued corporate and identity documents must be legalized",
    explanation:
      "Foreign documents submitted to Vietnamese authorities generally require consular legalization or apostille-equivalent authentication depending on treaty arrangements.",
    authority:
      "Ministry of Foreign Affairs (MOFA)",
    legalBasis:
      "Decree 111/2011/ND-CP",
    impact:
      "Foreign documents may be rejected if legalization requirements are not satisfied.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => {
      return (
        input.establishingVietnamEntity === true &&
        input.foreignInvestor === true
      );
    },

    nextSteps: [
      {
        requirement:
          "Legalize or authenticate foreign-issued documents prior to submission"
      },
      {
        requirement:
          "Verify whether treaty exemptions apply for the investor nationality"
      }
    ]
  },

  // =======================
  // BASELINE — POST INCORPORATION
  // =======================
 
TAX_CODE_REGISTRATION: {
    meaning:
      "Tax registration and electronic invoice activation required",
    explanation:
      "Newly established entities must activate tax registration and configure compliant accounting and e-invoicing systems.",
    authority:
      "General Department of Taxation (GDT)",
    legalBasis:
      "Law on Tax Administration 2019",
    impact:
      "Businesses cannot lawfully issue VAT invoices or conduct formal tax reporting without activation.",
    riskWeight: 0,
    category: "tax",
    priority: "baseline",

    applies: (input) => {
      return (
        input.establishingVietnamEntity === true &&
        input.intendsRevenue === true
      );
    },

    nextSteps: [
      {
        requirement:
          "Register electronic tax filing account and e-invoice system"
      },
      {
        requirement:
          "Activate tax code following ERC issuance"
      }
    ]
  },

  DIGITAL_SIGNATURE_PROCUREMENT: {
    meaning:
      "Corporate digital signature procurement required",
    explanation:
      "Vietnamese entities require an approved digital signature certificate to complete electronic tax filings and government submissions.",
    authority:
      "MIC-authorized digital signature providers",
    legalBasis:
      "Law on E-Transactions; Law on Tax Administration 2019",
    impact:
      "Electronic government filing systems cannot be accessed without a valid digital signature.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => {
      return input.establishingVietnamEntity === true;
    },

    nextSteps: [
      {
        requirement:
          "Procure compliant USB token or cloud-based digital signature"
      }
    ]
  },

  SIGNBOARD_INSTALLATION_VERIFICATION: {
    meaning:
      "Corporate signboard installation required at registered address",
    explanation:
      "Vietnamese businesses must maintain a compliant company signboard at the registered office location.",
    authority:
      "Local Tax Department and District Authorities",
    legalBasis:
      "Law on Advertising; Decree 50/2016/ND-CP",
    impact:
      "Failure may trigger tax compliance issues or administrative penalties.",
    riskWeight: 0,
    category: "corporate",
    priority: "baseline",

    applies: (input) => {
      return (
        input.establishingVietnamEntity === true &&
        input.locationType !== "online_only"
      );
    },

    nextSteps: [
      {
        requirement:
          "Install physical company signboard at registered office"
      },
      {
        requirement:
          "Ensure signboard displays company name, address, and tax code"
      }
    ]
  },

  INITIAL_LABOUR_DECLARATION: {
    meaning:
      "Initial labor declaration and social insurance registration required",
    explanation:
      "Employers must declare labor usage and register eligible employees for statutory social insurance programs.",
    authority:
      "Department of Labour, Invalids and Social Affairs (DOLISA)",
    legalBasis:
      "Labor Code 2019; Decree 145/2020/ND-CP",
    impact:
      "Non-compliance may trigger labor penalties and block work permit processing.",
    riskWeight: 0,
    category: "labour",
    priority: "baseline",

    applies: (input) => {
  return (
      input.establishingVietnamEntity &&
      input.employeeCount > 0
  );
},

    nextSteps: [
      {
        requirement:
          "Submit initial labor declaration within statutory deadline"
      },
      {
        requirement:
          "Register employees for mandatory social insurance programs"
      }
    ]
  },
};

module.exports = baselineFlags;
