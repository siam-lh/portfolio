import React from 'react'
import './styles.css'
import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  description:
    'Portfolio of Sanjatul Hasan Siam, a Software Engineer specializing in ASP.NET Core, C#, Blazor, React, Next.js, Payload CMS, SQL Server, and modern web application development.',
  title: 'Sanjatul Hasan Siam | Software Engineer',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
