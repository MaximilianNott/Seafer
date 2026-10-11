const PDFDocument = require("pdfkit");

console.log("!!! NEW PDF GENERATOR LOADED - VERSION 2026-09-11 !!!");

function generatePDF(report) {
console.log("!!! NEW PDF GENERATOR EXECUTING !!!");
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: true
    });

    const buffers = [];

    doc.on("data", chunk => buffers.push(chunk));

    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    doc.on("error", reject);

    /*
    ========================================================
    LABELS
    ========================================================
    */

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

      ERC_ISSUANCE:
        "ERC Issuance",

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
      premises_prerequisite:
        "Premises Prerequisite",
      registration: "Registration",
      banking: "Banking",
      timed_obligation: "Timed Obligation",
      post_establishment:
        "Post-Establishment",
      parallel: "Parallel",
      operational: "Operational",
      ongoing: "Ongoing",
      structural_ongoing:
        "Structural Ongoing",
      recurring: "Recurring"
    };

    const stageTitles = {
      pre_establishment:
        "Pre-Establishment",

      establishment:
        "Establishment",

      post_establishment:
        "Post-Establishment",

      pre_licence:
        "Pre-Licence",

      post_licence:
        "Post-Licence",

      ongoing:
        "Ongoing Compliance"
    };

    const priorityOrder = [
      "prohibited",
      "critical",
      "high",
      "medium",
      "low",
      "baseline"
    ];

    const priorityLabels = {
      prohibited: "Prohibited",
      critical: "Critical",
      high: "High Priority",
      medium: "Medium Priority",
      low: "Low Priority",
      baseline: "Baseline"
    };

    /*
    ========================================================
    BASIC LAYOUT CONSTANTS
    ========================================================
    */

    const PAGE_LEFT = 50;
    const PAGE_RIGHT = 50;
    const PAGE_BOTTOM = 55;

    const CONTENT_WIDTH =
      doc.page.width -
      PAGE_LEFT -
      PAGE_RIGHT;

    function addPage(reason = "unspecified") {
  console.log(
    `PDF ADD PAGE: page ${doc.bufferedPageRange().count + 1} — ${reason}`
  );

  doc.addPage();

  doc.x = PAGE_LEFT;
  doc.y = 50;
}

    /*
    ========================================================
    TEXT HELPERS
    ========================================================
    */

    function title(text) {
      doc
        .font("Helvetica-Bold")
        .fontSize(22)
        .fillColor("#0f172a")
        .text(String(text || ""), {
          width: CONTENT_WIDTH,
          align: "center"
        });

      doc.moveDown(0.8);
    }

    function sectionTitle(text) {
  doc.x = PAGE_LEFT;

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#0f172a")
    .text(String(text || ""), {
      width: CONTENT_WIDTH
    });

  doc.moveDown(0.45);
}

    function subsectionTitle(text) {
doc.x = PAGE_LEFT;

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#1e293b")
        .text(String(text || ""), {
          width: CONTENT_WIDTH
        });

      doc.moveDown(0.25);
    }

    function paragraph(text) {
      if (
        text === undefined ||
        text === null ||
        text === ""
      ) {
        return;
      }

doc.x = PAGE_LEFT;

      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#334155")
        .text(String(text), {
          width: CONTENT_WIDTH,
          lineGap: 2.5,
          paragraphGap: 5
        });

      doc.moveDown(0.25);
    }

    function bullet(text) {
      if (
        text === undefined ||
        text === null ||
        text === ""
      ) {
        return;
      }

      const bulletWidth =
        CONTENT_WIDTH - 15;

doc.x = PAGE_LEFT;

      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#334155")
        .text(`• ${String(text)}`, {
          width: bulletWidth,
          indent: 10,
          lineGap: 2,
          paragraphGap: 3
        });

      doc.moveDown(0.1);
    }

    /*
    ========================================================
    LABEL / VALUE
    ========================================================

    IMPORTANT:

    Use a fixed label column rather than calculating the
    label width dynamically.

    This prevents long labels from leaving almost no room
    for the value text.
    ========================================================
    */

    function labelValue(label, value) {
      const valueText =
        value === undefined ||
        value === null ||
        value === ""
          ? "Not specified"
          : String(value);

      const labelColumnWidth = 125;

      const valueWidth =
        CONTENT_WIDTH -
        labelColumnWidth;

      /*
      Measure the value before writing so the entire
      label/value row is kept together where possible.
      */

      doc
        .font("Helvetica")
        .fontSize(9.5);

      const valueHeight =
        doc.heightOfString(
          valueText,
          {
            width: valueWidth,
            lineGap: 2
          }
        );

      const rowHeight =
        Math.max(
          valueHeight,
          12
        ) + 5;

      /*
      If there isn't enough room for the row,
      start it on the next page.

      This is the ONLY pagination decision made
      by this helper.
      */
console.log(
  `PDF LABEL VALUE: ${label} | y=${doc.y.toFixed(1)} | rowHeight=${rowHeight.toFixed(1)} | pageBottom=${(doc.page.height - PAGE_BOTTOM).toFixed(1)}`
);
      if (
  doc.y + rowHeight >
  doc.page.height - PAGE_BOTTOM
) {
  addPage(`labelValue overflow: ${label}`);
}

      const startY = doc.y;

      /*
      Label
      */

      doc
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .fillColor("#0f172a")
        .text(
          `${label}:`,
          PAGE_LEFT,
          startY,
          {
            width:
              labelColumnWidth,
            lineBreak: false
          }
        );

      /*
      Value
      */

      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#334155")
        .text(
          valueText,
          PAGE_LEFT +
            labelColumnWidth,
          startY,
          {
            width: valueWidth,
            lineGap: 2
          }
        );

      /*
      Move cursor to the actual bottom of the row.

      Both text blocks have already been confirmed to fit
      on the page, so this does not create a second
      pagination system.
      */

      doc.y =
        startY +
        rowHeight;

      doc.moveDown(0.1);
    }

    /*
    ========================================================
    TABLE
    ========================================================

    One table implementation only.

    Tables use controlled row pagination:

    1. Measure row.
    2. If row won't fit, create a page.
    3. Redraw header.
    4. Render entire row.

    PDFKit still handles normal text wrapping inside
    the cells.
    ========================================================
    */

    function drawTable(headers, rows) {
      if (
        !Array.isArray(headers) ||
        headers.length === 0 ||
        !Array.isArray(rows) ||
        rows.length === 0
      ) {
        return;
      }

doc.x = PAGE_LEFT;

      const startX = PAGE_LEFT;

      const tableWidth =
        CONTENT_WIDTH;

      /*
      Column proportions.
      */

      let weights;

      if (headers.length === 2) {
        weights = [0.38, 0.62];
      } else if (headers.length === 3) {
        weights = [0.50, 0.25, 0.25];
      } else {
        weights = headers.map(
          () => 1 / headers.length
        );
      }

      const columnWidths =
        weights.map(
          weight =>
            tableWidth * weight
        );

      /*
      --------------------------------------------------------
      Draw table header
      --------------------------------------------------------
      */

      function drawHeader() {
        const headerY = doc.y;

        doc
          .font("Helvetica-Bold")
          .fontSize(8.5)
          .fillColor("#0f172a");

        let headerHeight = 0;

        headers.forEach(
          (header, index) => {
            const height =
              doc.heightOfString(
                String(header),
                {
                  width:
                    columnWidths[index] -
                    8,
                  lineGap: 1
                }
              );

            headerHeight =
              Math.max(
                headerHeight,
                height
              );
          }
        );

        headerHeight += 8;

        let x = startX;

        headers.forEach(
          (header, index) => {
            doc
              .font("Helvetica-Bold")
              .fontSize(8.5)
              .fillColor("#0f172a")
              .text(
                String(header),
                x,
                headerY,
                {
                  width:
                    columnWidths[index] -
                    8,
                  lineGap: 1
                }
              );

            x +=
              columnWidths[index];
          }
        );

        const lineY =
          headerY +
          headerHeight;

        doc
          .moveTo(
            startX,
            lineY
          )
          .lineTo(
            startX +
              tableWidth,
            lineY
          )
          .strokeColor("#cbd5e1")
          .stroke();

        doc.y =
          lineY + 7;
      }

      /*
      Draw initial header.
      */

      drawHeader();

      /*
      --------------------------------------------------------
      Rows
      --------------------------------------------------------
      */

      rows.forEach(row => {
        let rowHeight = 15;

        row.forEach(
          (cell, index) => {
            const cellText =
              cell === undefined ||
              cell === null ||
              cell === ""
                ? "—"
                : String(cell);

            const height =
              doc.heightOfString(
                cellText,
                {
                  width:
                    columnWidths[index] -
                    8,
                  fontSize: 8.5,
                  lineGap: 1
                }
              );

            rowHeight =
              Math.max(
                rowHeight,
                height
              );
          }
        );

        rowHeight += 8;

        /*
        If the entire row does not fit,
        start a new page and redraw header.
        */
console.log(
  `PDF TABLE ROW: y=${doc.y.toFixed(1)} | rowHeight=${rowHeight.toFixed(1)} | available=${(doc.page.height - PAGE_BOTTOM - doc.y).toFixed(1)}`
);

        if (
  doc.y + rowHeight >
  doc.page.height - PAGE_BOTTOM
) {
  addPage("table row overflow");
  drawHeader();
}

        const rowY = doc.y;

        let x = startX;

        row.forEach(
          (cell, index) => {
            const cellText =
              cell === undefined ||
              cell === null ||
              cell === ""
                ? "—"
                : String(cell);

            doc
              .font("Helvetica")
              .fontSize(8.5)
              .fillColor("#334155")
              .text(
                cellText,
                x,
                rowY,
                {
                  width:
                    columnWidths[index] -
                    8,
                  lineGap: 1
                }
              );

            x +=
              columnWidths[index];
          }
        );

        /*
        The row was measured before rendering and
        confirmed to fit, so moving the cursor to the
        row bottom is safe.
        */

        doc.y =
          rowY +
          rowHeight;

        doc
          .moveTo(
            startX,
            doc.y
          )
          .lineTo(
            startX +
              tableWidth,
            doc.y
          )
          .strokeColor("#e2e8f0")
          .stroke();

        doc.y += 5;
      });

doc.x = PAGE_LEFT;
      doc.moveDown(0.25);
    }

    /*
    ========================================================
    REGULATORY PATH STEP
    ========================================================
    */

    function drawSequenceStep(
      step,
      stepIndex
    ) {
      const stepName =
        sequenceLabels[
          step.key
        ] ||
        step.key ||
        "Unnamed requirement";

      const stepType =
        sequenceTypeLabels[
          step.type
        ] ||
        step.type ||
        "Requirement";

      /*
      Dependencies
      */

      let dependencyText = null;

      if (
        Array.isArray(step.after) &&
        step.after.length > 0
      ) {
        dependencyText =
          step.after
            .map(
              key =>
                sequenceLabels[key] ||
                key
            )
            .join(", ");
      }

      /*
      Timeline
      */

      let timelineText = null;

      if (step.timeline) {
        if (
          step.timeline.maximumDays
        ) {
          timelineText =
            `${step.timeline.maximumDays} days`;
        } else if (
          step.timeline.frequency
        ) {
          timelineText =
            step.timeline.frequency;
        } else {
          timelineText =
            "Applicable statutory timeline";
        }

        if (
          step.timeline.startsFrom
        ) {
          timelineText +=
            ` from ${
              sequenceLabels[
                step.timeline.startsFrom
              ] ||
              step.timeline.startsFrom
            }`;
        }
      }

      /*
      Keep the heading and at least the Type field
      together where possible.

      We deliberately DO NOT estimate the entire step.
      The individual text helpers handle wrapping and
      pagination naturally.
      */
console.log(
  `PDF SEQUENCE STEP: ${stepName} | y=${doc.y.toFixed(1)} | available=${(doc.page.height - PAGE_BOTTOM - doc.y).toFixed(1)}`
);

      if (
  doc.y + 45 >
  doc.page.height - PAGE_BOTTOM
) {
  addPage(`sequence step overflow: ${stepName}`);
}

      /*
      Step heading
      */

doc.x = PAGE_LEFT;

      doc
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .fillColor("#0f172a")
        .text(
          `${stepIndex + 1}. ${stepName}`,
          {
            width: CONTENT_WIDTH
          }
        );

      doc.moveDown(0.15);

      /*
      Type
      */

      labelValue(
        "Type",
        stepType
      );

      /*
      Description
      */

      if (step.description) {
        paragraph(
          step.description
        );
      }

      /*
      Dependencies
      */

      if (dependencyText) {
        labelValue(
          "Depends on",
          dependencyText
        );
      }

      /*
      Timeline
      */

      if (timelineText) {
        labelValue(
          "Timeline",
          timelineText
        );
      }

      doc.moveDown(0.35);
    }

    /*
    ========================================================
    FOOTERS
    ========================================================
    */

    function addFooters() {
  const range = doc.bufferedPageRange();

  for (
    let i = range.start;
    i < range.start + range.count;
    i++
  ) {
    doc.switchToPage(i);

    const pageNumber =
      i -
      range.start +
      1;

console.log(
  "FOOTER DEBUG:",
  {
    page: pageNumber,
    pageHeight: doc.page.height,
    bottomMargin: doc.page.margins.bottom,
    footerY: doc.page.height - 75,
    availableBottom:
      doc.page.height - doc.page.margins.bottom
  }
);

    doc
      .moveTo(
        PAGE_LEFT,
        doc.page.height - 65
      )
      .lineTo(
        doc.page.width -
          PAGE_RIGHT,
        doc.page.height - 65
      )
      .strokeColor("#e2e8f0")
      .stroke();

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor("#94a3b8")
      .text(
        "SEAfer · Vietnam Regulatory Assessment",
        PAGE_LEFT,
        doc.page.height - 75,
        {
          width: 300,
          align: "left",
          lineBreak: false
        }
      );

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor("#94a3b8")
      .text(
        `Page ${pageNumber}`,
        doc.page.width - 100,
        doc.page.height - 75,
        {
          width: 50,
          align: "right",
          lineBreak: false
        }
      );
  }
}

    /*
    ========================================================
    PAGE 1 — COVER
    ========================================================
    */

    doc.moveDown(6);

    doc
      .font("Helvetica-Bold")
      .fontSize(29)
      .fillColor("#0f172a")
      .text(
        report?.reportMeta?.reportTitle ||
          "SEAfer Regulatory Assessment",
        {
          width: CONTENT_WIDTH,
          align: "center"
        }
      );

    doc.moveDown(1);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#475569")
      .text(
        "Indicative regulatory screening report",
        {
          width: CONTENT_WIDTH,
          align: "center"
        }
      );

    doc.moveDown(3);

    doc
      .font("Helvetica")
      .fontSize(9.5)
      .fillColor("#64748b")
      .text(
        `Assessment ID: ${
          report?.reportMeta?.assessmentId ||
          "Not specified"
        }`,
        {
          width: CONTENT_WIDTH,
          align: "center"
        }
      );

    doc.text(
      `Generated: ${
        report?.reportMeta?.generatedAt
          ? new Date(
              report.reportMeta.generatedAt
            ).toLocaleString()
          : new Date().toLocaleString()
      }`,
      {
        width: CONTENT_WIDTH,
        align: "center"
      }
    );

    doc.text(
      `Jurisdiction: ${
        report?.reportMeta?.jurisdiction ||
        "Vietnam"
      }`,
      {
        width: CONTENT_WIDTH,
        align: "center"
      }
    );

    doc.moveDown(4);

    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor("#94a3b8")
      .text(
        "SEAfer Regulatory Screening Engine",
        {
          width: CONTENT_WIDTH,
          align: "center"
        }
      );

    /*
    ========================================================
    PAGE 2 — DISCLAIMER + TOC
    ========================================================
    */
