console.log('Risk Engine Running');

function calculateRisk(evaluatedFlags) {

  let totalRiskScore = 0;

  const priorityCounts = {
    Prohibited: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    baseline: 0
  };

  evaluatedFlags.forEach(flag => {

    const priority = (flag.priority || "low").toLowerCase();

    // ==============================
    // 1. Skip baseline from risk
    // ==============================
    if (priority === "baseline") {
      priorityCounts.baseline++;
      return;
    }

    // ==============================
    // 2. Sum risk weights
    // ==============================
    if (typeof flag.riskWeight === "number") {
      totalRiskScore += flag.riskWeight;
    }

    // ==============================
    // 3. Count priorities
    // ==============================
    if (priorityCounts.hasOwnProperty(priority)) {
      priorityCounts[priority]++;
    }

  });

  // ==============================
  // 4. Determine risk level (FIXED)
  // ==============================

 let riskLevel = "Low";

if (priorityCounts.prohibited >= 1) {

  riskLevel = "Prohibited";

}
else if (priorityCounts.critical >= 1 && totalRiskScore >= 40) {

  riskLevel = "Critical";

}
else if (priorityCounts.critical >= 1 || totalRiskScore >= 50) {

  riskLevel = "High";

}
else if (priorityCounts.high >= 1 || totalRiskScore >= 25) {

  riskLevel = "Medium";

}

  // ==============================
  // 5. Blockers (REFINED)
  // ==============================

  const blockers = evaluatedFlags
.filter(flag => {

  const priority =
    (flag.priority || "").toLowerCase();

  return (
    (priority === "prohibited" ||
     priority === "critical") &&
    flag.isBlocker === true
  );

})
    .map(flag => ({
      key: flag.key,
      meaning: flag.meaning,
      impact: flag.impact
    }));

  // ==============================
  // RETURN
  // ==============================

  return {
    riskLevel,
    totalRiskScore,
    blockers
  };
}

module.exports = { calculateRisk };