import 'tailwindcss'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-gray-900">404</h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Sorry, the page you're looking for doesn't exist, may have been moved, or is temporarily
          unavailable.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-10 h-px w-32 bg-gray-200" />

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            <Home size={18} />
            Back to Home
          </Link>

          {/* <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button> */}
        </div>

        {/* Decorative Text */}
        <p className="mt-16 text-sm text-gray-400">
          Error Code: 404 • The requested resource could not be found.
        </p>
      </div>
    </main>
  )
}
