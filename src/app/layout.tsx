import React from 'react'
import { Metadata } from 'next'
import { Jost } from 'next/font/google'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { HeaderBar } from './_components/Header'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'
import { Toaster } from 'react-hot-toast'

import './_css/app.scss'
import ActiveSectionContextProvider from './_utilities/active-section-context'
import ScrollToTop from './_components/ScrollToTop'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={jost.variable}>
        <Providers>
          <ActiveSectionContextProvider>
            {/* <AdminBar /> */}
            {/* @ts-ignore */}
            <HeaderBar />
            <main className="main">{children}</main>
            {/* @ts-ignore */}
            <Footer />

            <Toaster position="top-right" />
            <ScrollToTop />
          </ActiveSectionContextProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
}
