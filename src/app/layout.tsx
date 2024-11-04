import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export const metadata: Metadata = {
  title: "FintraZ - Finance Tracking App",
  description: "Tracks you Money",
};

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      // baseTheme: resolvedTheme === "dark" ? dark : undefined,
    }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${urbanist.className} antialiased`}>
          <ThemeProvider>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