console.log(
  "PDF SECTION: Disclaimer, current page:",
  doc.bufferedPageRange().count
);
addPage("Disclaimer and Table of Contents");

sectionTitle("Disclaimer");

    paragraph(
      report?.disclaimer ||
        "This report provides an indicative regulatory screening assessment based on the information supplied and the rules implemented in the SEAfer screening engine. It is not legal advice and should not be treated as a substitute for advice from qualified Vietnamese legal, regulatory, tax or professional advisers."
    );

    paragraph(
      "The screening result is dependent on the accuracy and completeness of the information provided. Regulatory requirements, administrative practices and official interpretations may change over time."
    );

    paragraph(
      "Where the assessment identifies a regulatory requirement, restriction or potential blocker, the result should be independently verified before relying on it for an investment, incorporation or operational decision."
    );

    doc.moveDown(0.8);

    sectionTitle(
      "Table of Contents"
    );

    [
      "1. Executive Summary",
      "2. Assessment Input Summary",
      "3. Risk Assessment",
      "4. Key Regulatory Triggers",
      "5. Regulatory Blockers & Baseline Requirements",
      "6. Regulatory Path",
      "7. Required Actions"
    ].forEach(item => {
      bullet(item);
    });

    /*
    ========================================================
    PAGE 3 — EXECUTIVE SUMMARY
    ========================================================
    */
