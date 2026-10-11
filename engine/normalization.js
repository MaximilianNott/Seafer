// ==============================
// ENUM MAPS
// ==============================

const CONTROL_STRUCTURE_MAP = {
  "Direct Control": "foreign_controlled",
  "Shared Control": "shared_control",
  "No Control": "none"
};

const LOCATION_TYPE_MAP = {
  None: "online_only",
  Office: "office",
  Commercial: "commercial_premises",
  Industrial: "industrial_premises",
  Residential: "residential_apartment"
};

const DATA_SENSITIVITY_MAP = {
  No: "none",
  Personal: "personal_data",
  Sensitive: "sensitive_data"
};

const ENVIRONMENTAL_IMPACT_MAP = {
  Low: "light",
  Medium: "moderate",
  High: "heavy"
};

// ==============================
// SECTOR MAP
// Frontend labels -> backend keys
// ==============================

const SECTOR_MAP = {

  // CONSULTING

  "Management Consulting":
    "management_consulting",

  "Legal Consulting (Foreign Law)":
    "legal_consulting_foreign_law",

  "Legal Consulting (Vietnamese Law)":
    "legal_consulting_vietnamese_law",

  "Financial & Tax Consulting":
    "financial_tax_consulting",

  "Construction & Architectural Consulting":
    "construction_architectural_consulting",

  // IT / DIGITAL

  "Software Development":
    "software_development",

  "Data Centre/Cloud Services":
    "data_centre_cloud_services",

  "Cyber Security Services":
    "cyber_security_services",

  // EDUCATION

  "Short-Term Training (Language/Skills)":
    "short_term_training_language_skills",

  "K-12 & Higher Education":
    "k12_higher_education",

  "EdTech/Online Education":
    "edtech_online_education",

  // TRADING

  "Wholesale Trading":
    "wholesale_trading",

  "Retail Trading":
    "retail_trading",

  // E-COMMERCE

  "E-Commerce Marketplace":
    "ecommerce_marketplace",

  "Direct Online Retail (B2C)":
    "direct_online_retail_b2c",

  // MANUFACTURING

  "Electronics Manufacturing (Assembly and Components)":
    "electronics_manufacturing_assembly_components",

  "Textiles and Garments":
    "textiles_and_garments",

  // FOOD & BEVERAGE

  "Restaurant Services":
    "restaurant_services",

  "Food Processing":
    "food_processing",

  "Bars":
    "bars"
};

// ==============================
// HEADCOUNT PARSER
// ==============================

function parseHeadcount(range) {

  if (range === "1-9") return 5;
  if (range === "10-20") return 15;
  if (range === "21-50") return 30;
  if (range === "50+") return 75;

  return 5;
}

// ==============================
// MAIN NORMALIZATION
// ==============================

function normalizeInput(input) {

const normalized = {
  entityType: input.entityType || "company",
  countryOfOrigin: input.countryOfOrigin || null,

  // Representative Office
  parentCompanyEstablishedPeriod:
    input.parentCompanyEstablishedPeriod || null,

  alreadyInVietnam: Boolean(input.alreadyInVietnam),
  ownershipPercent: Number(input.ownershipPercent || 0),

  isPubliclyTradedCompany:
    Boolean(input.isPubliclyTradedCompany),

  controlStructure:
    CONTROL_STRUCTURE_MAP[input.controlStructure] || "none",

    // Operations

    sectors:
      Array.isArray(input.sectors)
        ? input.sectors.map(
            sector => SECTOR_MAP[sector] || sector
          )
        : [],

    locationType:
      LOCATION_TYPE_MAP[input.locationType] || "online_only",

    constructionRequired:
      Boolean(input.constructionRequired),

    intendsRevenue:
      input.intendsRevenue !== false,

    // Labour

    headcount:
      input.headcount || "1-9",

    // Data

    dataSensitivity:
      DATA_SENSITIVITY_MAP[input.dataSensitivity] || "none",

    crossBorder:
      Boolean(input.crossBorder),

    // Environment

    environmentalImpact:
  ENVIRONMENTAL_IMPACT_MAP[input.environmentalImpact] || null
  };

    // ==============================
  // DERIVED FIELDS
  // ==============================

  normalized.employeeCount =
    parseHeadcount(normalized.headcount);

  // --------------------------------
  // Investor Classification
  // --------------------------------

  normalized.domesticInvestor =
  normalized.countryOfOrigin === "Vietnam";

normalized.foreignInvestor =
  normalized.countryOfOrigin !== "Vietnam" &&
  normalized.countryOfOrigin !== null;

normalized.investorType =
  normalized.foreignInvestor
    ? "foreign"
    : "domestic";

normalized.hasForeignInvestment =
  normalized.foreignInvestor;

  normalized.foreignControlled =
    normalized.foreignInvestor &&
    (
      normalized.ownershipPercent >= 50 ||
      normalized.controlStructure === "foreign_controlled"
    );

  normalized.foreignMinority =
    normalized.foreignInvestor &&
    !normalized.foreignControlled;

  // --------------------------------
  // Business Characteristics
  // --------------------------------

  normalized.establishingVietnamEntity =
    normalized.entityType === "company";

  normalized.hasPhysicalPresence =
    normalized.locationType !== "online_only";

  normalized.requiresConstructionCompliance =
    normalized.constructionRequired === true;

  normalized.collectsPersonalData =
    normalized.dataSensitivity === "personal_data" ||
    normalized.dataSensitivity === "sensitive_data";

  normalized.handlesSensitiveData =
    normalized.dataSensitivity === "sensitive_data";

  normalized.usesResidentialAddress =
    normalized.locationType === "residential_apartment";

  return normalized;
}

module.exports = {
  normalizeInput
};