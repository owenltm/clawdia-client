import { Sidebar } from "@/components/ui/navigation/Sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Sidebar />
      <main className="lg:pl-72">{children}</main>
    </div>
  )
}