console.log(
  "PDF SECTION: Executive Summary, current page:",
  doc.bufferedPageRange().count
);
addPage("Executive Summary");
sectionTitle("1. Executive Summary");

    const risk =
      report?.risk || {};

    subsectionTitle(
      "Assessment Outcome"
    );

    drawTable(
      [
        "Assessment Factor",
        "Result"
      ],
      [
        [
          "Risk Level",
          risk.level || "Unknown"
        ],
        [
          "Risk Score",
          risk.score !== undefined
            ? risk.score
            : 0
        ],
        [
          "Regulatory Triggers",
          risk.triggerCount !== undefined
            ? risk.triggerCount
            : (
                report?.regulatoryTriggers ||
                []
              ).length
        ],
        [
          "Prohibited Issues",
          risk.prohibitedCount || 0
        ],
        [
          "Critical Issues",
          risk.criticalCount || 0
        ],
        [
          "Baseline Requirements",
          risk.baselineCount || 0
        ]
      ]
    );

    doc.moveDown(0.5);

    subsectionTitle(
      "Risk Interpretation"
    );

    paragraph(
      risk.interpretation ||
        "No risk interpretation was provided."
    );

    doc.moveDown(0.5);

    subsectionTitle(
      "Assessment Summary"
    );

    paragraph(
      "This report consolidates the regulatory screening result, identified regulatory triggers, baseline requirements, potential blockers and the principal sequence of requirements relevant to the assessed structure."
    );

    /*
    ========================================================
    PAGE 4 — INPUT + RISK
    ========================================================
    */
