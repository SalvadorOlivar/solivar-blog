import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

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
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div className="pageWrapper">
          <nav className="blogNav">
            <div className="navInner">
              <Link href="/" className="navBrand">
                <span className="navLogo">S</span>
                Solivar Blog
              </Link>
              <div className="navActions">
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <main className="contentArea">
            {children}
          </main>
          <footer className="blogFooter">
            <p>&copy; {new Date().getFullYear()} Solivar Blog</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
