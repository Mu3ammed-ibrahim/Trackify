// app/layout.js
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "Expense Tracker Dashboard",
  description: "Track your expenses easily with visual insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
