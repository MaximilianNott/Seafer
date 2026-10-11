const manufacturingFlags = {

// =======================
// MANUFACTURING — ELECTRONICS
// =======================

ELECTRONICS_ROHS_DECLARATION: {
  meaning:
    "Mandatory disclosure and conformity assessment relating to hazardous substances in electronic products and components.",
  explanation:
    "Electronic products entering the Vietnamese market may require declaration and testing for restricted hazardous substances including lead, mercury, cadmium, and related chemical compounds.",
  authority: "Ministry of Industry and Trade (MOIT)",
  legalBasis:
    "Circular 30/2011/TT-BCT; Law on Chemicals 2025",
  impact:
    "Non-compliant products may face import restrictions, customs delays, or circulation bans.",
  riskWeight: 75,
  category: "trading",
  type: "compliance",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Conduct hazardous substance testing through a VILAS-certified laboratory."
    },
    {
      requirement:
        "Prepare and submit Declaration of Conformity documentation where applicable."
    }
  ]
},

ELECTRONICS_CR_MARK: {
  meaning:
    "CR conformity marking and technical approval required for regulated telecommunications and IT equipment.",
  explanation:
    "Certain electronic, radio, telecommunications, and IT equipment must obtain technical conformity certification and display the CR mark prior to importation or commercial sale.",
  authority:
    "Ministry of Information and Communications (MIC)",
  legalBasis:
    "Circular 02/2024/TT-BTTTT",
  impact:
    "Products may be denied customs clearance or prohibited from lawful distribution without certification.",
  riskWeight: 90,
  category: "trading",
  type: "compliance",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Obtain Type Approval Certificate through MIC-designated testing laboratories."
    },
    {
      requirement:
        "Complete Declaration of Conformity procedures and ensure CR marking requirements are satisfied."
    }
  ]
},

TECH_PATENT_CHECK: {
  meaning:
    "Assessment of potential infringement risks relating to Vietnamese patents, utility solutions, and protected technologies.",
  explanation:
    "Manufacturers should verify that electronic products, components, and production methods do not infringe protected intellectual property rights registered in Vietnam.",
  authority:
    "IP Vietnam / Ministry of Science and Technology",
  legalBasis:
    "Law on Intellectual Property 2022",
  impact:
    "Potential exposure to customs seizure, injunctions, litigation, or import/export restrictions.",
  riskWeight: 65,
  category: "sector_specific",
  type: "operational",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Conduct a Freedom to Operate (FTO) assessment covering core technical components and manufacturing processes."
    },
    {
      requirement:
        "Review WIPO and IP Vietnam databases for overlapping patents or utility solutions."
    }
  ]
},

// ==========================================
// MANUFACTURING — ELECTRONICS (FIRE SAFETY)
// ==========================================

ELECTRONICS_CLEANROOM_ISOLATION: {
  meaning:
    "Mandatory localized fire and smoke isolation mechanisms for cleanrooms and high-airflow HVAC systems.",
  explanation:
    "Electronics cleanrooms rely on heavy, continuous air recirculation. To prevent a localized electrical fire from spreading smoke instantly across the entire cleanroom envelope, the facility must integrate certified motorized fire dampers linked directly to the main fire alarm panel.",
  authority:
    "Provincial Police Fire Prevention and Fighting Department (PC07) and Department of Construction (DOC)",
  legalBasis:
    "Decree 136/2020/ND-CP; QCVN 06:2022/BXD",
  impact:
    "Demands complex HVAC integration during architectural design; structural and mechanical components require specific Vietnamese conformity testing.",
  riskWeight: 85,
  category: "fire_safety",
  type: "structural",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Ensure HVAC blueprints isolate cleanrooms into distinct zones with compliant fire-rated dampers."
    },
    {
      requirement:
        "Verify all cleanroom paneling and insulation materials carry approved fire-resistance (EI) certificates."
    }
  ]
},

