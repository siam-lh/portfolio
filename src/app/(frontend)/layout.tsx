import React from 'react'
import './styles.css'
import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Footer/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  description:
    'Portfolio of Sanjatul Hasan Siam, a Software Engineer specializing in ASP.NET Core, C#, Blazor, React, Next.js, Payload CMS, SQL Server, and modern web application development.',
  title: 'Sanjatul Hasan Siam | Software Engineer',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <img src="/Animated-Bg.svg" className="w-full h-full object-cover" alt="" />
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
