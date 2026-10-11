const technologyFlags = {

// =======================
// IT — SOFTWARE DEVELOPMENT
// =======================

SOFTWARE_CIT_INCENTIVE: {
  meaning: "Software production eligible for corporate income tax incentives",
  explanation:
    "Software production is classified as a priority sector and may qualify for tax holidays, typically including a 4-year exemption followed by a 50% reduction for the subsequent 9 years.",
  authority:
    "Ministry of Information and Communications (MIC) and General Department of Taxation (GDT)",
  legalBasis:
    "Law on Corporate Income Tax 2008; Circular 13/2020/TT-BTTTT; Circular 03/2014/TT-BTTTT",
  impact:
    "Tax optimization opportunity subject to strict qualification criteria",
  riskWeight: 5,
  category: "tax",
  priority: "medium",
  nextSteps: [
    {
      requirement:
        "Ensure 'Software Production' is explicitly listed in the IRC/ERC business lines"
    },
    {
      requirement:
        "Document the full software production lifecycle to meet tax authority audit requirements"
    }
  ]
},

// =======================
// IT — DATA CENTRE / CLOUD
// =======================

VNTA_REGISTRATION_NOTIFICATION: {
  meaning: "Telecommunications registration or notification required for cloud and data centre services",
  explanation:
    "Data centre and cloud services are classified as telecommunications services and require either registration or notification with the Vietnam Telecommunications Authority depending on the business model.",
  authority: "Vietnam Telecommunications Authority (VNTA)",
  legalBasis: "Law on Telecommunications 2023 & Law on the Digital Technology Industry",
  impact:
    "Mandatory regulatory compliance prior to commercial operation",
  riskWeight: 60,
  category: "digital",
  priority: "high",

  // optional logic hook if you later model cross-border vs local
  // applies: (input) => input.sectors.includes("Data Centre/Cloud Services"),

  nextSteps: [
    {
      requirement:
        "Determine whether the business qualifies for notification or full registration based on service model"
    },
    {
      requirement:
        "Submit required notification or registration to VNTA prior to service launch"
    },
    {
      requirement:
        "Confirm foreign ownership structure complies with telecommunications regulations"
    }
  ]
},

// =======================
// IT — CYBER SECURITY SERVICES
// =======================

MPS_CYBER_SERVICE_LICENSE: {
  meaning: "License required to provide cyber-information security services",
  explanation:
    "Businesses offering cyber-information security products or services must obtain a specialized license from the Ministry of Public Security.",
  authority:
    "Ministry of Public Security (MPS) — Department A05 (Cyber Security Bureau)",
  legalBasis:
    "Law on Cyber-Information Security 2015; Decree 58/2016/ND-CP",
  impact:
    "Precondition for lawful operation in cyber security services",
  riskWeight: 85,
  category: "digital",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Apply for Cyber-Information Security Business License from MPS"
    },
    {
      requirement:
        "Ensure technical personnel meet qualification and certification requirements"
    }
  ]
},

CYBER_EMERGENCY_COOPERATION: {
  meaning: "Mandatory cooperation with authorities during cybersecurity incidents",
  explanation:
    "Cybersecurity service providers must support government investigations, including system access and provision of user data within legally mandated timeframes.",
  authority:
    "Ministry of Public Security (MPS) and Ministry of Information and Communications (MIC)",
  legalBasis:
    "Law on Cybersecurity 2018; Decree 53/2022/ND-CP",
  impact:
    "Operational compliance requirement with potential legal exposure",
  riskWeight: 70,
  category: "digital",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Establish internal protocols for government data requests and incident response"
    },
    {
      requirement:
        "Maintain 24/7 compliance contact point for regulatory coordination"
    }
  ]
}

};

module.exports = technologyFlags;