ELECTRONICS_GAS_SUPPRESSION: {
  meaning:
    "Mandatory deployment of clean agent/gas-based fire suppression systems in precision assembly and server zones.",
  explanation:
    "Standard water sprinklers cause catastrophic, irreversible damage to delicate surface mount technology (SMT) lines, semiconductor equipment, and high-value testing areas. The engine must track the installation of clean agent gas suppression (e.g., FM-200, Novec 1230, or Inert Gas).",
  authority:
    "Provincial Police Fire Prevention and Fighting Department (PC07)",
  legalBasis:
    "Decree 136/2020/ND-CP; TCVN 7161-1:2022",
  impact:
    "Significantly increases equipment procurement costs and requires hermetically sealed rooms to maintain gas concentration during a discharge event.",
  riskWeight: 90,
  category: "fire_safety",
  type: "infrastructure",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Identify high-value equipment rooms and SMT assembly areas requiring clean agent gas systems instead of standard water systems."
    },
    {
      requirement:
        "Incorporate acoustic and structural integrity tests to ensure targeted rooms can hold gas pressure during an emergency deployment."
    }
  ]
},

ELECTRONICS_LITHIUM_STORAGE: {
  meaning:
    "Specialized structural isolation and environmental controls for lithium-ion batteries or volatile chemical inputs.",
  explanation:
    "If the manufacturing process involves components like lithium batteries, volatile soldering fluxes, or chemical solvents, these spaces trigger high-risk reclassifications. They require isolated, blast-resistant, or explosion-proof storage facilities separate from the main assembly floor.",
  authority:
    "Ministry of Industry and Trade (MOIT) / Provincial Fire Police (PC07)",
  legalBasis:
    "Law on Chemicals 2025; QCVN 06:2022/BXD",
  impact:
    "Triggers rigorous multi-ministry facility layout reviews and strict storage volume restrictions.",
  riskWeight: 95,
  category: "fire_safety",
  type: "structural",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Assess your exact hazardous chemical and battery inventory to determine if physical warehouse separation is legally triggered."
    },
    {
      requirement:
        "Designate targeted zones for explosion-proof electrical installations and localized exhaust systems."
    }
  ]
},

ELECTRONICS_ESD_ELECTRICAL_SAFETY: {
  meaning:
    "Strict engineering controls for Electrostatic Discharge (ESD) management and high-load electrical substation protection.",
  explanation:
    "Electronics plants run continuous, automated high-current machinery alongside sensitive micro-components. Defective electrical grounding can spark or cause thermal overloads, making anti-static flooring systems and automated thermal-monitoring sensors highly critical.",
  authority:
    "Ministry of Industry and Trade (MOIT) / Vietnam Electricity (EVN)",
  legalBasis:
    "Law on Electricity 2004 (amended); TCVN 7447:2010",
  impact:
    "Impacts electrical wiring, grid layout, and machinery grounding designs; mandatory for passing local electrical safety sign-offs.",
  riskWeight: 75,
  category: "fire_safety",
  type: "infrastructure",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Incorporate a localized, validated grounding grid specifically separated from structural building lightning protection."
    },
    {
      requirement:
        "Include continuous thermal imaging or temperature monitoring sensors across all high-capacity power distribution boards."
    }
  ]
},


// =======================
// MANUFACTURING — TEXTILES & GARMENTS
// =======================

GARMENT_EPR_CONTRIBUTION: {
  meaning:
    "Extended Producer Responsibility (EPR) obligations may apply to textile products, packaging, and manufacturing waste streams.",
  explanation:
    "Textile and garment manufacturers may be required to contribute to recycling obligations or implement approved recycling and waste-management programs.",
  authority:
    "Ministry of Natural Resources and Environment (MONRE)",
  legalBasis:
    "Law on Environmental Protection 2020; Decree 08/2022/ND-CP",
  impact:
    "Creates ongoing environmental compliance costs and reporting obligations.",
  riskWeight: 60,
  category: "environmental",
  type: "operational",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Assess whether the enterprise falls within mandatory EPR contribution thresholds."
    },
    {
      requirement:
        "Register EPR reporting or recycling compliance plans with the National EPR framework where applicable."
    }
  ]
},

