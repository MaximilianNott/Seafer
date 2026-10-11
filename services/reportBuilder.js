function buildReport(engineResult, normalizedInput) {

  const now = new Date().toISOString();

  // ==============================
  // FLAG CATEGORISATION
  // ==============================

  const allFlags = engineResult.flags || [];

  const baselineFlags = allFlags.filter(
    f => f.priority === "baseline"
  );

  const regulatoryFlags = allFlags.filter(
    f => f.priority !== "baseline"
  );

  const prohibitedFlags = regulatoryFlags.filter(
    f => f.priority === "prohibited"
  );

  const criticalFlags = regulatoryFlags.filter(
    f => f.priority === "critical"
  );

  const highFlags = regulatoryFlags.filter(
    f => f.priority === "high"
  );

  const mediumFlags = regulatoryFlags.filter(
    f => f.priority === "medium"
  );

  const lowFlags = regulatoryFlags.filter(
    f => f.priority === "low"
  );


  // ==============================
  // RISK INTERPRETATION
  // ==============================

  let interpretation = "";

  switch (engineResult.riskLevel) {

    case "Low":

      interpretation =
        "No material regulatory risk identified. Standard operational setup requirements apply.";

      break;


    case "Medium":

      interpretation =
        "Moderate regulatory exposure. Certain compliance obligations should be addressed before or during operation.";

      break;


    case "High":

      interpretation =
        "Elevated regulatory complexity. Multiple approvals and ongoing compliance requirements require active management.";

      break;


    case "Critical":

      interpretation =
        "Critical regulatory blockers identified. Certain approvals or legal requirements may prevent operation until resolved.";

      break;


    case "Prohibited":

      interpretation =
        "The proposed investment structure contains one or more activities identified as prohibited under the current assessment rules and requires resolution before proceeding.";

      break;


    default:

      interpretation =
        "Risk level could not be determined.";

  }


  // ==============================
  // REPORT OBJECT
  // ==============================

  return {

    // ==============================
    // REPORT METADATA
    // ==============================

    reportMeta: {

      reportTitle:
        "Vietnam Foreign Investment Regulatory Assessment",

      assessmentId:
        "SEA-" + Date.now(),

      generatedAt:
        now,

      engineVersion:
        "2.0.0",

      jurisdiction:
        "Socialist Republic of Vietnam",

      system:
        "SEAfer Regulatory Screening Engine"

    },


    // ==============================
    // USER INPUT SUMMARY
    // ==============================

    assessmentInput: {

      entityType:
        normalizedInput.entityType,

      countryOfOrigin:
        normalizedInput.countryOfOrigin,

      alreadyInVietnam:
        normalizedInput.alreadyInVietnam,

      businessActivities:
        normalizedInput.sectors,

      ownershipPercent:
        normalizedInput.ownershipPercent,

      controlStructure:
        normalizedInput.controlStructure,

      employeeScale:
        normalizedInput.headcount,

      employeeCount:
        normalizedInput.employeeCount,

      constructionRequired:
        normalizedInput.constructionRequired,

      locationType:
        normalizedInput.locationType,

      dataHandling:
        normalizedInput.dataSensitivity,

      collectsPersonalData:
        normalizedInput.collectsPersonalData,

      handlesSensitiveData:
        normalizedInput.handlesSensitiveData,

      crossBorderDataTransfer:
        normalizedInput.crossBorder,

      environmentalImpactLevel:
        normalizedInput.environmentalImpact,

      revenueGenerating:
        normalizedInput.intendsRevenue,

      foreignInvestor:
        normalizedInput.foreignInvestor,

      domesticInvestor:
        normalizedInput.domesticInvestor,

      foreignControlled:
        normalizedInput.foreignControlled,

      foreignMinority:
        normalizedInput.foreignMinority,

      hasPhysicalPresence:
        normalizedInput.hasPhysicalPresence,

      usesResidentialAddress:
        normalizedInput.usesResidentialAddress

    },


    // ==============================
    // RISK ASSESSMENT
    // ==============================

    risk: {

      level:
        engineResult.riskLevel,

      score:
        engineResult.riskScore,

      interpretation,

      triggerCount:
        regulatoryFlags.length,

      prohibitedCount:
        prohibitedFlags.length,

      criticalCount:
        criticalFlags.length,

      highCount:
        highFlags.length,

      mediumCount:
        mediumFlags.length,

      lowCount:
        lowFlags.length,

      baselineCount:
        baselineFlags.length

    },


    // ==============================
    // REGULATORY TRIGGERS
    // ==============================

    regulatoryTriggers:

      regulatoryFlags.map(flag => ({

        key:
          flag.key,

        meaning:
          flag.meaning,

        explanation:
          flag.explanation,

        authority:
          flag.authority,

        legalBasis:
          flag.legalBasis,

        impact:
          flag.impact,

        priority:
          flag.priority,

        category:
          flag.category,

        isBlocker:
          flag.isBlocker || false,

        isProhibited:
          flag.priority === "prohibited"

      })),


    // ==============================
    // STANDARD OPERATIONAL
    // REQUIREMENTS
    // ==============================

    operationalSetup:

      baselineFlags.map(flag => ({

        key:
          flag.key,

        meaning:
          flag.meaning,

        explanation:
          flag.explanation,

        authority:
          flag.authority,

        legalBasis:
          flag.legalBasis,

        impact:
          flag.impact

      })),


    // ==============================
    // BLOCKERS
    // ==============================

    blockers:

      (engineResult.blockers || []).map(blocker => ({

        key:
          blocker.key,

        meaning:
          blocker.meaning,

        impact:
          blocker.impact

      })),


    // ==============================
    // REQUIRED ACTIONS
    // ==============================

    nextSteps:
      engineResult.nextSteps || {},


    // ==============================
    // REGULATORY SEQUENCE
    // ==============================

    sequence:

      engineResult.sequence || {

        entityType:
          normalizedInput.entityType || null,

        stages:
          []

      },


    // ==============================
    // DISCLAIMER
    // ==============================

    disclaimer:

      "This assessment is an automated regulatory screening tool designed to provide an indicative overview of Vietnamese regulatory requirements based on the information submitted and the rules implemented in the SEAfer screening engine. It does not constitute legal advice and should not be relied upon as a substitute for formal legal consultation. Professional legal review should be obtained before making investment, licensing, operational, employment, data protection, land use, or market entry decisions."

  };

}


module.exports = {
  buildReport
};