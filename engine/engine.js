const { normalizeInput } = require("./normalization");
const { generateFlags } = require("./flagGenerator");
const { evaluateFlags } = require("./flagEngine");
const { calculateRisk } = require("./riskEngine");
const { generateNextSteps } = require("./nextSteps");
const { buildResponse } = require("./responseFormatter");
const { regulatorySequence } = require("./regulatorySequence");
const { roSequence } = require("./roSequence");

function runAssessment(rawInput) {

  // =====================================
  // 1. Normalize Input
  // =====================================

  const input = normalizeInput(rawInput);

  console.log("\n========== NEW ASSESSMENT ==========");
 console.log("NORMALIZED INPUT:");
console.log({
  entityType: input.entityType,
  country: input.countryOfOrigin,
  ownership: input.ownershipPercent,
  investorType: input.investorType,
  foreignInvestor: input.foreignInvestor,
  foreignControlled: input.foreignControlled,
  foreignMinority: input.foreignMinority,
  controlStructure: input.controlStructure,
  sectors: input.sectors,
  intendsRevenue: input.intendsRevenue,
  employeeCount: input.employeeCount,
  locationType: input.locationType,
  establishingVietnamEntity: input.establishingVietnamEntity,
  hasPhysicalPresence: input.hasPhysicalPresence
});

  // =====================================
  // 2. Generate Flag Keys
  // =====================================

  const flagKeys = generateFlags(input);

  console.log("FLAGS:", flagKeys);

  // =====================================
  // 3. Evaluate Flags
  // =====================================

  const evaluatedFlags = evaluateFlags(flagKeys, input);

  console.log(`Evaluated ${evaluatedFlags.length} flags`);


  // =====================================
  // 3A. Regulatory Sequence
  // =====================================

  const sequence =
    input.entityType === "representative_office"
      ? roSequence(input, flagKeys)
      : regulatorySequence(input, flagKeys);

  console.log("REGULATORY SEQUENCE:");
console.log(JSON.stringify(sequence, null, 2));

console.log("SEQUENCE BEFORE RESPONSE:", sequence);

  // =====================================
  // 4. Risk Calculation
  // =====================================

  const rawRisk = calculateRisk(evaluatedFlags);

  console.log(
    `Risk: ${rawRisk.riskLevel} (${rawRisk.totalRiskScore})`
  );

  const risk = {
    riskLevel: rawRisk.riskLevel || "Low",
    totalRiskScore: rawRisk.totalRiskScore || 0,
    blockers: rawRisk.blockers || []
  };

  // =====================================
  // 5. Next Steps
  // =====================================

  const steps = generateNextSteps(evaluatedFlags, input);

  const totalSteps = Object.values(steps)
    .reduce((sum, group) => sum + group.length, 0);

  console.log(`Next Steps: ${totalSteps}`);

  // =====================================
  // 6. Build Response
  // =====================================

  return buildResponse({
  risk,
  steps,
  flags: evaluatedFlags,
  sequence
});

}

module.exports = {
  runAssessment
};