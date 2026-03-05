import Link from "next/link";
import "./globals.css";
import { Zain } from "next/font/google";
import ThemeToggle from "../components/ThemeToggle";

const zain = Zain({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Solivar Blog",
  description: "Blog about web development and programming",
};

const themeInitScript = `
(() => {
  const key = "theme-preference";
  const stored = window.localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();
`;

export default function RootLayout({ children }) {

  let header = (
    <header className="blog-header">
      <Link href="/" className="header-link">
        <h1>Solivar Blog</h1>
      </Link>
    </header>
  )

  let footer = (
    <footer>
      <p>© 2026 Solivar Blog</p>
    </footer>
  )

  return (
    <html className={zain.className} lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeToggle />
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
