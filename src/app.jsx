import AssessmentRunner from "./components/AssessmentRunner";

function App() {
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Seafer</h1>
        <p style={styles.tagline}>
          Vietnam Market Entry Regulatory Engine
        </p>
      </div>

      <AssessmentRunner />
    </div>
  );
}

export default App;

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    padding: "40px 20px"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    color: "white"
  },
  logo: {
    fontSize: "40px",
    fontWeight: 700,
    letterSpacing: "-1px",
    marginBottom: "5px"
  },
  tagline: {
    fontSize: "14px",
    opacity: 0.9
  }
};
