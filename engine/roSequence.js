const representativeOfficeFlags = require("../registries/representativeOfficeFlags");

function getApplicableROFlags(input) {
  return Object.entries(representativeOfficeFlags.REPRESENTATIVE_OFFICE_FLAGS)
    .filter(
      ([, flag]) =>
        typeof flag.applies === "function" &&
        flag.applies(input)
    )
    .map(([key]) => key);
}

function hasFlag(applicableFlags, key) {
  return applicableFlags.includes(key);
}

function roSequence(input, suppliedFlags = null) {
  const applicableFlags =
    suppliedFlags || getApplicableROFlags(input);

  const sequence = {
    entityType: input.entityType,
    stages: []
  };

  // =====================================================
  // REPRESENTATIVE OFFICE — ELIGIBILITY / PRE-LICENCE
  // =====================================================

  if (input.entityType === "representative_office") {
    const preLicence = [];

    // Parent company must satisfy the applicable
    // establishment / operation period requirement.
    if (
      hasFlag(
        applicableFlags,
        "RO_PARENT_ESTABLISHMENT_PERIOD"
      )
    ) {
      preLicence.push({
        key: "RO_PARENT_ESTABLISHMENT_PERIOD",
        type: "eligibility_gate",
        description:
          "Confirm that the foreign parent company satisfies the applicable minimum establishment or operation period before applying for the RO licence."
      });
    }

    // Proposed Chief Representative must satisfy
    // applicable dual-role restrictions.
    if (
      hasFlag(
        applicableFlags,
        "RO_CHIEF_REP_DUAL_ROLE_RESTRICTION"
      )
    ) {
      preLicence.push({
        key: "RO_CHIEF_REP_DUAL_ROLE_RESTRICTION",
        type: "compliance_check",
        description:
          "Verify that the proposed Chief Representative does not hold a conflicting position prohibited under the applicable RO rules."
      });
    }

    // Premises should be checked before relying on the
    // proposed office location for the RO establishment.
    if (
      hasFlag(
        applicableFlags,
        "RO_OFFICE_LOCATION_COMPLIANCE"
      )
    ) {
      preLicence.push({
        key: "RO_OFFICE_LOCATION_COMPLIANCE",
        type: "premises_prerequisite",
        description:
          "Verify that the proposed premises may lawfully be used as a Representative Office."
      });
    }

    if (preLicence.length > 0) {
      sequence.stages.push({
        stage: "pre_licence",
        steps: preLicence
      });
    }

    // =====================================================
    // REPRESENTATIVE OFFICE — ESTABLISHMENT
    // =====================================================

    const establishment = [];

    if (
      hasFlag(
        applicableFlags,
        "RO_ESTABLISHMENT_LICENCE"
      )
    ) {
      establishment.push({
        key: "RO_ESTABLISHMENT_LICENCE",
        type: "registration",
        after: [
          "RO_PARENT_ESTABLISHMENT_PERIOD",
          "RO_CHIEF_REP_DUAL_ROLE_RESTRICTION",
          "RO_OFFICE_LOCATION_COMPLIANCE"
        ].filter((key) =>
          hasFlag(applicableFlags, key)
        ),
        description:
          "Obtain the Representative Office establishment licence."
      });
    }

    if (establishment.length > 0) {
      sequence.stages.push({
        stage: "establishment",
        steps: establishment
      });
    }

    // =====================================================
    // REPRESENTATIVE OFFICE — POST-LICENCE SETUP
    // =====================================================

    const postLicence = [];

    if (
      hasFlag(
        applicableFlags,
        "RO_NAMEPLATE_DISPLAY_OBLIGATION"
      )
    ) {
      postLicence.push({
        key: "RO_NAMEPLATE_DISPLAY_OBLIGATION",
        type: "operational",
        after: ["RO_ESTABLISHMENT_LICENCE"],
        description:
          "Display the required Representative Office nameplate at the registered premises."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "RO_TAX_PAYROLL_COMPLIANCE"
      )
    ) {
      postLicence.push({
        key: "RO_TAX_PAYROLL_COMPLIANCE",
        type: "ongoing",
        after: ["RO_ESTABLISHMENT_LICENCE"],
        description:
          "Complete applicable tax, payroll and employee-related compliance obligations."
      });
    }

    if (postLicence.length > 0) {
      sequence.stages.push({
        stage: "post_licence",
        steps: postLicence
      });
    }

    // =====================================================
    // REPRESENTATIVE OFFICE — ONGOING
    // =====================================================

    const ongoing = [];

    if (
      hasFlag(
        applicableFlags,
        "RO_COMMERCIAL_ACTIVITY_PROHIBITION"
      )
    ) {
      ongoing.push({
        key: "RO_COMMERCIAL_ACTIVITY_PROHIBITION",
        type: "structural_ongoing",
        after: ["RO_ESTABLISHMENT_LICENCE"],
        description:
          "Maintain operations within the permitted Representative Office scope and avoid direct revenue-generating commercial activity."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "RO_ANNUAL_ACTIVITY_REPORT"
      )
    ) {
      ongoing.push({
        key: "RO_ANNUAL_ACTIVITY_REPORT",
        type: "recurring",
        after: ["RO_ESTABLISHMENT_LICENCE"],
        timeline: {
          frequency: "annual"
        },
        description:
          "Prepare and submit the required annual Representative Office activity report."
      });
    }

    if (ongoing.length > 0) {
      sequence.stages.push({
        stage: "ongoing",
        steps: ongoing
      });
    }

    return sequence;
  }

  return sequence;
}

module.exports = {
  roSequence
};