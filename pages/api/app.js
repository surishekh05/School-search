import Link from "next/link";
import "../../src/app/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">School Management</h1>
        <div className="space-x-6">
          <Link href="/addSchool" className="hover:text-gray-200">Add School</Link>
          <Link href="/showSchools" className="hover:text-gray-200">Show Schools</Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} School Management
      </footer>
    </div>
  );
}
