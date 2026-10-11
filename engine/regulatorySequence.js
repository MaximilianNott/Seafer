const baselineFlags = require("../registries/baselineFlags");

function getApplicableBaselineFlags(input) {
  return Object.entries(baselineFlags)
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

function regulatorySequence(input, suppliedFlags = null) {
  const applicableFlags =
    suppliedFlags || getApplicableBaselineFlags(input);

  const sequence = {
    entityType: input.entityType,
    stages: []
  };

  // =====================================================
  // COMPANY — PRE-ESTABLISHMENT
  // =====================================================

  if (input.establishingVietnamEntity === true) {
    const preEstablishment = [];

    if (hasFlag(applicableFlags, "CAPITAL_ADEQUECY")) {
      preEstablishment.push({
        key: "CAPITAL_ADEQUECY",
        type: "planning",
        description:
          "Confirm proposed charter capital is appropriate for the business."
      });
    }

    if (hasFlag(applicableFlags, "NAME_AVALABILITY_CHECK")) {
      preEstablishment.push({
        key: "NAME_AVALABILITY_CHECK",
        type: "prerequisite",
        description:
          "Clear the proposed company name before submitting the ERC application."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "FOREIGN_DOCUMENT_LEGALISATION"
      )
    ) {
      preEstablishment.push({
        key: "FOREIGN_DOCUMENT_LEGALISATION",
        type: "prerequisite",
        description:
          "Legalise or authenticate required foreign-issued documents before filing."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "NOTARISED_VIETNAMESE_TRANSLATION"
      )
    ) {
      preEstablishment.push({
        key: "NOTARISED_VIETNAMESE_TRANSLATION",
        type: "prerequisite",
        after: [
          "FOREIGN_DOCUMENT_LEGALISATION"
        ].filter((key) =>
          hasFlag(applicableFlags, key)
        ),
        description:
          "Prepare required Vietnamese translations of foreign-language documents."
      });
    }

    if (preEstablishment.length > 0) {
      sequence.stages.push({
        stage: "pre_establishment",
        steps: preEstablishment
      });
    }

    // =====================================================
    // COMPANY — ESTABLISHMENT
    // =====================================================

    const establishment = [];

    // Qualifying foreign investment:
    // IRC is completed before ERC in this V1 pathway.
    if (hasFlag(applicableFlags, "IRC_REQUIRED")) {
      establishment.push({
        key: "IRC_REQUIRED",
        type: "registration",
        after: [
          "NAME_AVALABILITY_CHECK",
          "FOREIGN_DOCUMENT_LEGALISATION",
          "NOTARISED_VIETNAMESE_TRANSLATION"
        ].filter((key) =>
          hasFlag(applicableFlags, key)
        ),
        description:
          "Obtain the Investment Registration Certificate where applicable."
      });
    }

    if (hasFlag(applicableFlags, "ERC_REQUIRED")) {
      establishment.push({
        key: "ERC_REQUIRED",
        type: "registration",
        after: [
          "NAME_AVALABILITY_CHECK",
          "IRC_REQUIRED"
        ].filter((key) =>
          hasFlag(applicableFlags, key)
        ),
        description:
          "Obtain the Enterprise Registration Certificate."
      });
    }

    if (establishment.length > 0) {
      sequence.stages.push({
        stage: "establishment",
        steps: establishment
      });
    }

    // =====================================================
    // COMPANY — POST-ESTABLISHMENT
    // =====================================================

    const postEstablishment = [];

    // ICA is a banking dependency following establishment.
    // It does NOT create the 90-day capital contribution deadline.
    if (hasFlag(applicableFlags, "ICA_ACCOUNT_OPENING")) {
      postEstablishment.push({
        key: "ICA_ACCOUNT_OPENING",
        type: "banking",
        after: ["ERC_REQUIRED"],
        description:
          "Open the required investment capital account for applicable foreign-investment capital transactions."
      });
    }

    // Capital contribution is a separate timed obligation.
    // The clock starts from ERC issuance, not ICA opening.
    postEstablishment.push({
      key: "CAPITAL_CONTRIBUTION",
      type: "timed_obligation",
      after: ["ERC_REQUIRED"],
      timeline: {
        maximumDays: 90,
        startsFrom: "ERC_ISSUANCE"
      },
      description:
        "Complete the required capital contribution within the applicable statutory contribution period."
    });

    if (hasFlag(applicableFlags, "TAX_CODE_REGISTRATION")) {
      postEstablishment.push({
        key: "TAX_CODE_REGISTRATION",
        type: "post_establishment",
        after: ["ERC_REQUIRED"],
        description:
          "Activate tax registration and electronic invoicing."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "DIGITAL_SIGNATURE_PROCUREMENT"
      )
    ) {
      postEstablishment.push({
        key: "DIGITAL_SIGNATURE_PROCUREMENT",
        type: "post_establishment",
        after: ["ERC_REQUIRED"],
        description:
          "Procure the corporate digital signature."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "SIGNBOARD_INSTALLATION_VERIFICATION"
      )
    ) {
      postEstablishment.push({
        key: "SIGNBOARD_INSTALLATION_VERIFICATION",
        type: "parallel",
        after: ["ERC_REQUIRED"],
        description:
          "Install and verify the required company signboard where applicable."
      });
    }

    if (
      hasFlag(
        applicableFlags,
        "INITIAL_LABOUR_DECLARATION"
      )
    ) {
      postEstablishment.push({
        key: "INITIAL_LABOUR_DECLARATION",
        type: "parallel",
        after: ["ERC_REQUIRED"],
        description:
          "Complete initial labour declaration and applicable social insurance registration."
      });
    }

    // Current V1 IIA flag.
    if (hasFlag(applicableFlags, "IIA_ACCOUNT_OPENING")) {
      postEstablishment.push({
        key: "IIA_ACCOUNT_OPENING",
        type: "banking",
        after: ["ERC_REQUIRED"],
        description:
          "Open and use the applicable VND-denominated indirect investment account."
      });
    }

    sequence.stages.push({
      stage: "post_establishment",
      steps: postEstablishment
    });
  }

  return sequence;
}

module.exports = {
  regulatorySequence
};