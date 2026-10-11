const { FLAG_REGISTRY } = require("../registries/flagRegistry");

/**
 * Takes raw flag keys and enriches them with registry data + dynamic logic
 */
function evaluateFlags(flagKeys, input) {

  if (!Array.isArray(flagKeys)) {
    throw new Error("evaluateFlags expects an array of flag keys");
  }

  const results = [];

  flagKeys.forEach(key => {

    const flag = FLAG_REGISTRY[key];

    if (!flag) {
      console.warn(`Unknown flag key: ${key}`);
      return;
    }

    // =====================================
    // APPLIES CHECK
    // =====================================

    const applies =
      typeof flag.applies === "function"
        ? flag.applies(input)
        : true;

    if (!applies) return;

    // =====================================
    // PRIORITY
    // =====================================

    const priority =
      typeof flag.getPriority === "function"
        ? flag.getPriority(input)
        : flag.priority || "low";

    // =====================================
    // EXPLANATION
    // Allows dynamic explanations
    // =====================================

    const explanation =
      typeof flag.explanation === "function"
        ? flag.explanation(input)
        : flag.explanation;

    // =====================================
    // IMPACT
    // Allows dynamic impacts
    // =====================================

    const impact =
      typeof flag.impact === "function"
        ? flag.impact(input)
        : flag.impact;

    results.push({
      key,

      meaning: flag.meaning,

      explanation,

      impact,

      priority,

      category: flag.category,

      riskWeight: flag.riskWeight || 0,

      nextSteps: flag.nextSteps,

      authority: flag.authority,

      isBlocker: flag.isBlocker || false,

      treatyRelevant: flag.treatyRelevant || false,

      treatyType: flag.treatyType || null
    });

  });

  return results;
}

module.exports = { evaluateFlags };