function determineVerdict(flags) {

  if (flags.includes("RESIDENTIAL_APARTMENT_PROHIBITED")) {
    return "No";
  }

  const heavyFlags = [
    "MINISTERIAL_APPROVAL",
    "ENV_EIA"
  ];

  if (flags.some(flag => heavyFlags.includes(flag))) {
    return "Conditional";
  }

  return "Yes";
}

module.exports = { determineVerdict };