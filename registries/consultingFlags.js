// =======================
// CONSULTING — LEGAL (FOREIGN LAW)
// =======================

const consultingFlags = {

  MOJ_ESTABLISHMENT_LICENSE: {
    meaning:
      "Foreign law firms must obtain a Ministry of Justice establishment license before operating in Vietnam.",
    explanation:
      "Foreign legal practice entities must receive formal approval from the Ministry of Justice prior to establishing a branch or foreign law firm presence in Vietnam.",
    authority:
      "Ministry of Justice (MOJ)",
    legalBasis:
      "Law on Lawyers No. 65/2006/QH11; Decree 123/2013/ND-CP",
    impact:
      "Core market-entry and operational licensing requirement.",
    riskWeight: 75,
    category: "consulting",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Obtain establishment approval and operating license from the Ministry of Justice prior to commencing operations."
      }
    ]
  },

  RESIDENT_LAWYER_MINIMUM: {
    meaning:
      "Foreign law firms must maintain at least two resident foreign lawyers in Vietnam.",
    explanation:
      "Vietnamese legal practice regulations require foreign law firms to maintain a minimum resident foreign lawyer presence, including the Branch Head, for at least 183 days annually.",
    authority:
      "Ministry of Justice (MOJ)",
    legalBasis:
      "Law on Lawyers No. 65/2006/QH11; Decree 123/2013/ND-CP",
    impact:
      "Mandatory staffing and operational compliance requirement.",
    riskWeight: 50,
    category: "labour",
    type: "operational",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Ensure at least two qualified foreign lawyers maintain residency compliance requirements in Vietnam."
      }
    ]
  },

  BRANCH_HEAD_EXP: {
    meaning:
      "The appointed Branch Head must possess qualifying overseas legal practice experience.",
    explanation:
      "The Branch Head of a foreign law firm must demonstrate at least two consecutive years of legal practice experience outside Vietnam.",
    authority:
      "Ministry of Justice (MOJ)",
    legalBasis:
      "Law on Lawyers No. 65/2006/QH11; Decree 123/2013/ND-CP",
    impact:
      "Personnel eligibility requirement for licensing approval.",
    riskWeight: 45,
    category: "labour",
    type: "compliance",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Verify the proposed Branch Head satisfies minimum overseas legal practice experience requirements."
      }
    ]
  },

  COMPULSORY_PROFESSIONAL_INSURANCE: {
    meaning:
      "Foreign law firms must maintain professional liability insurance for practicing lawyers.",
    explanation:
      "Vietnamese regulations require foreign legal practices to maintain adequate professional indemnity insurance coverage.",
    authority:
      "Ministry of Justice (MOJ)",
    legalBasis:
      "Law on Lawyers No. 65/2006/QH11; Decree 123/2013/ND-CP",
    impact:
      "Mandatory professional risk-management requirement.",
    riskWeight: 20,
    category: "insurance",
    type: "operational",
    priority: "medium",
    nextSteps: [
      {
        requirement:
          "Obtain and maintain compliant professional liability insurance coverage for practicing lawyers."
      }
    ]
  },

  // =======================
  // CONSULTING — LEGAL (VIETNAMESE LAW)
  // =======================

  LOCAL_LAW_HIRING_MANDATE: {
    meaning:
      "Foreign-invested legal practices advising on Vietnamese law must employ locally qualified Vietnamese lawyers.",
    explanation:
      "Foreign legal practices may only provide advice on Vietnamese law through lawyers admitted to a Vietnamese Bar Association.",
    authority:
      "Ministry of Justice (MOJ)",
    legalBasis:
      "Law on Lawyers No. 65/2006/QH11; Decree 123/2013/ND-CP",
    impact:
      "Restriction on scope of legal advisory services.",
    riskWeight: 45,
    category: "labour",
    type: "operational",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Employ Vietnamese-qualified lawyers admitted to a recognized Vietnamese Bar Association."
      }
    ]
  },

  LIMITATIONS_OF_PRACTICE: {
    meaning:
      "Foreign legal practices are restricted from participating in Vietnamese litigation proceedings.",
    explanation:
      "Foreign legal firms may not act as litigation representatives or defenders before Vietnamese courts unless permitted under local law.",
    authority:
      "Ministry of Justice (MOJ)",
    legalBasis:
      "Law on Lawyers No. 65/2006/QH11; Decree 123/2013/ND-CP",
    impact:
      "Operational limitation affecting legal service scope.",
    riskWeight: 20,
    category: "consulting",
    type: "advisory",
    priority: "low",
    nextSteps: [
      {
        requirement:
          "Ensure internal legal practice scope excludes prohibited litigation representation activities."
      }
    ]
  },

  // =======================
  // CONSULTING — FINANCIAL & TAX
  // =======================

  MOF_PRACTICE_ELIGIBILITY: {
    meaning:
      "Tax and audit consulting firms require professional eligibility certification from the Ministry of Finance.",
    explanation:
      "Entities providing tax agent or independent audit services must obtain the appropriate Ministry of Finance licensing and practice approvals.",
    authority:
      "Ministry of Finance (MOF)",
    legalBasis:
      "Law on Independent Audit No. 67/2011/QH12; Decree 17/2012/ND-CP; Law on Tax Administration No. 38/2019/QH14",
    impact:
      "Mandatory sector licensing requirement.",
    riskWeight: 75,
    category: "consulting",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Obtain the Certificate of Eligibility for Tax Service Business or relevant audit practice authorization."
      }
    ]
  },

  CERTIFIED_STAFF_RATIO: {
    meaning:
      "Tax consulting firms must maintain a minimum number of certified professional staff.",
    explanation:
      "Vietnamese regulations require tax service providers to employ personnel holding valid Tax Agent Practice Certificates.",
    authority:
      "Ministry of Finance (MOF)",
    legalBasis:
      "Law on Independent Audit No. 67/2011/QH12; Decree 17/2012/ND-CP; Law on Tax Administration No. 38/2019/QH14",
    impact:
      "Mandatory operational staffing requirement.",
    riskWeight: 40,
    category: "labour",
    type: "operational",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Ensure at least two employees hold valid Tax Agent Practice Certificates."
      }
    ]
  },

  PROFESSIONAL_LIABILITY_INSURANCE: {
    meaning:
      "Tax and audit consulting firms should maintain professional liability insurance coverage.",
    explanation:
      "Professional services firms commonly maintain insurance covering professional negligence and advisory risk exposure.",
    authority:
      "Ministry of Finance (MOF)",
    legalBasis:
      "Law on Independent Audit No. 67/2011/QH12; Decree 17/2012/ND-CP",
    impact:
      "Professional risk-management and client protection measure.",
    riskWeight: 5,
    category: "insurance",
    type: "operational",
    priority: "low",
    nextSteps: [
      {
        requirement:
          "Maintain adequate professional indemnity and liability insurance coverage."
      }
    ]
  },

  // =======================
  // CONSULTING — CONSTRUCTION & ARCHITECTURE
  // =======================

  CONSTRUCTION_CAPACITY_CERT: {
    meaning:
      "Construction consulting firms must obtain a Certificate of Capacity for Construction Activities.",
    explanation:
      "Organizations providing regulated construction consulting services must obtain a Grade I, II, or III capacity certificate from the relevant authority.",
    authority:
      "Ministry of Construction (MOC) and Provincial Departments of Construction (DOC)",
    legalBasis:
      "Decree 15/2021/ND-CP",
    impact:
      "Mandatory licensing requirement for construction consulting activities.",
    riskWeight: 75,
    category: "consulting",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Obtain the appropriate Grade I, II, or III Certificate of Capacity for Construction Activities."
      },
      {
        requirement:
          "Determine whether certification must be issued by the Ministry of Construction or provincial Department of Construction."
      }
    ]
  },

  INDIVIDUAL_PRACTICE_CERT: {
    meaning:
      "Key technical personnel must hold valid Construction Practice Certificates.",
    explanation:
      "Designers, surveyors, supervisors, and other regulated technical personnel must hold valid individual practice certifications.",
    authority:
      "Ministry of Construction (MOC)",
    legalBasis:
      "Decree 15/2021/ND-CP",
    impact:
      "Personnel qualification requirement for lawful practice.",
    riskWeight: 45,
    category: "labour",
    type: "operational",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Ensure regulated technical personnel possess valid Construction Practice Certificates."
      },
      {
        requirement:
          "Assess whether foreign professional certifications require conversion to Vietnamese equivalents."
      }
    ]
  },

  PROJECT_GRADE_LIMIT: {
    meaning:
      "The firm's construction capacity grade limits the scale and complexity of projects it may legally undertake.",
    explanation:
      "Construction consulting activities are restricted according to the grade classification of the firm's capacity certificate.",
    authority:
      "Ministry of Construction (MOC) and Department of Construction (DOC)",
    legalBasis:
      "Decree 15/2021/ND-CP",
    impact:
      "Operational limitation affecting permitted project scope.",
    riskWeight: 10,
    category: "consulting",
    type: "advisory",
    priority: "low",
    nextSteps: [
      {
        requirement:
          "Ensure the firm's Capacity Certificate grade aligns with intended project scale and complexity."
      }
    ]
  },

  MANDATORY_INSURANCE: {
    meaning:
      "Construction consultants must maintain professional liability insurance coverage.",
    explanation:
      "Vietnamese construction regulations require consultants to maintain insurance coverage proportionate to consulting contract exposure.",
    authority:
      "Ministry of Construction (MOC)",
    legalBasis:
      "Decree 15/2021/ND-CP",
    impact:
      "Professional risk-management obligation.",
    riskWeight: 10,
    category: "insurance",
    type: "operational",
    priority: "low",
    nextSteps: [
      {
        requirement:
          "Maintain professional liability insurance coverage appropriate to consulting contract value."
      }
    ]
  }

};

module.exports = consultingFlags;