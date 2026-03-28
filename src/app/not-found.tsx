import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <Link
            href="/en"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
