import { MainProvider } from '@/redux/providers'
import './globals.css'

export const metadata = {
  title: 'NextJS & Redux',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  )
}
