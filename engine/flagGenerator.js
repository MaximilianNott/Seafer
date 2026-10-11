const { SECTOR_REGISTRY } = require("../registries/sectorRegistry");
const { FLAG_REGISTRY } = require("../registries/flagRegistry");


// ==============================
// MAIN FLAG ENGINE
// ==============================

function generateFlags(input) {

  const flags = [];

  // ==============================
  // 1. SECTOR REGISTRY FLAGS
  // ==============================

 (input.sectors || []).forEach((sector) => {
  const sectorConfig = SECTOR_REGISTRY[sector];

  if (!sectorConfig) {
    console.warn(`Unknown sector: ${sector}`);
    return;
  }

  if (
    typeof sectorConfig.applies === "function" &&
    !sectorConfig.applies(input)
  ) {
    return;
  }

  if (Array.isArray(sectorConfig.flags)) {
    flags.push(...sectorConfig.flags);
  }
});

  // ==============================
  // 2. DYNAMIC applies() FLAGS
  // ==============================

  Object.entries(FLAG_REGISTRY).forEach(([flagKey, flagConfig]) => {

    // Optional chaining avoids crashing if applies is undefined
    if (typeof flagConfig.applies === "function") {

      try {

        // Dynamic runtime rule evaluation
        const shouldApply = flagConfig.applies(input);

        if (shouldApply === true) {
          flags.push(flagKey);
        }

      } catch (error) {

        // Defensive isolation:
        // One broken flag should NEVER crash the engine
        console.error(`Flag evaluation failed: ${flagKey}`, error);
      }
    }
  });


// ==============================
// 4. DEDUPLICATION
// ==============================

// Set removes duplicates automatically
const uniqueFlags = [...new Set(flags)];

console.log("GENERATED FLAGS:", uniqueFlags);

return uniqueFlags;
}

module.exports = {
  generateFlags
};