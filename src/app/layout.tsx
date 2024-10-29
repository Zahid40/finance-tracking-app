import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Finance Tracking App",
  description: "Tracks you Money",
};

const poppins = Poppins({
  subsets: ['latin'],
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
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider>
          <main>
            {children}
            
            </main>
            <Toaster />
            </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
