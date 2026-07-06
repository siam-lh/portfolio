import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundUI() {
  return (
     <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold">404</h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bold">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 text-lg leading-8">
          Sorry, the page you're looking for doesn't exist, may have been moved, or is temporarily
          unavailable.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-10 h-px w-32 bg-gray-200" />

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="primary-btn"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* Decorative Text */}
        <p className="mt-16 text-sm text-gray-200">
          Error Code: 404 • The requested resource could not be found.
        </p>
      </div>
    </main>
  )
}

