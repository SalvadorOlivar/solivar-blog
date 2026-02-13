import Link from "next/link";
import "./globals.css";
import { Zain } from "next/font/google";

const zain = Zain({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Solivar Blog",
  description: "Blog about web development and programming",
};

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
    <html className={zain.className} lang="en">
      <body>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
