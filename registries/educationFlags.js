const educationFlags = {

// =======================
// EDUCATION — SHORT-TERM TRAINING
// =======================

LANGUAGE_CENTER_PRINCIPAL_QUALIFICATION: {
  meaning:
    "Language and skills training centers must appoint a qualified Director/Principal meeting educational and management standards.",
  explanation:
    "Educational institutions must maintain a legally qualified educational manager satisfying experience and academic qualification requirements.",
  authority:
    "Department of Education and Training (DOET)",
  legalBasis:
    "Decree 125/2024/ND-CP",
  impact:
    "Mandatory condition for operational licensing approval.",
  riskWeight: 50,
  category: "labour",
  type: "compliance",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Ensure the appointed Principal possesses a relevant university qualification and sufficient education management experience."
    }
  ]
},

// =======================
// EDUCATION — K-12 & HIGHER EDUCATION
// =======================

K12_STUDENT_QUOTA_LIMIT: {
  meaning:
    "Foreign-invested international schools are subject to restrictions on Vietnamese student enrollment ratios.",
  explanation:
    "Vietnam imposes enrollment caps limiting the percentage of Vietnamese nationals permitted within certain foreign-invested educational institutions.",
  authority:
    "Ministry of Education and Training (MOET) / Local DOET",
  legalBasis:
    "Decree No. 124/2024/ND-CP (Amending Decree 86/2018/ND-CP)",
  impact:
    "Material operational and revenue-model constraint for international schools.",
  riskWeight: 80,
  category: "education",
  type: "operational",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Ensure enrollment and financial projections account for Vietnamese student quota restrictions."
    },
    {
      requirement:
        "Monitor student nationality composition on an ongoing compliance basis."
    }
  ]
},

EDUCATION_LAND_TENURE_CHECK: {
  meaning:
    "Educational institutions operating physical campuses require stable long-term land use rights or lease arrangements.",
  explanation:
    "K-12 schools and universities are generally expected to maintain secure land tenure aligned with the investment project duration.",
  authority:
    "Department of Natural Resources and Environment (DONRE)",
  legalBasis:
    "Decree 125/2024/ND-CP",
  impact:
    "Long-term site feasibility and licensing requirement.",
  riskWeight: 65,
  category: "construction",
  type: "compliance",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Verify the Land Use Rights Certificate permits educational use for the duration of the investment project."
    },
    {
      requirement:
        "Ensure lease or land tenure arrangements align with IRC duration requirements."
    }
  ]
},

// =======================
// EDUCATION — EDTECH / ONLINE EDUCATION
// =======================

EDTECH_E_LEARNING_NOTIFICATION: {
  meaning:
    "Online education platforms may require e-commerce notification or registration compliance.",
  explanation:
    "Pure online learning platforms are commonly treated as digital service or e-commerce platforms under MOIT regulatory frameworks.",
  authority:
    "Ministry of Industry and Trade (MOIT)",
  legalBasis:
    "Decree No. 52/2013/ND-CP & Decree No. 85/2021/ND-CP",
  impact:
    "Operational digital platform compliance requirement.",
  riskWeight: 40,
  category: "digital",
  type: "operational",
  priority: "medium",
  nextSteps: [
    {
      requirement:
        "Complete MOIT website or platform notification procedures where applicable."
    },
    {
      requirement:
        "Assess whether the platform qualifies as an e-commerce service provider under Vietnamese regulations."
    }
  ]
},

// =======================
// EDUCATION — GENERAL SECTOR REQUIREMENTS
// =======================

CAPITAL_RESTRICTIONS_EDUCATION: {
  meaning:
    "Foreign-invested education projects are subject to minimum investment and capital allocation requirements.",
  explanation:
    "Vietnam imposes minimum capital thresholds and investment ratios depending on institution type, scale, and projected student capacity.",
  authority:
    "MOET; Provincial People's Committee; DOET",
  legalBasis:
    "Decree No. 124/2024/ND-CP",
  impact:
    "Core licensing and investment approval requirement.",
  riskWeight: 75,
  category: "education",
  type: "compliance",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Verify project capital satisfies minimum investment requirements applicable to the institution category and student scale."
    },
    {
      requirement:
        "Prepare financial capacity documentation supporting long-term educational operations."
    }
  ]
},

CONSTRUCTION_STANDARDS_EDUCATION: {
  meaning:
    "Educational construction projects must comply with land use, campus density, and infrastructure standards.",
  explanation:
    "Physical educational institutions are subject to minimum land area, classroom density, infrastructure, and spatial planning standards.",
  authority:
    "Ministry of Construction (MOC) and Provincial Department of Construction (DOC)",
  legalBasis:
    "Decree No. 125/2024/ND-CP",
  impact:
    "Critical project approval and educational licensing requirement.",
  riskWeight: 75,
  category: "construction",
  type: "compliance",
  priority: "critical",

  // Recommended future rule hook
  // applies: (input) =>
  //   input.constructionRequired === true,

  nextSteps: [
    {
      requirement:
        "Ensure campus design and construction plans satisfy applicable land area and student density standards."
    },
    {
      requirement:
        "Verify educational infrastructure complies with provincial planning and construction requirements."
     }
    ]
  }

};

module.exports = educationFlags;
