function buildResponse({
  risk,
  steps = {},
  flags = [],
  sequence = { entityType: null, stages: [] }
}) {

  return {

    // ==============================
    // RISK
    // ==============================

    riskLevel: risk.riskLevel,

    riskScore: risk.totalRiskScore,

    isProhibited:
      risk.riskLevel === "Prohibited",

    // ==============================
    // FLAGS
    // ==============================

    flags: flags.map(f => ({

      key: f.key,

      meaning: f.meaning,

      explanation: f.explanation,

      impact: f.impact,

      priority: f.priority,

      category: f.category,

      authority: f.authority,

      legalBasis: f.legalBasis,

      isBlocker: f.isBlocker || false,

      isProhibited:
        (f.priority || "").toLowerCase() === "prohibited"

    })),

    // ==============================
    // BLOCKERS
    // ==============================

    blockers: (risk.blockers || []).map(b => ({

      key: b.key,

      meaning: b.meaning,

      impact: b.impact

    })),

    // ==============================
    // NEXT STEPS
    // Already grouped by nextSteps.js
    // ==============================

    nextSteps: steps,

    // ==============================
    // REGULATORY SEQUENCE
    // ==============================

    sequence

  };
}

module.exports = { buildResponse };