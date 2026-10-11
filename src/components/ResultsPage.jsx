import React, { useEffect } from "react";

const API_URL = "http://localhost:3000";

export default function ResultsPage({ data, input, onReset }) {

  useEffect(() => {
    console.log("=== FULL RESULT OBJECT ===", data);
  }, [data]);

  if (!data) {
    return (
      <div style={styles.center}>
        <h2>No assessment data found</h2>

        <button
          style={styles.primaryBtn}
          onClick={onReset}
        >
          Return to Assessment
        </button>
      </div>
    );
  }

  const {
  riskLevel = "Unknown",
  riskScore = 0,
  nextSteps = {},
  flags = [],
  blockers = [],
  sequence = { entityType: null, stages: [] }
} = data;

  // ======================================
  // FLAG SPLITTING
  // ======================================

const baselineFlags = flags.filter(
  f => f.priority === "baseline"
);

const regulatoryFlags = flags.filter(
  f => f.priority !== "baseline"
);

const prohibitedFlags = regulatoryFlags.filter(
  f => f.priority === "prohibited"
);

const criticalFlags = regulatoryFlags.filter(
  f => f.priority === "critical"
);

const highFlags = regulatoryFlags.filter(
  f => f.priority === "high"
);

  // ======================================
  // STEP DETECTION
  // ======================================

  const hasSteps =
    nextSteps &&
    Object.values(nextSteps).some(
      arr => Array.isArray(arr) && arr.length > 0
    );

  // ======================================
  // PDF DOWNLOAD
  // ======================================

  async function downloadReport() {
  try {
    console.log("=== PDF DOWNLOAD START ===");

    const res = await fetch(
      `${API_URL}/api/generateReport`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      }
    );

    console.log("PDF RESPONSE STATUS:", res.status);
    console.log("PDF RESPONSE OK:", res.ok);
    console.log(
      "PDF RESPONSE CONTENT-TYPE:",
      res.headers.get("content-type")
    );

    if (!res.ok) {
      throw new Error("PDF generation failed");
    }

    const blob = await res.blob();

    console.log("PDF BLOB SIZE:", blob.size);
    console.log("PDF BLOB TYPE:", blob.type);

    const url = window.URL.createObjectURL(blob);

    console.log("BLOB URL CREATED");

    const a = document.createElement("a");

    a.href = url;
    a.download = "seafer-regulatory-assessment.pdf";

    document.body.appendChild(a);

    console.log("CLICKING DOWNLOAD");

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

    console.log("=== PDF DOWNLOAD COMPLETE ===");

  } catch (err) {
    console.error("PDF DOWNLOAD ERROR:", err);

    alert(
      "Failed to generate report. Please try again."
    );
  }
}


  // ======================================
  // REGULATORY SEQUENCE
  // ======================================

  function renderSequence() {

    if (
      !sequence ||
      !Array.isArray(sequence.stages) ||
      sequence.stages.length === 0
    ) {
      return null;
    }

    const sequenceLabels = {
  CAPITAL_ADEQUECY: "Capital Adequacy",
  NAME_AVALABILITY_CHECK: "Company Name Availability Check",
  FOREIGN_DOCUMENT_LEGALISATION:
    "Foreign Document Legalisation",
  NOTARISED_VIETNAMESE_TRANSLATION:
    "Notarised Vietnamese Translation",

  IRC_REQUIRED:
    "Investment Registration Certificate",
  ERC_REQUIRED:
    "Enterprise Registration Certificate",

  ICA_ACCOUNT_OPENING:
    "Investment Capital Account Opening",
  IIA_ACCOUNT_OPENING:
    "Indirect Investment Account Opening",

  CAPITAL_CONTRIBUTION:
    "Capital Contribution",
  TAX_CODE_REGISTRATION:
    "Tax Code Registration",
  DIGITAL_SIGNATURE_PROCUREMENT:
    "Digital Signature Procurement",
  SIGNBOARD_INSTALLATION_VERIFICATION:
    "Signboard Installation Verification",
  INITIAL_LABOUR_DECLARATION:
    "Initial Labour Declaration",

  RO_PARENT_ESTABLISHMENT_PERIOD:
    "Parent Company Establishment Period",
  RO_CHIEF_REP_DUAL_ROLE_RESTRICTION:
    "Chief Representative Dual-Role Restriction",
  RO_OFFICE_LOCATION_COMPLIANCE:
    "Representative Office Location Compliance",
  RO_ESTABLISHMENT_LICENCE:
    "Representative Office Establishment Licence",
  RO_NAMEPLATE_DISPLAY_OBLIGATION:
    "Representative Office Nameplate Display",
  RO_TAX_PAYROLL_COMPLIANCE:
    "Representative Office Tax & Payroll Compliance",
  RO_COMMERCIAL_ACTIVITY_PROHIBITION:
    "Representative Office Commercial Activity Restriction",
  RO_ANNUAL_ACTIVITY_REPORT:
    "Annual Representative Office Activity Report"
};

const sequenceTypeLabels = {
  planning: "Planning",
  prerequisite: "Prerequisite",
  eligibility_gate: "Eligibility Gate",
  compliance_check: "Compliance Check",
  premises_prerequisite: "Premises Prerequisite",
  registration: "Registration",
  banking: "Banking",
  timed_obligation: "Timed Obligation",
  post_establishment: "Post-Establishment",
  parallel: "Parallel",
  operational: "Operational",
  ongoing: "Ongoing",
  structural_ongoing: "Structural Ongoing",
  recurring: "Recurring"
};

const stageTitles = {
  pre_establishment: "Pre-Establishment",
  establishment: "Establishment",
  post_establishment: "Post-Establishment",

  pre_licence: "Pre-Licence",
  post_licence: "Post-Licence",
  ongoing: "Ongoing Compliance"
};

    return (
      <div style={styles.card}>

        <h2 style={styles.sectionTitle}>
          Regulatory Path
        </h2>

        <p style={styles.sequenceIntro}>
          The regulatory path below shows the main sequence
          of requirements identified for the proposed structure.
          Dependencies indicate which requirements should be
          addressed before another step.
        </p>

        <div style={styles.sequenceContainer}>

          {sequence.stages.map((stage, stageIndex) => (

            <div
              key={stageIndex}
              style={styles.sequenceStage}
            >

              <div style={styles.sequenceStageHeader}>

                <span style={styles.sequenceStageNumber}>
                  {stageIndex + 1}
                </span>

                <h3 style={styles.sequenceStageTitle}>
                  {stageTitles[stage.stage] ||
                    stage.stage}
                </h3>

              </div>

              <div style={styles.sequenceSteps}>

                {stage.steps.map((step, stepIndex) => (

                  <div
                    key={stepIndex}
                    style={styles.sequenceStep}
                  >

                   <div style={styles.sequenceStepHeader}>

  <strong>
    {sequenceLabels[step.key] || step.key}
  </strong>

  <span style={styles.sequenceType}>
    {sequenceTypeLabels[step.type] || step.type}
  </span>

</div>

                    <p style={styles.sequenceDescription}>
                      {step.description}
                    </p>

                    {step.after &&
                      step.after.length > 0 && (

                        <div style={styles.sequenceDependency}>

                          <strong>Depends on:</strong>{" "}
{step.after
  .map(key => sequenceLabels[key] || key)
  .join(", ")}

                        </div>

                      )}

                    {step.timeline && (

                      <div style={styles.sequenceTimeline}>

                        <strong>
                          Timeline:
                        </strong>{" "}

                        {step.timeline.maximumDays
                          ? `${step.timeline.maximumDays} days`
                          : step.timeline.frequency ||
                            "Applicable statutory timeline"}
{step.timeline.startsFrom &&
  ` from ${
    sequenceLabels[step.timeline.startsFrom] ||
    step.timeline.startsFrom
  }`}
                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>
    );
  }

  // ======================================
  // STEP TABLES
  // ======================================

  function renderStepGroup(priority, steps) {

    if (!steps || steps.length === 0) {
      return null;
    }

    const titles = {
      prohibited: "Prohibited Actions",
      critical: "Critical Actions",
      high: "High Priority Actions",
      medium: "Medium Priority Actions",
      low: "Low Priority Actions",
      baseline: "Operational Setup Requirements"
    };

    return (

      <div style={styles.stepGroup}>

        <h3 style={priorityStyle(priority)}>
          {titles[priority]}
        </h3>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Requirement</th>
              <th style={styles.th}>Authority</th>
              <th style={styles.th}>Deadline</th>
            </tr>
          </thead>

          <tbody>

            {steps.map((step, i) => (

              <tr key={i}>

                <td style={styles.td}>
                  {step.requirement || "Unnamed requirement"}
                </td>

                <td style={styles.td}>
                  {step.authority || "Relevant Authority"}
                </td>

                <td style={styles.td}>
                  {step.deadline || "Prior to operation"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    );
  }

  return (

    <div style={styles.container}>

      {/* ======================================
          DISCLAIMER
      ====================================== */}

      <div style={styles.disclaimerCard}>

        <strong>Important:</strong>

        <p style={styles.disclaimerText}>
          This assessment is an automated
          regulatory screening tool designed
          for preliminary investment analysis.
          It does not constitute Vietnamese
          legal advice and should not be relied
          upon as a substitute for formal legal
          consultation.
        </p>

      </div>

      {/* ======================================
          RISK OVERVIEW
      ====================================== */}

      <div style={styles.card}>

        <h1 style={styles.title}>
          Assessment Outcome
        </h1>

        <div style={styles.outcomeRow}>

          <span style={riskStyle(riskLevel)}>

            {riskLevel} Regulatory Risk
            {" "}
            ({riskScore})

          </span>

        </div>

        <div style={styles.summaryBox}>

          {riskLevel === "Low" && (
            <p>
              No material regulatory risk identified.
              Standard setup requirements apply.
            </p>
          )}

          {riskLevel === "Medium" && (
            <p>
              Moderate regulatory exposure.
              Certain compliance obligations
              require attention before or during
              operation.
            </p>
          )}

          {riskLevel === "High" && (
            <p>
              Elevated regulatory complexity.
              Multiple approvals and compliance
              obligations must be actively managed.
            </p>
          )}

{riskLevel === "Prohibited" && (
  <p>
    <strong>
      This investment structure is currently not legally permissible.
    </strong>
    {" "}
    One or more prohibited activities must be resolved before the proposed
    business can proceed.
  </p>
)}

          {riskLevel === "Critical" && (
            <p>
              <strong>
                Critical blockers identified:
              </strong>
              {" "}
              {criticalFlags.length}
              {" "}
              issue(s) require resolution
              before operations may proceed.
            </p>
          )}

        </div>

      </div>

      {/* ======================================
          REGULATORY OVERVIEW
      ====================================== */}

      <div style={styles.card}>

        <h2 style={styles.sectionTitle}>
          Regulatory Overview
        </h2>

        <div style={styles.overviewGrid}>

  <div style={styles.metricBox}>
    <div style={styles.metricNumber}>
      {regulatoryFlags.length}
    </div>

    <div style={styles.metricLabel}>
      Regulatory Triggers
    </div>
  </div>

  <div style={styles.metricBox}>
    <div style={styles.metricNumber}>
      {criticalFlags.length}
    </div>

    <div style={styles.metricLabel}>
      Critical Issues
    </div>
  </div>

  <div style={styles.metricBox}>
    <div style={styles.metricNumber}>
      {prohibitedFlags.length}
    </div>

    <div style={styles.metricLabel}>
      Prohibited Activities
    </div>
  </div>

  <div style={styles.metricBox}>
    <div style={styles.metricNumber}>
      {highFlags.length}
    </div>

    <div style={styles.metricLabel}>
      High Priority Issues
    </div>
  </div>

  <div style={styles.metricBox}>
    <div style={styles.metricNumber}>
      {baselineFlags.length}
    </div>

    <div style={styles.metricLabel}>
      Baseline Requirements
    </div>
  </div>

</div>
</div>


      {/* ======================================
          REGULATORY TRIGGERS
      ====================================== */}

      <div style={styles.card}>

        <h2 style={styles.sectionTitle}>
          Key Regulatory Triggers
        </h2>

        {regulatoryFlags.length === 0 ? (

  <p>
    No material regulatory triggers identified.
  </p>

) : (

  <>

    {prohibitedFlags.length > 0 && (
      <>
        <h3 style={{ color: "#991b1b" }}>
          🚫 Prohibited Activities
        </h3>

        <ul style={styles.list}>
          {prohibitedFlags.map((flag, i) => (
            <li key={i} style={styles.listItem}>
              <strong>{flag.meaning}</strong>
              <p style={styles.flagExplanation}>
                {flag.explanation}
              </p>
            </li>
          ))}
        </ul>

        <hr style={{ margin: "24px 0" }} />
      </>
    )}

          <ul style={styles.list}>

  {[
    "critical",
    "high",
    "medium",
    "low"
  ].map(priority =>

    regulatoryFlags
      .filter(flag => flag.priority === priority)
      .map((flag, i) => (

        <li
          key={`${priority}-${i}`}
          style={styles.listItem}
        >

          <div>

            <strong>
              {flag.meaning}
            </strong>

            <p style={styles.flagExplanation}>
              {flag.explanation}
            </p>

          </div>

          <div style={priorityStyle(flag.priority)}>
            {(flag.priority || "low").toUpperCase()}
          </div>

        </li>

      ))

  )}

</ul>

</>

)}

      </div>

      {/* ======================================
          BLOCKERS
      ====================================== */}

      {blockers.length > 0 && (

        <div style={styles.blockerCard}>

          <h2 style={styles.sectionTitle}>
            Regulatory Blockers
          </h2>

          <ul style={styles.list}>

            {blockers.map((b, i) => (

              <li key={i}>

                <strong>
                  {b.meaning}
                </strong>

                {" — "}

                {b.impact}

              </li>
            ))}

          </ul>

        </div>
      )}

      {/* ======================================
          BASELINE REQUIREMENTS
      ====================================== */}

      {baselineFlags.length > 0 && (

        <div style={styles.card}>

          <h2 style={styles.sectionTitle}>
           Baseline Requirements
          </h2>

          <p style={styles.baselineIntro}>
  		These are standard requirements associated with this entity type.
  		They do not indicate that your proposed structure is prohibited.
          </p>

          <ul style={styles.list}>

            {baselineFlags.map((flag, i) => (

  <li key={i} style={styles.listItem}>

    <strong>
      {flag.meaning}
    </strong>

    {flag.explanation && (
      <p style={styles.flagExplanation}>
        {flag.explanation}
      </p>
    )}

  </li>
))}

          </ul>

        </div>
      )}

      {/* ======================================
          REGULATORY PATH
      ====================================== */}

      {renderSequence()}

      {/* ======================================
          ACTIONS
      ====================================== */}

      <div style={styles.card}>

        <h2 style={styles.sectionTitle}>
          Immediate Actions
        </h2>

        {!hasSteps ? (

          <p>
            No immediate pre-operational
            approvals identified.
          </p>

        ) : (

          <>
            {renderStepGroup(
  	      "prohibited",
  	      nextSteps.prohibited
            )}
            {renderStepGroup(
              "critical",
              nextSteps.critical
            )}

            {renderStepGroup(
              "high",
              nextSteps.high
            )}

            {renderStepGroup(
              "medium",
              nextSteps.medium
            )}

            {renderStepGroup(
              "low",
              nextSteps.low
            )}
          </>
        )}

      </div>

      {/* ======================================
          PDF REPORT OVERVIEW
      ====================================== */}

      <div style={styles.card}>

        <h2 style={styles.sectionTitle}>
          Included in the Full Regulatory Report
        </h2>

        <p style={styles.reportIntro}>
          The downloadable PDF provides a
          comprehensive regulatory breakdown
          tailored to the submitted investment
          structure and operational profile.
        </p>

        <ul style={styles.list}>

          <li>
            Detailed regulatory trigger analysis
          </li>

          <li>
            Vietnamese licensing and approval
            obligations
          </li>

          <li>
            Competent ministry and authority mapping
          </li>

          <li>
            Priority-ranked compliance actions
          </li>

          <li>
            Corporate establishment requirements
          </li>

          <li>
            Data protection and cross-border
            transfer exposure
          </li>

          <li>
            Labour and operational compliance
            obligations
          </li>

          <li>
            Environmental and construction
            permitting analysis
          </li>

          <li>
            Sector-specific restrictions and
            foreign investment conditions
          </li>

          <li>
            Regulatory risk interpretation
            summary
          </li>

        </ul>

      </div>

      {/* ======================================
          ACTION BUTTONS
      ====================================== */}

      <div style={styles.actions}>

        <button
          style={styles.primaryBtn}
          onClick={downloadReport}
        >
          Download Full Regulatory Report
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={onReset}
        >
          Run New Assessment
        </button>

      </div>

    </div>
  );
}

/* ======================================
   STYLES
====================================== */

const styles = {

  container: {
    maxWidth: "950px",
    margin: "40px auto",
    fontFamily: "system-ui"
  },

  center: {
    textAlign: "center",
    marginTop: "100px"
  },

  card: {
    background: "#ffffff",
    padding: 24,
    marginBottom: 20,
    borderRadius: 12,
    border: "1px solid #e2e8f0"
  },

  disclaimerCard: {
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20
  },

  disclaimerText: {
    marginTop: 8,
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.6
  },

  blockerCard: {
    background: "#fff2f2",
    padding: 24,
    marginBottom: 20,
    borderRadius: 12,
    border: "1px solid #fecaca"
  },

  title: {
    marginBottom: 10
  },

  sectionTitle: {
    marginBottom: 16
  },

  outcomeRow: {
    marginBottom: 14
  },

  summaryBox: {
    marginTop: 10,
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.7
  },

  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16
  },

  metricBox: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 18,
    textAlign: "center"
  },

  metricNumber: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6
  },

  metricLabel: {
    color: "#64748b",
    fontSize: 14
  },

  list: {
    paddingLeft: 20
  },

  listItem: {
    marginBottom: 16
  },

  flagExplanation: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.6
  },

  baselineIntro: {
    marginTop: -6,
    marginBottom: 18,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.6
  },

  stepGroup: {
    marginBottom: 24
  },

  sequenceIntro: {
    marginTop: -6,
    marginBottom: 24,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.6
  },

  sequenceContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  },

  sequenceStage: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 18,
    background: "#f8fafc"
  },

  sequenceStageHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16
  },

  sequenceStageNumber: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14
  },

  sequenceStageTitle: {
    margin: 0,
    fontSize: 18
  },

  sequenceSteps: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  sequenceStep: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 14
  },

  sequenceStepHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 6
  },

  sequenceType: {
    fontSize: 12,
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase"
  },

  sequenceDescription: {
    margin: 0,
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.6
  },

  sequenceDependency: {
    marginTop: 10,
    fontSize: 12,
    color: "#64748b"
  },

  sequenceTimeline: {
    marginTop: 8,
    fontSize: 12,
    color: "#475569"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10
  },

  th: {
    textAlign: "left",
    borderBottom: "1px solid #e2e8f0",
    padding: 10,
    fontSize: 14
  },

  td: {
    padding: 10,
    borderBottom: "1px solid #f1f5f9",
    fontSize: 14
  },

  actions: {
    marginTop: 30,
    display: "flex",
    gap: 12
  },

  reportIntro: {
    color: "#475569",
    marginBottom: 16,
    lineHeight: 1.7
  },

  primaryBtn: {
    padding: "12px 18px",
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer"
  },

  secondaryBtn: {
    padding: "12px 18px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer"
  }
};

/* ======================================
   HELPERS
====================================== */

function riskStyle(level) {

  const map = {
    Prohibited: "#7f1d1d",
    Low: "#16a34a",
    Medium: "#d97706",
    High: "#dc2626",
    Critical: "#991b1b"
  };

  return {
    border: `1px solid ${map[level] || "#64748b"}`,
    color: map[level] || "#64748b",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: 600
  };
}

function priorityStyle(priority) {

  const map = {
    prohibited: "#7f1d1d",
    critical: "#dc2626",
    high: "#d97706",
    medium: "#ca8a04",
    low: "#16a34a",
    baseline: "#64748b"
  };

  return {
    color: map[priority] || "#64748b",
    fontWeight: 700
  };
}