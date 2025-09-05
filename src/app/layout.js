"use client"; 

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-white/20 font-semibold underline"
          : "hover:text-gray-200"
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-b from-purple-800 to-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">School Search</h1>
          <div className="space-x-2 flex">
            <NavLink href="/addSchool">Add School</NavLink>
            <NavLink href="/showSchools">Show Schools</NavLink>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-3 text-sm text-gray-600">
          © {new Date().getFullYear()} School Search
        </footer>
      </body>
    </html>
  );
}
