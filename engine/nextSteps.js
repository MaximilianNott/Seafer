function generateNextSteps(evaluatedFlags, input) {

  const steps = [];

  const foreignControl = input.foreignControlled;
  const foreignMinority = input.foreignMinority;

  // ==============================
  // 1. BASELINE STEPS
  // ==============================
 if (foreignControl) {

  steps.push({
    requirement:
      "Open Direct Investment Capital Account (DICA) and operational VND account",
    authority: "Licensed Commercial Bank",
    deadline:
"Open immediately after ERC/IRC issuance. Charter capital must generally be fully contributed within 90 days from ERC issuance unless otherwise permitted by law.",
    category: "banking",
    type: "baseline",
    priority: "baseline"
  });

} else if (foreignMinority) {

  steps.push({
    requirement:
      "Confirm whether an Indirect Investment Capital Account (IICA) is required",
    authority: "Licensed Commercial Bank",
    deadline:
      "Prior to completion of qualifying investment transactions.",
    category: "banking",
    type: "baseline",
    priority: "baseline"
  });

} else {

  steps.push({
    requirement:
      "Open operational VND business account",
    authority: "Licensed Commercial Bank",
    deadline:
      "Following ERC issuance and prior to commencing operations.",
    category: "banking",
    type: "baseline",
    priority: "baseline"
  });

}

  steps.push({
    requirement: "Register tax code, obtain digital signature, and activate tax portal",
    authority: "Local Tax Office",
    deadline: "Immediately post-incorporation (prior to tax filings)",
    category: "tax",
    type: "baseline",
    priority: "baseline"
  });

  steps.push({
    requirement: "Initial labor declaration and internal labor compliance setup",
    authority: "DOLISA",
    deadline: "Upon hiring",
    category: "labour",
    type: "baseline",
    priority: "baseline"
  });

  // ==============================
  // 2. FLAG-DRIVEN STEPS
  // ==============================
  evaluatedFlags.forEach(flag => {

    let resolvedSteps = [];

    if (flag.nextSteps) {
      resolvedSteps =
        typeof flag.nextSteps === "function"
          ? flag.nextSteps(input)
          : flag.nextSteps;
    } else {
      resolvedSteps = [{
        requirement: flag.meaning || flag.key,
        authority: flag.authority || "Relevant Authority",
        deadline: "Not specified"
      }];
    }

    if (!Array.isArray(resolvedSteps)) return;

    resolvedSteps.forEach(step => {
      steps.push({
        flag: flag.key,
        requirement: step.requirement || step,
        authority: step.authority || flag.authority,
        deadline: step.deadline || "Not specified",
        category: flag.category,
        type: "regulatory",
        priority: flag.priority || "low"
      });
    });

  });

  // ==============================
  // 3. GROUP + DEDUP
  // ==============================
  const groupedSteps = {
    prohibited: [],
    critical: [],
    high: [],
    medium: [],
    low: [],
    baseline: []
  };

  const seen = new Set();

  steps.forEach(step => {
    const key = step.requirement + step.authority;

    if (seen.has(key)) return;
    seen.add(key);

    const priority = (step.priority || "low").toLowerCase();

    if (!groupedSteps[priority]) {
      groupedSteps[priority] = [];
    }

    groupedSteps[priority].push(step);
  });

  return groupedSteps;
}

module.exports = {
  generateNextSteps
};