GARMENT_YARN_ORIGIN: {
  meaning:
    "Origin tracing and supply chain verification required to qualify for preferential tariff treatment under applicable FTAs.",
  explanation:
    "Export-oriented garment manufacturers seeking preferential tariff treatment under CPTPP or EVFTA must satisfy yarn-forward or fabric-origin traceability requirements.",
  authority:
    "Vietnam Chamber of Commerce and Industry (VCCI) and Vietnam Customs",
  legalBasis:
    "Decree 31/2018/ND-CP; Circular 05/2018/TT-BCT",
  impact:
    "Failure to satisfy origin requirements may eliminate preferential tariff eligibility.",
  riskWeight: 70,
  category: "trading",
  type: "operational",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Maintain end-to-end traceability documentation for yarn, fabric, and production inputs."
    },
    {
      requirement:
        "Implement supplier verification and origin certification controls."
    }
  ]
},

GARMENT_WATER_MONITORING: {
  meaning:
    "Real-time wastewater monitoring and environmental reporting obligations may apply to dyeing and chemical-intensive textile manufacturing operations.",
  explanation:
    "Facilities conducting dyeing, washing, or chemical-intensive textile production may be required to install automated wastewater monitoring and reporting systems.",
  authority:
    "Provincial Department of Natural Resources and Environment (DONRE)",
  legalBasis:
    "QCVN 13-MT:2015/BTNMT",
  impact:
    "Environmental non-compliance may result in fines, permit suspension, or operational shutdown.",
  riskWeight: 95,
  category: "environmental",
  type: "compliance",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Install automated wastewater monitoring systems where legally required."
    },
    {
      requirement:
        "Integrate environmental reporting feeds with provincial DONRE monitoring systems."
    }
  ]
},

GARMENT_IP_INFRINGEMENT: {
  meaning:
    "Garment and textile products must avoid infringement of protected trademarks, industrial designs, and other intellectual property rights.",
  explanation:
    "Vietnam actively enforces intellectual property protections relating to garment branding, patterns, industrial designs, and product appearance.",
  authority:
    "Intellectual Property Office of Vietnam (IP Vietnam)",
  legalBasis:
    "Law on Intellectual Property 2022",
  impact:
    "Potential exposure to product seizure, customs action, fines, or civil litigation.",
  riskWeight: 55,
  category: "ip",
  type: "operational",
  priority: "medium",
  nextSteps: [
    {
      requirement:
        "Conduct trademark and industrial design clearance searches prior to commercial production."
    },
    {
      requirement:
        "Review branding, patterns, and product designs against protected IP registrations."
    }
  ]
},

// ==========================================
// MANUFACTURING — TEXTILES & GARMENTS (FIRE SAFETY)
// ==========================================

GARMENT_FIRE_COMPARTMENTATION: {
  meaning:
    "Mandatory structural fire separation walls and fire-rated zones based on factory volume and risk class.",
  explanation:
    "Garment manufacturing facilities hold high fire loads. Structural layouts must feature physical fire barriers (walls, doors, panels) with approved fire-resistance ratings (EI) to limit fire spread.",
  authority:
    "Provincial Police Fire Prevention and Fighting Department (PC07)",
  legalBasis:
    "Decree 136/2020/ND-CP; QCVN 06:2022/BXD",
  impact:
    "Requires architectural integration of certified fire-rated materials; failure blocks the factory construction permit.",
  riskWeight: 85,
  category: "fire_safety",
  type: "structural",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Determine the fire resistance rating requirements for all structural walls and interior partition panels."
    },
    {
      requirement:
        "Ensure layout drawings divide high-density production zones into compliant fire compartments."
    }
  ]
},

