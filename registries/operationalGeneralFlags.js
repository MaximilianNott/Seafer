const operationalGeneralFlags = {

  
  // =======================
  // FIRE + LAND
  // =======================

  FIRE_SAFETY: {
    meaning:
      "General fire safety compliance required",

    explanation:
      "Businesses operating from physical commercial or industrial premises must ensure that their premises comply with applicable fire prevention, firefighting, evacuation, and building safety requirements.",

    authority:
      "Fire Prevention, Firefighting and Rescue Police (C07 / Local PC07)",

    legalBasis:
      "Law on Fire Prevention and Fighting & Decree No. 136/2020/ND-CP",

    impact:
      "Premises must satisfy applicable fire safety requirements before and during operation.",

    riskWeight: 5,

    category: "fire_safety",

    priority: "low",

    applies: (input) => {
      return (
        input.hasPhysicalPresence === true &&
        (
          input.locationType === "commercial_premises" ||
          input.locationType === "industrial_premises"
        )
      );
    },

    nextSteps: [
      {
        requirement:
          "Verify that the premises comply with applicable fire prevention, firefighting, evacuation, and building safety requirements."
      }
    ]
  },

  GENERAL_CONSTRUCTION_COMPLIANCE: {
    meaning:
      "General construction compliance requirements apply",

    explanation:
      "Construction, renovation, expansion, or other building works may require additional planning, design, permitting, inspection, and construction-safety compliance depending on the nature and scale of the project.",

    authority:
      "Ministry of Construction (MOC) / Provincial Department of Construction (DOC) & local People's Committee",

    legalBasis:
      "Construction Law 2025 & applicable implementing regulations",

    impact:
      "The proposed works must be assessed against applicable construction, planning, permitting, and safety requirements before construction begins.",

    riskWeight: 25,

    category: "construction",

    priority: "medium",

    applies: (input) => {
      return input.requiresConstructionCompliance === true;
    },

    nextSteps: [
      {
        requirement:
          "Determine whether the proposed construction or renovation works require a construction permit or qualify for an applicable exemption."
      },
      {
        requirement:
          "Verify that the project complies with applicable planning, design, construction, and safety requirements before commencing works."
      }
    ]
  },

  LUR_INDUSTRIAL_ZONING_MANDATE: {
    meaning:
      "Industrial and production land-use verification required",

    explanation:
      "Manufacturing and industrial processing activities should be conducted from premises whose land-use designation and approved planning are compatible with the proposed activity. The specific site should be verified before committing to the premises.",

    authority:
      "Relevant provincial land-use authority / Industrial Zone Authority (IZA)",

    legalBasis:
      "Land Law 2024 & Decree No. 102/2024/ND-CP",

    impact:
      "Incompatible land use may prevent the proposed facility from lawfully proceeding and may affect subsequent construction, environmental, and fire-safety approvals.",

    riskWeight: 25,

    category: "construction",

    priority: "high",

    applies: (input) => {
      const industrialSectors = [
        "electronics_manufacturing_assembly_components",
        "textiles_and_garments",
        "food_processing"
      ];

      return (
        input.entityType === "company" &&
        input.hasPhysicalPresence &&
        input.sectors.some(
          sector => industrialSectors.includes(sector)
        )
      );
    },

    nextSteps: [
      {
        requirement:
          "Verify that the proposed site is authorised for the intended industrial or production use before signing the lease or commencing construction."
      }
    ]
  },

  LUR_COMMERCIAL_ZONING_RESTRICTIONS: {
    meaning:
      "Commercial and service-use premises verification required",

    explanation:
      "Retail, food and beverage, hospitality, and physical education activities should be conducted from premises authorised for the intended commercial, service, or institutional use.",

    authority:
      "Relevant provincial land-use and construction authority (DPI / DOC)",

    legalBasis:
      "Land Law 2024 & applicable local urban master planning frameworks",

    impact:
      "Premises that are not authorised for the intended activity may prevent the business from lawfully operating or obtaining relevant sector-specific approvals.",

    riskWeight: 15,

    category: "construction",

    priority: "medium",

    applies: (input) => {
      const commercialSectors = [
        "short_term_training_language_skills",
        "k12_higher_education",
        "retail_trading",
        "restaurant_services",
        "bars"
      ];

      return (
        input.entityType === "company" &&
        input.hasPhysicalPresence &&
        input.sectors.some(
          sector => commercialSectors.includes(sector)
        )
      );
    },

    nextSteps: [
      {
        requirement:
          "Verify that the premises are authorised for the intended commercial, service, hospitality, or educational activity."
      }
    ]
  },

  LUR_OFFICE_PREMISES_VERIFICATION: {
    meaning:
      "Office premises land-use verification",

    explanation:
      "Consulting, professional, digital, and wholesale businesses operating from standard office premises generally rely on the building's existing authorisation for office or commercial use. The enterprise should nevertheless verify that the leased premises may lawfully be used for its intended business activity.",

    authority:
      "Relevant local land-use / construction authority; building landlord where applicable",

    legalBasis:
      "Land Law 2024 & Housing Law 2023",

    impact:
      "Generally low administrative exposure where the premises are already lawfully authorised for office or commercial use.",

    riskWeight: 5,

    category: "construction",

    priority: "low",

    applies: (input) => {
      const officeSectors = [
        "management_consulting",
        "legal_consulting_foreign_law",
        "legal_consulting_vietnamese_law",
        "financial_tax_consulting",
        "construction_architectural_consulting",
        "software_development",
        "cyber_security_services",
        "wholesale_trading",
        "ecommerce_marketplace",
        "direct_online_retail_b2c"
      ];

      return (
        input.hasPhysicalPresence &&
        input.sectors.some(
          sector => officeSectors.includes(sector)
        ) &&
        !input.sectors.includes("data_centre_cloud_services")
      );
    },

    nextSteps: [
      {
        requirement:
          "Verify that the leased premises are authorised for office or commercial business use and retain appropriate premises documentation."
      }
    ]
  },

  // =======================
  // LABOUR
  // =======================

  LABOR_REGISTRATION: {
    meaning:
      "Internal labor regulations registration required",

    explanation:
      "Businesses employing 10 or more employees must register internal labor regulations.",

    authority:
      "Provincial Department of Labour, Invalids and Social Affairs (DOLISA)",

    legalBasis:
      "Labor Code 2019 & Decree No. 145/2020/ND-CP",

    impact:
      "Required for lawful disciplinary enforcement.",

    riskWeight: 3,

    category: "labour",

    priority: "low",

    applies: (input) => {
      return (
        input.establishingVietnamEntity === true &&
        input.employeeCount >= 10
      );
    }
  },

  LABOR_REPORTING: {
    meaning:
      "Periodic labor reporting obligations apply",

    explanation:
      "Employers must periodically report labor usage statistics to authorities.",

    authority:
      "Provincial Department of Labour, Invalids and Social Affairs (DOLISA) & Social Insurance Agency",

    legalBasis:
      "Labor Code 2019, Decree No. 145/2020/ND-CP (Article 4) & Circular No. 08/2026/TT-BLDTBXH",

    impact:
      "Administrative compliance obligation.",

    riskWeight: 2,

    category: "labour",

    priority: "low",

    applies: (input) => {
      return (
        input.establishingVietnamEntity === true &&
        input.employeeCount > 0
      );
    }
  }

};

module.exports = operationalGeneralFlags;