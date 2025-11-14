import type { Metadata } from "next";
import { Elms_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/header";

const elmsSans = Elms_Sans({
  variable: "--font-elms-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Vontade do Fogo",
  description: "Que a vontade do fogo esteja com você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${elmsSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
