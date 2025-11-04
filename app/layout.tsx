import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Receptionist - Seat Booking & Scheduling',
  description: 'Smart receptionist for booking seats and scheduling meetings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
