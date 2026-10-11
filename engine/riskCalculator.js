const { FLAG_REGISTRY } = require("../registries/flagRegistry");

function calculateRisk(flags) {
  let score = 0;

  flags.forEach(flag => {
    const weight = FLAG_REGISTRY[flag]?.riskWeight || 0;
    score += weight;
  });

  // Cap score at 100
  if (score > 100) score = 100;

  let riskLevel = "Low";

  if (score >= 60) {
    riskLevel = "High";
  } else if (score >= 30) {
    riskLevel = "Medium";
  }

  return {
    score,
    riskLevel
  };
}

module.exports = { calculateRisk };