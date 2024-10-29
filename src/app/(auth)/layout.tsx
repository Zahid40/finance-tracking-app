
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-svh flex flex-col ">
      <Navbar/>
      <div className="w-full h-20"></div>
      <div className=" mainContainer h-full   w-full  p-clamp-xl ">
        <div className="flex flex-col-reverse md:flex-row  w-full  h-full  border-2 overflow-hidden rounded-3xl shadow-2xl">
          
          <div className="flex-1 flex justify-center items-center ">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
