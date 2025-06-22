import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
export const metadata: Metadata = {
  title: "Control de Nominas",
  description: "App para llevar un registro de tu nominas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Aquí puedes decidir el idioma (por cookie, por defecto, etc.)
  const locale = await getLocale(); // Cambia a 'en' para probar inglés

  return (
    <html className="" lang={locale}>
      <body className="bg-gradient-to-br from-black/90 via-black to-black/90 min-h-screen">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
