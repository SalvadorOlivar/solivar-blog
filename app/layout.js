import Link from "next/link";
import "./globals.css";

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
    <html lang="en">
      <body className="{inter.className}">
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
