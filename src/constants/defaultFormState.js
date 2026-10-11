// ======================================
// DEFAULT FORM STATE
// Single source of truth for assessment initialization
// ======================================

export const DEFAULT_FORM_STATE = {

  // BUSINESS ACTIVITY
  sectors: [],

  // OWNERSHIP / CONTROL
  ownershipPercent: 100,

  controlStructure: "Direct Control",

  countryOfOrigin: "",

  // ENTITY STRUCTURE
  establishingVietnamEntity: true,

  intendsRevenue: true,

  // DATA
  crossBorder: false,

  dataSensitivity: "No",

  // OPERATIONS
  constructionRequired: false,

  environmentalImpact: "Low",

  // LABOUR
  headcount: "1-9",

  // LOCATION
  locationType: "None"
};