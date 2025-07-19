export default function Home() {
  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Welcome to Tracker</h2>
      <p style={styles.text}>
        Track your spending, stay in control, and get insights into your
        financial habits.
      </p>
      <a href="/login" style={styles.button}>
        Login to Dashboard
      </a>
    </section>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "3rem",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "3rem auto",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    textDecoration: "none",
    borderRadius: "6px",
  },
};
