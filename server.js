const express = require("express");
const cors = require("cors");

const { runAssessment } = require("./engine/engine");
const { buildReport } = require("./services/reportBuilder");
const { generatePDF } = require("./services/pdfGenerator");

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ==============================
// RESPONSE NORMALIZER (CRITICAL FIX)
// ==============================

function buildResponse(result) {
  return {
    riskLevel: result.riskLevel,
    riskScore: result.riskScore,
    flags: result.flags || [],
    blockers: result.blockers || [],
    nextSteps: result.nextSteps || {},
    sequence: result.sequence || { entityType: null, stages: [] }
  };
}

// ==============================
// HEALTH CHECK
// ==============================

app.get("/", (req, res) => {
  res.status(200).send("Seafer Regulatory Assessment API is running.");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ==============================
// ASSESSMENT ENDPOINT (FIXED)
// ==============================

app.post("/api/runAssessment", (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const result = runAssessment(req.body);

    // 🔥 Normalize response for frontend
    const response = buildResponse(result);

    console.log("API RESPONSE:", response); // DEBUG

    return res.status(200).json(response);

  } catch (err) {
    console.error("Assessment error:", err);
    return res.status(500).json({ error: "Assessment failed" });
  }
});

// ==============================
// PDF REPORT ENDPOINT (FIXED)
// ==============================

app.post("/api/generateReport", async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const input = req.body;

    // 1. Run engine
    const result = runAssessment(input);

    // 🔥 Normalize BEFORE building report (CRITICAL)
    const response = buildResponse(result);

    // 2. Build report using normalized structure
    const report = buildReport(response, input);

console.log("========== REPORT BUILDER OUTPUT ==========");
console.dir(report, { depth: null });
console.log("========== END REPORT BUILDER OUTPUT ==========");

console.log("========== REPORT DIAGNOSTICS ==========");
console.log("Report keys:", Object.keys(report));
console.log("Report JSON size:", JSON.stringify(report).length);
console.log("Regulatory triggers:", report.regulatoryTriggers.length);
console.log("Operational setup:", report.operationalSetup.length);
console.log("Blockers:", report.blockers.length);
console.log("Next steps:", report.nextSteps);
console.log("Sequence stages:", report.sequence?.stages?.length || 0);
console.log("Sequence:", JSON.stringify(report.sequence, null, 2));
console.log("========== END REPORT DIAGNOSTICS ==========");

    console.log("GENERATING PDF WITH:", response); // DEBUG

console.log("STARTING PDF GENERATION");

    // 3. Generate PDF
    const pdfBuffer = await generatePDF(report);

console.log("PDF GENERATION COMPLETE");
console.log("PDF BUFFER SIZE:", pdfBuffer.length);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=seafer-regulatory-assessment.pdf"
    );

    return res.status(200).send(pdfBuffer);

  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ error: "PDF generation failed" });
  }
});

// ==============================
// GLOBAL ERROR HANDLER
// ==============================

app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: "Unexpected server error" });
});

// ==============================
// SERVER START
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Seafer API running on port ${PORT}`);
});