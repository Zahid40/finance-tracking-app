import Navbar from "@/components/Navbar";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container  max-w-3xl w-full  px-4">
      <Navbar/>
      {children}
    </main>
  );
}
