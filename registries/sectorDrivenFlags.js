const sectorDrivenFlags = {

  // =======================
  // CROSS-SECTOR REGULATORY FLAGS
  // Triggered primarily via sectorRegistry.js
  // =======================

  MINISTERIAL_APPROVAL: {
    meaning:
      "Sector requires ministerial-level regulatory approval",

    explanation:
      "Certain regulated sectors require approval or supervision from the relevant national ministry before lawful operation may begin.",

    authority:
      "Relevant Competent Ministry",

    legalBasis:
      "Sector-specific regulatory framework",

    impact:
      "Sector approval prerequisite before commercial operations.",

    riskWeight: 35,

    category: "general",

    priority: "high",

    nextSteps: [
      {
        requirement:
          "Identify supervising ministry based on regulated business activity."
      },
      {
        requirement:
          "Prepare ministry-specific licensing or approval documentation."
      }
    ]
  },

  INDUSTRY_LICENSE: {
    meaning:
      "Industrial manufacturing licensing and project approval required",

    explanation:
      "Manufacturing operations may require industrial project approval, factory zoning verification, and sector-specific production licensing.",

    authority:
      "Department of Planning and Investment (DPI) or Industrial Zone Authority",

    legalBasis:
      "Law on Investment 2020",

    impact:
      "Manufacturing operations cannot lawfully commence without approvals.",

    riskWeight: 18,

    category: "manufacturing",

    priority: "high",

    nextSteps: [
      {
        requirement:
          "Confirm industrial zoning compatibility and factory eligibility."
      },
      {
        requirement:
          "Apply for manufacturing-related operational licenses where required."
      }
    ]
  },

  EDUCATION_LICENSE: {
    meaning:
      "Education establishment and operating approvals required",

    explanation:
      "Educational institutions require establishment approval and operational licensing prior to student enrollment or instruction.",

    authority:
      "Ministry of Education and Training (MOET)",

    legalBasis:
      "Law on Education 2019; Decree 86/2018/ND-CP",

    impact:
      "Educational services may not legally operate without approval.",

    riskWeight: 20,

    category: "education",

    priority: "critical",

    nextSteps: [
      {
        requirement:
          "Apply for establishment approval for educational institution."
      },
      {
        requirement:
          "Obtain operational education license prior to launch."
      }
    ]
  },

  FOOD_SAFETY: {
    meaning:
      "Food safety certification required",

    explanation:
      "Food preparation, processing, and food-service operations require compliance certification confirming satisfaction of food safety standards.",

    authority:
      "MOH / MARD / MOIT",

    legalBasis:
      "Law on Food Safety 2010; Decree 15/2018/ND-CP",

    impact:
      "Food operations may be suspended without certification.",

    riskWeight: 15,

    category: "food",

    priority: "high",

    nextSteps: [
      {
        requirement:
          "Prepare food safety compliance documentation and facility standards."
      },
      {
        requirement:
          "Apply for Certificate of Food Safety Conditions."
      }
    ]
  }

};

module.exports = sectorDrivenFlags;