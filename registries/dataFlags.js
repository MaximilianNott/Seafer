const dataFlags = {

  // =======================
  // PERSONAL DATA
  // =======================

DATA_PROTECTION: {
    meaning:
      "Personal data protection compliance required",

    explanation:
      "Organizations processing personal or sensitive personal data must implement safeguards and internal compliance controls.",

    authority:
      "Ministry of Public Security — Department A05 (Cyber Security Bureau)",

    legalBasis:
      "Decree 13/2023/ND-CP",

    impact:
      "Creates ongoing data governance and compliance obligations.",

    riskWeight: 10,

    category: "data",

    priority: "medium",

    applies: (input) => {
      return input.collectsPersonalData === true;
    },

    nextSteps: [
      {
        requirement:
          "Implement personal data protection policies and safeguards."
      },
      {
        requirement:
          "Map internal personal data processing activities."
      }
    ]
  },

  // =======================
  // CROSS BORDER
  // =======================

  DATA_LOCALIZATION: {
    meaning:
      "Cross-border data transfer compliance obligations",

    explanation:
      "Entities transferring personal data outside Vietnam may require transfer impact assessments and regulatory compliance procedures.",

    authority:
      "Ministry of Public Security — Department A05 (Cyber Security Bureau)",

    legalBasis:
      "Decree 13/2023/ND-CP",

    impact:
      "Additional filing and cross-border transfer compliance obligations.",

    riskWeight: 20,

    category: "data",

    priority: "high",

    applies: (input) => {
      return (
        input.collectsPersonalData === true &&
        input.crossBorder === true
      );
    },

    nextSteps: [
      {
        requirement:
          "Assess cross-border personal data transfer exposure."
      },
      {
        requirement:
          "Prepare transfer impact assessment documentation."
      }
    ]
  },

  // =======================
  // PERSONAL
  // =======================

SENSITIVE_DATA_DPO: {
  meaning:
    "Data protection personnel or function required",

  explanation:
    "Organizations subject to the applicable personal-data protection obligations must designate qualified personnel or a data-protection function, or use an appropriate external data-protection service where permitted.",

  authority:
    "Ministry of Public Security — Department A05 (Cyber Security Bureau)",

  legalBasis:
    "Law on Personal Data Protection 2025; Decree 356/2025/ND-CP",

  impact:
    "Creates additional governance and compliance responsibilities for the organization.",

  riskWeight: 40,

  category: "data",

  priority: "high",

  applies: (input) => {
    return input.handlesSensitiveData === true;
  },

  nextSteps: [
    {
      requirement:
        "Designate appropriately qualified personnel or a data-protection function, or assess whether an external data-protection service can be used."
    },
    {
      requirement:
        "Document the assigned data-protection responsibilities and governance arrangements."
    }
  ]
},

SENSITIVE_DATA_DPIA: {
  meaning:
    "Personal-data processing impact assessment required",

  explanation:
    "Processing personal data may require the organization to prepare and maintain an impact-assessment dossier addressing the nature of the processing, data involved, protection measures and associated risks.",

  authority:
    "Ministry of Public Security — Department A05 (Cyber Security Bureau)",

  legalBasis:
    "Law on Personal Data Protection 2025; Decree 356/2025/ND-CP",

  impact:
    "Creates a formal documentation, assessment and filing obligation relating to personal-data processing.",

  riskWeight: 50,

  category: "data",

  priority: "critical",

  applies: (input) => {
    return input.handlesSensitiveData === true;
  },

  nextSteps: [
    {
      requirement:
        "Prepare and maintain the required personal-data processing impact-assessment dossier."
    },
    {
      requirement:
        "Submit the required dossier within the applicable statutory timeframe after processing begins."
    }
  ]
}
};

module.exports = dataFlags;