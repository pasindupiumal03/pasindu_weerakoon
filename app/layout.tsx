import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pasindu | Portfolio",
  description: "Personal portfolio of a fullstack and blockchain developer",
  icons: {
    icon: [
      {
        url: '/pasindu.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/pasindu.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/pasindu.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