console.log(
  "PDF SECTION: I Risk, current page:",
  doc.bufferedPageRange().count
);
addPage("Assessment Input and Risk");
    sectionTitle(
      "2. Assessment Input Summary"
    );

    const input =
      report?.assessmentInput || {};

    drawTable(
      [
        "Assessment Factor",
        "Submitted Information"
      ],
      [
        [
          "Entity Type",
          input.entityType
        ],
        [
          "Country of Origin",
          input.countryOfOrigin
        ],
        [
          "Already in Vietnam",
          input.alreadyInVietnam
            ? "Yes"
            : "No"
        ],
        [
          "Business Activities",
          Array.isArray(
            input.businessActivities
          )
            ? input.businessActivities.join(
                ", "
              )
            : input.businessActivities
        ],
        [
          "Foreign Ownership",
          input.ownershipPercent !==
          undefined
            ? `${input.ownershipPercent}%`
            : "Not specified"
        ],
        [
          "Control Structure",
          input.controlStructure
        ],
        [
          "Employee Scale",
          input.employeeScale
        ],
        [
          "Construction Required",
          input.constructionRequired
            ? "Yes"
            : "No"
        ],
        [
          "Location Type",
          input.locationType
        ],
        [
          "Data Handling",
          input.dataHandling
        ],
        [
          "Cross-Border Data Transfer",
          input.crossBorderDataTransfer
            ? "Yes"
            : "No"
        ],
        [
          "Environmental Impact",
          input.environmentalImpactLevel
        ],
        [
          "Revenue Generating",
          input.revenueGenerating
            ? "Yes"
            : "No"
        ]
      ]
    );

    doc.moveDown(0.8);

