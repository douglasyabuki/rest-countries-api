import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NumericCodesProvider } from "@/contexts/NumericCodesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rest Countries API",
  description: "frontend mentor challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NumericCodesProvider>{children}</NumericCodesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
