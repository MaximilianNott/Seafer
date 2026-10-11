const prohibitedFlags = {

  // =======================
  // PROHIBITED FLAGS
  // =======================

  RESIDENTIAL_APARTMENT_PROHIBITED: {
    meaning: "Commercial activity prohibited at residential apartment premises",
    explanation:
      "Commercial business activities cannot legally operate from residential apartment units.",
    authority: "Local Housing Authority",
    legalBasis: "Housing Law 2014 and Housing Law 2023",
    impact: "Statutory operational prohibition",
    riskWeight: 100,
    category: "construction",
    prohibition: true,
    priority: "prohibited",
    applies: (input) => {
  return (
    input.establishingVietnamEntity &&
    input.usesResidentialAddress
  );
},
    nextSteps: [
      { requirement: "Relocate business address to compliant commercial premises" }
    ]
  }

};

module.exports = prohibitedFlags;
