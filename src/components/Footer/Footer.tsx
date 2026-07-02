export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()}{' '}
          <span className="font-medium text-white">Sanjatul Hasan Siam</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
