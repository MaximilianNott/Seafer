const SECTOR_REGISTRY = {

  /* ================= CONSULTING ================= */

  management_consulting: {
   applies: (input) => input.entityType === "company",

    flags: []
  },

  legal_consulting_foreign_law: {
   applies: (input) => input.entityType === "company",

    flags: [
      "MOJ_ESTABLISHMENT_LICENSE",
      "RESIDENT_LAWYER_MINIMUM",
      "BRANCH_HEAD_EXP",
      "COMPULSORY_PROFESSIONAL_INSURANCE"
    ]
  },

  legal_consulting_vietnamese_law: {
   applies: (input) => input.entityType === "company",

    flags: [
      "MOJ_ESTABLISHMENT_LICENSE",
      "LOCAL_LAW_HIRING_MANDATE",
      "LIMITATIONS_OF_PRACTICE"
    ]
  },

  financial_tax_consulting: {
   applies: (input) => input.entityType === "company",

    flags: [
      "MOF_PRACTICE_ELIGIBILITY",
      "CERTIFIED_STAFF_RATIO",
      "PROFESSIONAL_LIABILITY_INSURANCE"
    ]
  },

  construction_architectural_consulting: {
   applies: (input) => input.entityType === "company",

    flags: [
      "CONSTRUCTION_CAPACITY_CERT",
      "INDIVIDUAL_PRACTICE_CERT",
      "PROJECT_GRADE_LIMIT",
      "MANDATORY_INSURANCE"
    ]
  },

  /* ================= IT / DIGITAL ================= */

  software_development: {
   applies: (input) => input.entityType === "company",

    flags: ["SOFTWARE_CIT_INCENTIVE"]
  },

  data_centre_cloud_services: {
   applies: (input) => input.entityType === "company",

    flags: [
      "DATA_LOCALIZATION",
      "VNTA_REGISTRATION_NOTIFICATION"
    ]
  },

  cyber_security_services: {
   applies: (input) => input.entityType === "company",

    flags: [
      "MPS_CYBER_SERVICE_LICENSE",
      "CYBER_EMERGENCY_COOPERATION"
    ]
  },

  /* ================= EDUCATION ================= */

  short_term_training_language_skills: {
   applies: (input) => input.entityType === "company",

    flags: [
      "EDUCATION_LICENSE",
      "LANGUAGE_CENTER_PRINCIPAL_QUALIFICATION",
      "CAPITAL_RESTRICTIONS_EDUCATION",
      "CONSTRUCTION_STANDARDS_EDUCATION"
    ]
  },

  k12_higher_education: {
   applies: (input) => input.entityType === "company",

    flags: [
      "EDUCATION_LICENSE",
      "K12_STUDENT_QUOTA_LIMIT",
      "EDUCATION_LAND_TENURE_CHECK",
      "CAPITAL_RESTRICTIONS_EDUCATION",
      "CONSTRUCTION_STANDARDS_EDUCATION"
    ]
  },

  edtech_online_education: {
   applies: (input) => input.entityType === "company",

    flags: [
      "EDUCATION_LICENSE",
      "EDTECH_E_LEARNING_NOTIFICATION",
      "CAPITAL_RESTRICTIONS_EDUCATION"
    ]
  },

  /* ================= TRADING ================= */

  wholesale_trading: {
   applies: (input) => input.entityType === "company",

    flags: ["WHOLESALE_TRADING_RIGHTS"]
  },

  retail_trading: {
   applies: (input) => input.entityType === "company",

    flags: [
      "RETAIL_BUSINESS_LICENSE",
      "RETAIL_OUTLET_LICENSE",
      "ECONOMIC_NEEDS_TEST"
    ]
  },

  /* ================= E-COMMERCE ================= */

  ecommerce_marketplace: {
   applies: (input) => input.entityType === "company",

    flags: [
      "MOIT_MARKETPLACE_REGISTRATION",
      "ECOMMERCE_TAX_WITHHOLDING",
      "ECOMMERCE_MARKET_ACCESS_CHECK",
      "PAYMENT_INTERMEDIARY_LICENSE",
      "FDI_ECOMMERCE_BUSINESS_LICENSE"
    ]
  },

  direct_online_retail_b2c: {
   applies: (input) => input.entityType === "company",

    flags: [
      "APP_NOTIFICATION_MOIT",
      "FDI_ECOMMERCE_BUSINESS_LICENSE"
    ]
  },

  /* ================= MANUFACTURING ================= */

  electronics_manufacturing_assembly_components: {
   applies: (input) => input.entityType === "company",

    flags: [
      "INDUSTRY_LICENSE",
      "ELECTRONICS_ROHS_DECLARATION",
      "ELECTRONICS_CR_MARK",
      "TECH_PATENT_CHECK",
      "ELECTRONICS_CLEANROOM_ISOLATION",
      "ELECTRONICS_GAS_SUPPRESSION",
      "ELECTRONICS_LITHIUM_STORAGE",
      "ELECTRONICS_ESD_ELECTRICAL_SAFETY"
    ]
  },

  textiles_and_garments: {
   applies: (input) => input.entityType === "company",

    flags: [
      "INDUSTRY_LICENSE",
      "GARMENT_EPR_CONTRIBUTION",
      "GARMENT_YARN_ORIGIN",
      "GARMENT_WATER_MONITORING",
      "GARMENT_IP_INFRINGEMENT",
      "GARMENT_FIRE_COMPARTMENTATION",
      "GARMENT_FIRE_EGRESS_DENSITY",
      "GARMENT_AUTOMATIC_SUPPRESSION",
      "GARMENT_DUST_EXPLOSION_HAZARD",
      "GARMENT_FIRE_EQUIPMENT_CONFORMITY"
    ]
  },

  /* ================= FOOD & BEVERAGE ================= */

  restaurant_services: {
   applies: (input) => input.entityType === "company",

    flags: [
      "FOOD_SAFETY",
      "FIRE_SAFETY_KITCHEN",
      "ALCOHOL_ONSITE_CONSUMPTION",
      "STAFF_HEALTH_CERTIFICATION"
    ]
  },

  food_processing: {
   applies: (input) => input.entityType === "company",

    flags: [
      "FOOD_SAFETY",
      "PRODUCT_SELF_DECLARATION",
      "VIETNAMESE_LABELING_REQUIREMENTS",
      "FIRE_SAFETY_FOOD_PROCESSING",
      "STAFF_HEALTH_CERTIFICATION"
    ]
  },

  bars: {
   applies: (input) => input.entityType === "company",

    flags: [
      "FOOD_SAFETY",
      "SECURITY_ORDER_ANTT",
      "ALCOHOL_RETAIL_LICENSE",
      "MUSIC_COPYRIGHT_COMPLIANCE",
      "NOISE_POLLUTION_STANDARDS",
      "FIRE_SAFETY_BAR",
      "STAFF_HEALTH_CERTIFICATION"
    ]
  }

};

module.exports = { SECTOR_REGISTRY };
