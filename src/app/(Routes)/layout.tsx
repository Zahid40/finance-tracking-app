import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container  max-w-3xl w-full  px-4 min-h-screen">
      <Navbar />
      <main className="h-full min-h-[90vh]">{children}</main>
      <Footer />
    </main>
  );
}
