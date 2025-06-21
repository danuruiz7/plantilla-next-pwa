import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Control de Nominas",
  description: "App para llevar un registro de tu nominas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="" lang="en">
      <body className="bg-gradient-to-br from-black/90 via-black to-black/90 min-h-screen">
        {children}
      </body>
    </html>
  );
}
