const { FLAG_REGISTRY } = require("../registries/flagRegistry");

function buildExplanation(flags) {

  const result = [];

  flags.forEach(flag => {
    const flagData = FLAG_REGISTRY[flag];

    if (flagData) {
      result.push({
        flag,
        meaning: flagData.meaning,
        explanation: flagData.explanation,
        authority: flagData.authority,
        legalBasis: flagData.legalBasis,
        impact: flagData.impact,
        category: flagData.category
      });
    }
  });

  return result;
}

module.exports = { buildExplanation };