GARMENT_FIRE_EGRESS_DENSITY: {
  meaning:
    "High-occupant evacuation route and emergency exit path profiling.",
  explanation:
    "Because garment assembly lines feature exceptionally high worker density per square meter, the system must enforce strict maximum travel distances to exits and minimum door clearance widths.",
  authority:
    "Provincial Police Fire Prevention and Fighting Department (PC07) and Department of Construction (DOC)",
  legalBasis:
    "QCVN 06:2022/BXD",
  impact:
    "Non-compliant exit layout designs will trigger immediate rejection during the mandatory Fire Design Appraisal phase.",
  riskWeight: 90,
  category: "fire_safety",
  type: "structural",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Calculate the maximum evacuation distance from the furthest internal workstation to the nearest exit door."
    },
    {
      requirement:
        "Verify total emergency exit widths match the total calculated worker occupancy of the production floor."
    }
  ]
},

GARMENT_AUTOMATIC_SUPPRESSION: {
  meaning:
    "Mandatory installation of automated water-sprinkler or deluge systems in high-risk raw material zones.",
  explanation:
    "Manual fire hoses are legally insufficient for high-density fabric storage, cutting rooms, and finished goods warehouses. These spaces require automated, overhead active suppression loops.",
  authority:
    "Provincial Police Fire Prevention and Fighting Department (PC07)",
  legalBasis:
    "Decree 136/2020/ND-CP; TCVN 7336:2021",
  impact:
    "Significantly drives up mechanical, electrical, and plumbing (MEP) infrastructure costs and water storage requirements.",
  riskWeight: 95,
  category: "fire_safety",
  type: "infrastructure",
  priority: "critical",
  nextSteps: [
    {
      requirement:
        "Assess whether warehouse and material storage configurations trigger mandatory automatic sprinkler loops."
    },
    {
      requirement:
        "Designate space for localized fire water storage tanks and specialized backup pumping stations."
    }
  ]
},

GARMENT_DUST_EXPLOSION_HAZARD: {
  meaning:
    "Mitigation and ventilation controls for airborne combustible textile dust and lint accumulation.",
  explanation:
    "Spinning, cutting, and fabric-processing areas generate fine, highly flammable airborne lint. The facility must deploy specialized exhaust and dust collection infrastructure to prevent flash fires.",
  authority:
    "Department of Labor, Invalids and Social Affairs (DOLISA) / PC07",
  legalBasis:
    "Law on Occupational Safety and Health 2015; TCVN 3288:1979",
  impact:
    "Operational hazards that directly impact worker safety certifications and recurring fire safety audits.",
  riskWeight: 70,
  category: "fire_safety",
  type: "operational",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Integrate automated dust extraction and HVAC filtration systems into localized high-lint processing zones."
    },
    {
      requirement:
        "Establish standardized operational cleaning protocols to eliminate hazardous surface dust buildup."
    }
  ]
},

GARMENT_FIRE_EQUIPMENT_CONFORMITY: {
  meaning:
    "Mandatory local testing and stamp verification for all installed fire safety and structural protection components.",
  explanation:
    "All fire safety equipment, fire doors, pumps, and even fire-retardant paints—whether imported or locally sourced—must be physically tested and stamped by the Vietnamese Fire Police before installation.",
  authority:
    "Fire Prevention and Fighting University or Vietnam Fire Police (C07/PC07)",
  legalBasis:
    "Decree 136/2020/ND-CP; Decree 50/2024/ND-CP",
  impact:
    "Procurement bottlenecks; un-stamped materials will cause complete failure during the final As-Built operational inspection.",
  riskWeight: 80,
  category: "fire_safety",
  type: "procurement",
  priority: "high",
  nextSteps: [
    {
      requirement:
        "Audit structural and mechanical supply chains to ensure all vendors can provide Vietnamese Fire Police Conformity Certificates (Giấy chứng nhận kiểm định phương tiện PCCC)."
    }
  ]
}

};

module.exports = manufacturingFlags;