const foodBeverageFlags = {

  // =======================
  // FOOD & BEVERAGE — RESTAURANT SERVICES
  // =======================

  ALCOHOL_ONSITE_CONSUMPTION: {
    meaning:
      "Restaurants and hospitality venues serving alcohol for on-site consumption may require registration or licensing depending on alcohol content and business model.",
    explanation:
      "Vietnam regulates on-premise alcohol sales differently depending on beverage alcohol concentration and operating structure.",
    authority:
      "District Economic Division or Department of Industry and Trade (DOIT)",
    legalBasis:
      "Decree 105/2017/ND-CP; Decree 17/2020/ND-CP",
    impact:
      "Mandatory operational licensing requirement for venues serving alcoholic beverages.",
    riskWeight: 60,
    category: "food_beverage",
    type: "compliance",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Verify the premises complies with zoning distance requirements from schools, hospitals, and restricted facilities."
      },
      {
        requirement:
          "Determine whether alcohol registration or a full Alcohol Retail License is required based on ABV thresholds."
      }
    ]
  },

  FIRE_SAFETY_KITCHEN: {
    meaning:
      "Commercial kitchens must comply with specialized fire prevention and suppression requirements.",
    explanation:
      "Restaurants operating high-heat cooking systems, LPG infrastructure, or grease-heavy commercial kitchens are subject to enhanced fire prevention standards.",
    authority:
      "Fire Prevention, Firefighting and Rescue Police (C07)",
    legalBasis:
      "Decree 136/2020/ND-CP; Decree 50/2024/ND-CP; QCVN 06:2022/BXD",
    impact:
      "Non-compliance may block operational approval and Food Safety certification.",
    riskWeight: 85,
    category: "fire_safety",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Install wet chemical fire suppression systems appropriate for grease and oil fires."
      },
      {
        requirement:
          "Implement gas leak detection and automatic shutoff systems for LPG infrastructure."
      },
      {
        requirement:
          "Ensure kitchen exhaust and ventilation systems comply with fire compartment and escape-route requirements."
      }
    ]
  },

  RETAIL_TRADING_LICENSE: {
    meaning:
      "Restaurants engaging in direct retail sale of packaged food products or branded merchandise may require additional retail trading authorization.",
    explanation:
      "Retail sale of packaged goods beyond prepared food service may constitute regulated retail trading activity.",
    authority:
      "Provincial Department of Industry and Trade (DOIT)",
    legalBasis:
      "Decree 09/2018/ND-CP",
    impact:
      "Additional licensing obligations may apply for non-restaurant retail activities.",
    riskWeight: 30,
    category: "trading",
    type: "compliance",
    priority: "medium",
    applies: (input) => {

  return (

    input.sectors.includes("restaurant_services") &&

    (
      input.sectors.includes("retail_trading") ||
      input.sectors.includes("direct_online_retail_b2c") ||
      input.sectors.includes("ecommerce_marketplace")
    )

  );

},
    nextSteps: [
      {
        requirement:
          "Confirm whether retail trading activities are included within the registered IRC/ERC business lines."
      }
    ]
  },

  // =======================
  // FOOD & BEVERAGE — FOOD PROCESSING
  // =======================

  PRODUCT_SELF_DECLARATION: {
    meaning:
      "Processed food manufacturers must complete product self-declaration procedures prior to commercial sale.",
    explanation:
      "Most packaged food products require laboratory testing and formal self-declaration before lawful circulation in Vietnam.",
    authority:
      "Provincial Food Safety Authority / Department of Health",
    legalBasis:
      "Decree 15/2018/ND-CP",
    impact:
      "Mandatory product market-entry requirement for each applicable SKU.",
    riskWeight: 75,
    category: "product_compliance",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Conduct product testing through an ISO 17025 accredited laboratory."
      },
      {
        requirement:
          "Publish and maintain product self-declaration documentation prior to market launch."
      }
    ]
  },

  VIETNAMESE_LABELING_REQUIREMENTS: {
    meaning:
      "Food and beverage products sold in Vietnam must comply with mandatory Vietnamese-language labeling requirements.",
    explanation:
      "Labels must contain mandatory information including ingredients, origin, expiry dates, and safety information in Vietnamese.",
    authority:
      "Ministry of Science and Technology and Ministry of Health",
    legalBasis:
      "Decree 37/2026/ND-CP",
    impact:
      "Operational packaging and customs compliance requirement.",
    riskWeight: 50,
    category: "product_compliance",
    type: "operational",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Ensure compliant Vietnamese labeling or supplementary labels are applied prior to commercial distribution."
      },
      {
        requirement:
          "Assess whether electronic labeling solutions are permissible for the product category."
      }
    ]
  },

  FIRE_SAFETY_FOOD_PROCESSING: {
    meaning:
      "Industrial food processing facilities must comply with enhanced fire prevention and industrial safety requirements.",
    explanation:
      "Factories involving thermal processing, industrial cooking, powders, oils, or combustible production systems are subject to extensive fire safety regulation.",
    authority:
      "Fire Prevention, Firefighting and Rescue Police (C07)",
    legalBasis:
      "Law on Fire Prevention and Fighting; TCVN 3890:2023; QCVN 06:2022/BXD",
    impact:
      "Mandatory prerequisite for factory approval and lawful industrial operation.",
    riskWeight: 95,
    category: "fire_safety",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Install compliant automatic fire alarm and suppression systems."
      },
      {
        requirement:
          "Implement dust explosion prevention controls where powder processing is involved."
      },
      {
        requirement:
          "Obtain Fire Safety Design Appraisal approval prior to construction or machinery installation."
      }
    ]
  },

  // =======================
  // FOOD & BEVERAGE — BARS / NIGHTLIFE
  // =======================

  SECURITY_ORDER_ANTT: {
    meaning:
      "Bars and nightlife venues must obtain a Certificate of Eligibility for Security and Order (ANTT).",
    explanation:
      "Entertainment venues are classified as businesses affecting social order and are subject to enhanced police supervision and approval.",
    authority:
      "Ministry of Public Security (MPS) and Local Administrative Police",
    legalBasis:
      "Decree 96/2016/ND-CP",
    impact:
      "Mandatory operational approval for nightlife venues.",
    riskWeight: 80,
    category: "security",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Obtain Criminal Record Certificate No.2 for key managers and legal representatives."
      },
      {
        requirement:
          "Pass local police inspection relating to venue security and operational controls."
      }
    ]
  },

  ALCOHOL_RETAIL_LICENSE: {
    meaning:
      "Bars selling alcoholic beverages above regulated ABV thresholds require an Alcohol Retail License.",
    explanation:
      "Vietnam imposes licensing and zoning restrictions on the retail sale of higher-alcohol-content beverages.",
    authority:
      "District People's Committee / Department of Industry and Trade (DOIT)",
    legalBasis:
      "Decree 105/2017/ND-CP",
    impact:
      "Core operational licensing requirement for alcohol-focused venues.",
    riskWeight: 70,
    category: "food_beverage",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Verify zoning and distance restrictions from protected public facilities."
      },
      {
        requirement:
          "Obtain supply relationship documentation from a licensed Vietnamese alcohol wholesaler."
      }
    ]
  },

  MUSIC_COPYRIGHT_COMPLIANCE: {
    meaning:
      "Commercial public performance of music requires copyright licensing and royalty compliance.",
    explanation:
      "Venues playing copyrighted music must register usage and pay royalties through the appropriate collective rights management organization.",
    authority:
      "Vietnam Center for Protection of Music Copyright (VCPMC)",
    legalBasis:
      "Law on Intellectual Property 2022",
    impact:
      "Operational copyright compliance obligation.",
    riskWeight: 10,
    category: "intellectual_property",
    type: "operational",
    priority: "low",
    nextSteps: [
      {
        requirement:
          "Register music usage and maintain royalty payment compliance with VCPMC."
      }
    ]
  },

  NOISE_POLLUTION_STANDARDS: {
    meaning:
      "Entertainment venues must comply with national technical standards relating to environmental noise emissions.",
    explanation:
      "Bars and venues operating amplified sound systems may face restrictions, inspections, or penalties relating to excessive noise.",
    authority:
      "Department of Natural Resources and Environment (DONRE)",
    legalBasis:
      "QCVN 26:2010/BTNMT",
    impact:
      "Operational exposure to fines, suspension orders, or neighborhood enforcement actions.",
    riskWeight: 55,
    category: "environmental",
    type: "operational",
    priority: "high",
    nextSteps: [
      {
        requirement:
          "Install compliant soundproofing and acoustic treatment systems."
      },
      {
        requirement:
          "Ensure materials satisfy applicable fire retardancy requirements."
      }
    ]
  },

  FIRE_SAFETY_BAR: {
    meaning:
      "Bars and entertainment venues are subject to enhanced fire prevention and occupancy safety requirements.",
    explanation:
      "Entertainment venues with high occupancy loads, enclosed environments, stage systems, or amplified sound infrastructure face elevated fire safety obligations.",
    authority:
      "Fire Prevention, Firefighting and Rescue Police (C07)",
    legalBasis:
      "Decree 136/2020/ND-CP; Decree 50/2024/ND-CP; QCVN 06:2022/BXD",
    impact:
      "Mandatory fire safety approval and inspection required before operation.",
    riskWeight: 95,
    category: "fire_safety",
    type: "compliance",
    priority: "critical",
    nextSteps: [
      {
        requirement:
          "Verify all acoustic and decorative materials satisfy fire retardancy standards."
      },
      {
        requirement:
          "Ensure compliant emergency exits and unobstructed evacuation pathways."
      },
      {
        requirement:
          "Install smoke extraction and compliant ventilation systems."
      },
      {
        requirement:
          "Obtain the Certificate of Satisfaction of Fire Prevention and Fighting Conditions."
      }
    ]
  },

  STAFF_HEALTH_CERTIFICATION: {
    meaning:
      "Food handling personnel must undergo periodic health examinations and maintain valid health certifications.",
    explanation:
      "Employees directly involved in food preparation, handling, or processing must maintain valid medical certifications issued by approved healthcare providers.",
    authority:
      "District Health Centers and licensed hospitals",
    legalBasis:
      "Circular 14/2013/TT-BYT; Law on Food Safety 2010",
    impact:
      "Operational compliance requirement subject to inspection enforcement.",
    riskWeight: 40,
    category: "labour",
    type: "operational",
    priority: "medium",
    nextSteps: [
      {
        requirement:
          "Ensure all relevant personnel obtain valid health certification from approved medical providers."
      },
      {
        requirement:
          "Implement annual renewal tracking procedures for employee certifications."
      }
    ]
  }

};

module.exports = foodBeverageFlags;