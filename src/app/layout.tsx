import type { Metadata } from "next";
import { Elms_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/header";

const elmsSans = Elms_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="pt-BR">
      <body
        className={`${elmsSans.variable}  antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
