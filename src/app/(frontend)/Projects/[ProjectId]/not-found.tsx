import 'tailwindcss'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight">404</h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bol">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 text-lg leading-8 ">
          Sorry, the page you're looking for doesn't exist, may have been moved, or is temporarily
          unavailable.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-10 h-px w-32" />

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* Decorative Text */}
        <p className="mt-16 text-sm">
          Error Code: 404 • The requested resource could not be found.
        </p>
      </div>
    </main>
  )
}