addPage("Risk Assessment");

    sectionTitle(
      "3. Risk Assessment"
    );

    labelValue(
      "Risk Level",
      risk.level || "Unknown"
    );

    labelValue(
      "Risk Score",
      risk.score !== undefined
        ? risk.score
        : 0
    );

    doc.moveDown(0.5);

    subsectionTitle(
      "Priority Profile"
    );

    drawTable(
      [
        "Priority",
        "Number of Issues"
      ],
      [
        [
          "Prohibited",
          risk.prohibitedCount || 0
        ],
        [
          "Critical",
          risk.criticalCount || 0
        ],
        [
          "High",
          risk.highCount || 0
        ],
        [
          "Medium",
          risk.mediumCount || 0
        ],
        [
          "Low",
          risk.lowCount || 0
        ],
        [
          "Baseline",
          risk.baselineCount || 0
        ]
      ]
    );

    /*
    ========================================================
    PAGE 5 — REGULATORY TRIGGERS
    ========================================================
    */
console.log(
  "PDF SECTION: Reg Trigs, current page:",
  doc.bufferedPageRange().count
);
addPage("Regulatory Triggers");
    sectionTitle(
      "4. Key Regulatory Triggers"
    );

    const triggers =
      Array.isArray(
        report?.regulatoryTriggers
      )
        ? report.regulatoryTriggers
        : [];

    if (triggers.length === 0) {
      paragraph(
        "No regulatory triggers were identified."
      );
    } else {
      priorityOrder.forEach(
        priority => {
          const priorityTriggers =
            triggers.filter(
              trigger =>
                String(
                  trigger.priority || ""
                ).toLowerCase() ===
                priority
            );

          if (
            priorityTriggers.length === 0
          ) {
            return;
          }

          subsectionTitle(
            priorityLabels[priority]
          );

          priorityTriggers.forEach(
            trigger => {
              bullet(
                trigger.meaning ||
                  "Unnamed requirement"
              );

              if (trigger.explanation) {
                paragraph(
                  trigger.explanation
                );
              }

              if (trigger.authority) {
                labelValue(
                  "Authority",
                  trigger.authority
                );
              }

              if (trigger.legalBasis) {
                labelValue(
                  "Legal Basis",
                  trigger.legalBasis
                );
              }

              if (trigger.impact) {
                labelValue(
                  "Impact",
                  trigger.impact
                );
              }

              doc.moveDown(0.25);
            }
          );
        }
      );
    }

    /*
    ========================================================
    PAGE 6 — BLOCKERS + BASELINE
    ========================================================
    */
