// app/layout.js
import './globals.css'

export const metadata = {
  title: "Expense Tracker Dashboard",
  description: "Track your expenses easily with visual insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <header style={styles.header}>
          <h1 style={styles.logo}>💰 Tracker</h1>
        </header>

        <main style={styles.main}>{children}</main>

        <footer style={styles.footer}>
          <p>© 2025 Mohammed Almuatsim. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "1rem 2rem",
    textAlign: "center",
  },
  logo: {
    margin: 0,
  },
  main: {
    flex: 1,
    padding: "2rem",
  },
  footer: {
    backgroundColor: "#eee",
    textAlign: "center",
    padding: "1rem",
    fontSize: "0.9rem",
  },
};
