import { useState } from "react";

import ResultsPage from "./ResultsPage";

import { SECTOR_OPTIONS } from "../constants/sectorOptions";

import {
  CONTROL_OPTIONS,
  DATA_OPTIONS,
  ENVIRONMENT_OPTIONS,
  HEADCOUNT_OPTIONS,
  LOCATION_OPTIONS,
  BOOLEAN_OPTIONS,
  COUNTRY_OPTIONS
} from "../constants/formOptions";

const API_URL = "http://localhost:3000";

export default function AssessmentRunner() {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [result, setResult] = useState(null);

  // ======================================
  // RAW UI VALUES ONLY
  // Backend owns normalization
  // ======================================

  const [form, setForm] = useState({

    // ENTITY TYPE
    entityType: "company",

    // SECTORS
    sectors: [],

    // OWNERSHIP
    ownershipPercent: 100,

    isPubliclyTradedCompany: false,

    controlStructure: "Direct Control",

    countryOfOrigin: "Singapore",

    // REPRESENTATIVE OFFICE
    parentCompanyEstablishedPeriod: "1-3 years",

    // BUSINESS ACTIVITY
    operatesInVietnam: true,

    intendsRevenue: true,

    // DATA
    crossBorder: false,

    dataSensitivity: "No",

    // OPERATIONS
    constructionRequired: false,

    environmentalImpact: "Low",

    // LABOUR
    headcount: "1-9",

    // LOCATION
    locationType: "None"
  });

  // ======================================
  // GENERIC FIELD UPDATE
  // ======================================

  function updateField(field, value) {

    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  }

  // ======================================
  // MULTI-SELECT SECTOR TOGGLE
  // ======================================

  function toggleSector(sector) {

    setForm(prev => ({

      ...prev,

      sectors: prev.sectors.includes(sector)

        ? prev.sectors.filter(s => s !== sector)

        : [...prev.sectors, sector]
    }));
  }

  // ======================================
  // RUN ASSESSMENT
  // ======================================

  async function runAssessment() {

    setLoading(true);

    setError(null);

    try {

      console.log("=== RAW PAYLOAD SENT TO BACKEND ===");

      console.log(form);

      const res = await fetch(`${API_URL}/api/runAssessment`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)
      });

      if (!res.ok) {

        throw new Error("Request failed");
      }

      const data = await res.json();

      console.log("=== RESPONSE FROM BACKEND ===");

      console.log(data);

      setResult(data);

    } catch (err) {

      console.error("ASSESSMENT ERROR:", err);

      setError("Assessment failed. Please try again.");

    } finally {

      setLoading(false);
    }
  }

  // ======================================
  // RESULTS VIEW
  // ======================================

  if (result) {

    return (

      <ResultsPage
        data={result}
        input={form}
        onReset={() => setResult(null)}
      />
    );
  }

  // ======================================
  // MAIN UI
  // ======================================

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>

          <h1 style={styles.logo}>Seafer</h1>

          <p style={styles.subtitle}>
            Vietnam Market Entry Regulatory Assessment
          </p>

        </div>

        {/* ENTITY */}

{renderCard(

  "Entity Type",

  "Select the type of presence being established in Vietnam.",

  <select
    value={form.entityType}
    onChange={e =>
      updateField(
        "entityType",
        e.target.value
      )
    }
  >
    <option value="company">
      Company
    </option>

    <option value="representative_office">
      Representative Office
    </option>
  </select>

)}

{/* SECTORS */}

{renderCard(
  "Primary Business Activity",
  "Select all applicable operational activities.",

  SECTOR_OPTIONS.map(sector => (

    <label key={sector} style={styles.checkbox}>

      <input
        type="checkbox"

        checked={form.sectors.includes(sector)}

        onChange={() => toggleSector(sector)}
      />

      {sector}

    </label>

  ))
)}

        {/* OWNERSHIP */}

