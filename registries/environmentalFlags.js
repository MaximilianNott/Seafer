const ENVIRONMENTAL_REGISTRATION_SECTORS = [

  "restaurant_services",

  "food_processing",

  "electronics_manufacturing_assembly_components",

  "textiles_and_garments"

];

const ENVIRONMENTAL_LICENSE_SECTORS = [

  "food_processing",

  "electronics_manufacturing_assembly_components",

  "textiles_and_garments"

];

const EIA_SECTORS = [

  "food_processing",

  "electronics_manufacturing_assembly_components",

  "textiles_and_garments"

];

const environmentalFlags = {

  // ==========================================
  // ENVIRONMENTAL REGISTRATION
  // ==========================================

  ENV_REGISTRATION: {
    meaning:
      "Environmental registration required",

    explanation:
      "Low-impact projects undertaking activities capable of generating limited environmental impacts must complete environmental registration before operation.",

    authority:
      "Commune-level People's Committee",

    legalBasis:
      "Law on Environmental Protection 2020; Decree 08/2022/ND-CP",

    impact:
      "Administrative environmental compliance filing.",

    riskWeight: 2,

    category: "environment",

    priority: "low",

    applies: (input) => {

  return (

    input.entityType === "company" &&

    input.hasPhysicalPresence &&

    input.environmentalImpact === "light" &&

    input.sectors.some(sector =>
      ENVIRONMENTAL_REGISTRATION_SECTORS.includes(sector)
    )

  );

},

    nextSteps: [
      {
        requirement:
          "Prepare and submit environmental registration dossier"
      }
    ]
  },

  // ==========================================
  // ENVIRONMENTAL LICENCE
  // ==========================================

  ENV_LICENSE: {

    meaning:
      "Environmental license required",

    explanation:
      "Projects with moderate environmental impact must obtain an environmental licence before commencing operations.",

    authority:
      "Provincial Department of Natural Resources and Environment (DONRE) or MONRE",

    legalBasis:
      "Law on Environmental Protection 2020; Decree 08/2022/ND-CP",

    impact:
      "Operational environmental approval regulating emissions and waste.",

    riskWeight: 25,

    category: "environment",

    priority: "high",

    applies: (input) => {

  return (

    input.entityType === "company" &&

    input.hasPhysicalPresence &&

    input.environmentalImpact === "moderate" &&

    input.sectors.some(sector =>
      ENVIRONMENTAL_LICENSE_SECTORS.includes(sector)
    )

  );

},

    nextSteps: [

      {
        requirement:
          "Prepare environmental compliance documentation"
      },

      {
        requirement:
          "Apply for Environmental License prior to operation"
      }

    ]

  },

  // ==========================================
  // ENVIRONMENTAL IMPACT ASSESSMENT
  // ==========================================

  ENV_EIA: {

    meaning:
      "Environmental Impact Assessment approval required",

    explanation:
      "High-impact projects must conduct and obtain approval of an Environmental Impact Assessment prior to construction.",

    authority:
      "Ministry of Natural Resources and Environment (MONRE) or Provincial People's Committee",

    legalBasis:
      "Law on Environmental Protection 2020; Decree 08/2022/ND-CP",

    impact:
      "Mandatory environmental approval prior to project construction.",

    riskWeight: 40,

    category: "environment",

    priority: "critical",

    applies: (input) => {

  return (

    input.entityType === "company" &&

    input.hasPhysicalPresence &&

    input.requiresConstructionCompliance &&

    input.environmentalImpact === "heavy" &&

    input.sectors.some(sector =>
      EIA_SECTORS.includes(sector)
    )

  );

},

    nextSteps: [

      {
        requirement:
          "Engage licensed environmental consultant"
      },

      {
        requirement:
          "Prepare Environmental Impact Assessment (EIA) report"
      },

      {
        requirement:
          "Submit EIA for approval prior to construction"
      }

    ]

  }

};

module.exports = environmentalFlags;