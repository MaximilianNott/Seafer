function determineAccountType(input) {

  const foreignControl =
    input.ownershipPercent >= 50 ||
    input.controlStructure !== "None";

  if (!foreignControl) {
    return "Indirect Investment Capital Account (IICA)";
  }

  return "Direct Investment Capital Account (DICA)";
}

module.exports = { determineAccountType };