console.log(
  "PDF SECTION: blockers Baseline, current page:",
  doc.bufferedPageRange().count
);
addPage("Blockers and Baseline Requirements");
    sectionTitle(
      "5. Regulatory Blockers & Baseline Requirements"
    );

    subsectionTitle(
      "Regulatory Blockers"
    );

    const blockers =
      Array.isArray(
        report?.blockers
      )
        ? report.blockers
        : [];

    if (blockers.length === 0) {
      paragraph(
        "No regulatory blockers were identified."
      );
    } else {
      blockers.forEach(
        blocker => {
          bullet(
            `${
              blocker.meaning ||
              "Unnamed blocker"
            }${
              blocker.impact
                ? ` — ${blocker.impact}`
                : ""
            }`
          );
        }
      );
    }

    doc.moveDown(0.8);

    subsectionTitle(
      "Baseline Requirements"
    );

    paragraph(
      "These are standard requirements associated with the assessed entity structure. They do not necessarily indicate that the proposed investment structure is prohibited."
    );

    const baseline =
      Array.isArray(
        report?.operationalSetup
      )
        ? report.operationalSetup
        : [];

    if (baseline.length === 0) {
      paragraph(
        "No standard baseline requirements were identified."
      );
    } else {
      baseline.forEach(
        item => {
          bullet(
            item.meaning ||
              "Unnamed requirement"
          );

          if (item.explanation) {
            paragraph(
              item.explanation
            );
          }

          if (item.authority) {
            labelValue(
              "Authority",
              item.authority
            );
          }

          if (item.legalBasis) {
            labelValue(
              "Legal Basis",
              item.legalBasis
            );
          }

          doc.moveDown(0.2);
        }
      );
    }

    /*
    ========================================================
    PAGE 7 — REGULATORY PATH
    ========================================================
    */