{form.entityType === "company" && (
  renderCard(

    "Ownership Percentage",

    "Foreign ownership impacts market access and investment classification.",

    <input
      type="number"

      value={form.ownershipPercent}

      onChange={e =>
        updateField(
          "ownershipPercent",
          Number(e.target.value)
        )
      }
    />

  )
)}

{form.entityType === "company" &&
  Number(form.ownershipPercent) < 50 && (
    renderCard(
      "Publicly Traded Company",
      "This helps determine whether the proposed investment may fall within the indirect investment account framework.",
      <select
        value={form.isPubliclyTradedCompany ? "Yes" : "No"}
        onChange={e =>
          updateField(
            "isPubliclyTradedCompany",
            e.target.value === "Yes"
          )
        }
      >
        {BOOLEAN_OPTIONS.map(option => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    )
  )}

        {/* COUNTRY */}

        {renderCard(

          "Country of Origin",

          "Primary investor jurisdiction.",

          <select
            value={form.countryOfOrigin}

            onChange={e =>
              updateField(
                "countryOfOrigin",
                e.target.value
              )
            }
          >
            {COUNTRY_OPTIONS.map(country => (

              <option key={country}>
                {country}
              </option>

            ))}
          </select>
        )}

{/* REPRESENTATIVE OFFICE — PARENT COMPANY PERIOD */}

{form.entityType === "representative_office" && (
  renderCard(

    "Parent Company Established / Registered Period",

    "The foreign parent company must satisfy the applicable establishment period requirement for a Representative Office.",

    <select
      value={form.parentCompanyEstablishedPeriod}
      onChange={e =>
        updateField(
          "parentCompanyEstablishedPeriod",
          e.target.value
        )
      }
    >
      <option value="less_than_1_year">
        Less than 1 year
      </option>

      <option value="1-3 years">
        1–3 years
      </option>

      <option value="3-5 years">
        3–5 years
      </option>

      <option value="5+ years">
        5+ years
      </option>
    </select>

  )
)}

        {/* CONTROL */}

{form.entityType === "company" && (
  renderCard(

    "Control Structure",

    "Determines operational control and FDI treatment.",

    <select
      value={form.controlStructure}

      onChange={e =>
        updateField(
          "controlStructure",
          e.target.value
        )
      }
    >
      {CONTROL_OPTIONS.map(option => (

        <option key={option}>
          {option}
        </option>

      ))}
    </select>

  )
)}

        {/* DATA */}

{form.entityType === "company" && (
  renderCard(

    "Data Sensitivity",

    "Determines data governance and cybersecurity exposure.",

    <select
      value={form.dataSensitivity}

      onChange={e =>
        updateField(
          "dataSensitivity",
          e.target.value
        )
      }
    >
      {DATA_OPTIONS.map(option => (

        <option key={option}>
          {option}
        </option>

      ))}
    </select>

  )
)}

        {/* CROSS BORDER */}

{form.entityType === "company" && (
  renderCard(

    "Cross-Border Data Transfer",

    "Indicates whether data is transferred outside Vietnam.",

    <select
      value={form.crossBorder ? "Yes" : "No"}

      onChange={e =>
        updateField(
          "crossBorder",
          e.target.value === "Yes"
        )
      }
    >
      {BOOLEAN_OPTIONS.map(option => (

        <option key={option}>
          {option}
        </option>

      ))}
    </select>

  )
)}

        {/* CONSTRUCTION */}

{form.entityType === "company" && (
  renderCard(

    "Construction Required",

    "Indicates whether build-out or construction activity is involved.",

    <select
      value={form.constructionRequired ? "Yes" : "No"}

      onChange={e =>
        updateField(
          "constructionRequired",
          e.target.value === "Yes"
        )
      }
    >
      {BOOLEAN_OPTIONS.map(option => (

        <option key={option}>
          {option}
        </option>

      ))}
    </select>

  )
)}

        {/* ENVIRONMENT */}

{form.entityType === "company" && (
  renderCard(

    "Environmental Impact",

    "Environmental impact determines permitting exposure.",

    <select
      value={form.environmentalImpact}

      onChange={e =>
        updateField(
          "environmentalImpact",
          e.target.value
        )
      }
    >
      {ENVIRONMENT_OPTIONS.map(option => (

        <option key={option}>
          {option}
        </option>

      ))}
    </select>

  )
)}

        {/* HEADCOUNT */}

        {renderCard(

          "Employee Headcount",

          "Labour obligations scale with workforce size.",

          <select
            value={form.headcount}

            onChange={e =>
              updateField(
                "headcount",
                e.target.value
              )
            }
          >
            {HEADCOUNT_OPTIONS.map(option => (

              <option key={option}>
                {option}
              </option>

            ))}
          </select>
        )}

        {/* LOCATION */}

        {renderCard(

          "Business Location",

          "Premises type impacts zoning and fire safety obligations.",

          <select
            value={form.locationType}

            onChange={e =>
              updateField(
                "locationType",
                e.target.value
              )
            }
          >
            {LOCATION_OPTIONS.map(option => (

              <option key={option}>
                {option}
              </option>

            ))}
          </select>
        )}

        {/* OPERATES IN VIETNAM */}

        {renderCard(

          "Operating in Vietnam",

          "Determines whether the business has operational activity within Vietnam.",

          <select
            value={form.operatesInVietnam ? "Yes" : "No"}

            onChange={e =>
              updateField(
                "operatesInVietnam",
                e.target.value === "Yes"
              )
            }
          >
            {BOOLEAN_OPTIONS.map(option => (

              <option key={option}>
                {option}
              </option>

            ))}
          </select>
        )}

        {/* REVENUE */}

        {renderCard(

          form.entityType === "representative_office"
  ? "Direct Revenue Generation"
  : "Revenue Generation",

form.entityType === "representative_office"
  ? "A Representative Office is generally limited to permitted representative functions and should not conduct direct revenue-generating commercial activities in Vietnam."
  : "Determines whether local entity establishment is expected.",

          <select
            value={form.intendsRevenue ? "Yes" : "No"}

            onChange={e =>
              updateField(
                "intendsRevenue",
                e.target.value === "Yes"
              )
            }
          >
            {BOOLEAN_OPTIONS.map(option => (

              <option key={option}>
                {option}
              </option>

            ))}
          </select>
        )}

        {/* CTA */}

        <button
          style={styles.button}

          onClick={runAssessment}

          disabled={loading}
        >
          {loading ? "Running..." : "Run Assessment"}
        </button>

        {error && (

          <p style={styles.error}>
            {error}
          </p>
        )}

      </div>
    </div>
  );
}

// ======================================
// HELPER COMPONENT
// ======================================

function renderCard(title, helper, content) {

  return (

    <div style={styles.card}>

      <h2>{title}</h2>

      <p style={styles.helper}>
        {helper}
      </p>

      {content}

    </div>
  );
}

// ======================================
// STYLES
// ======================================

const styles = {

  page: {
    background: "#f8fafc",
    minHeight: "100vh",
    padding: "40px 20px"
  },

  container: {
    maxWidth: 900,
    margin: "0 auto",
    fontFamily: "system-ui"
  },

  header: {
    marginBottom: 30
  },

  logo: {
    fontSize: 42,
    fontWeight: 800,
    color: "#14b8a6"
  },

  subtitle: {
    color: "#64748b"
  },

  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    marginBottom: 20
  },

  helper: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 12
  },

  checkbox: {
    display: "block",
    marginTop: 8
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: 10,
    border: "none",
    background: "#14b8a6",
    color: "white",
    fontSize: 16,
    fontWeight: 600
  },

  error: {
    marginTop: 12,
    color: "#dc2626"
  }
};