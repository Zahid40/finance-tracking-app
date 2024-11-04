import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container  max-w-3xl w-full h-[90vh] min-h-[90vh]  px-4">
      <Navbar />
      <div className="w-full h-full flex-1 flex justify-center items-center ">
        {children}
      </div>
    </main>
  );
}