console.log(
  "PDF SECTION: Executive reg path, current page:",
  doc.bufferedPageRange().count
);
addPage("Regulatory Path");
    sectionTitle(
      "6. Regulatory Path"
    );

    paragraph(
      "The regulatory path below presents the principal sequence of requirements identified for the assessed structure. Dependencies indicate requirements that should be addressed before another step."
    );

    const sequence =
      report?.sequence || {};

    const stages =
      Array.isArray(sequence.stages)
        ? sequence.stages
        : [];

    if (stages.length === 0) {
      paragraph(
        "No regulatory sequence was generated for this assessment."
      );
    } else {
      stages.forEach(
        (stage, stageIndex) => {
          subsectionTitle(
            `${stageIndex + 1}. ${
              stageTitles[
                stage.stage
              ] ||
              stage.stage ||
              "Regulatory Stage"
            }`
          );

          const stageSteps =
            Array.isArray(stage.steps)
              ? stage.steps
              : [];

          stageSteps.forEach(
            (step, stepIndex) => {
              drawSequenceStep(
                step,
                stepIndex
              );
            }
          );

          doc.moveDown(0.3);
        }
      );
    }

    /*
    ========================================================
    PAGE 8 — REQUIRED ACTIONS
    ========================================================
    */
console.log(
  "PDF SECTION: Req, current page:",
  doc.bufferedPageRange().count
);
addPage("Required Actions");
    sectionTitle(
      "7. Required Actions"
    );

    const steps =
      report?.nextSteps || {};

    let hasSteps = false;

    priorityOrder.forEach(
      priority => {
        const list =
          steps[priority];

        if (
          !Array.isArray(list) ||
          list.length === 0
        ) {
          return;
        }

        hasSteps = true;

        subsectionTitle(
          priorityLabels[priority]
        );

        const rows =
          list.map(step => [
            step.requirement ||
              "Unnamed requirement",

            step.authority ||
              "Relevant Authority",

            step.deadline ||
              "Prior to operation"
          ]);

        drawTable(
          [
            "Requirement",
            "Authority",
            "Deadline"
          ],
          rows
        );

        doc.moveDown(0.3);
      }
    );

    if (!hasSteps) {
      paragraph(
        "No pre-operational approvals or immediate actions were identified."
      );
    }

    /*
    ========================================================
    FOOTERS
    ========================================================
    */
console.log(
      "PDF PAGE COUNT BEFORE FOOTERS:",
      doc.bufferedPageRange().count
    );

    addFooters();

console.log(
      "PDF PAGE COUNT AFTER FOOTERS:",
      doc.bufferedPageRange().count
    );

    /*
    ========================================================
    FINISH
    ========================================================
    */
console.log(
      "PDF PAGE COUNT BEFORE DOC.END:",
      doc.bufferedPageRange().count
    );

    doc.end();
  });
}

module.exports = {
  generatePDF
};