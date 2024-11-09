import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";

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
    <ClerkProvider dynamic>
      <ViewTransitions>
        <html lang="en" suppressHydrationWarning>
          <body className={`${urbanist.className} antialiased`}>
            <ThemeProvider>
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}
