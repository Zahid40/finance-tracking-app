import { Bolt, ShoppingCart } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";
import UserNavDropdown from "./UserNavDropDown";
import { NavLinks } from "../../const";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const pathname = usePathname();
  return (
    <div className="   fixed bottom-0   left-0 z-10 w-full px-4">
      <div
        className={cn(
          `container max-w-3xl grid grid-cols-4  place-items-center bg-background px-3 border  w-full rounded-t-sm`
        )}
      >
        {NavLinks.map((e) => {
            const isActiveRoute = pathname === e.link;
            return(
          <Link
            key={e.title}
            href={e.link}
            className={cn(
                isActiveRoute
                  ? "border-primary dark:text-primary-400 text-primary-600"
                  : "border-background text-neutral-500",
                "relative text-sm font-semibold  bg-transparent   flex justify-center items-center w-full h-14  border-t-2 "
              )}
          >
            <div className="flex justify-center items-center flex-col font-normal  h-full w-full">
              <e.icon className="h-5 w-5 text-inherit" />
              <p className="text-[10px] text-center ">{e.title}</p>
            </div>
          </Link>
        )})}

        <div className="flex justify-center items-center flex-col font-normal">
          <UserNavDropdown />
        </div>
      </div>
    </div>
  );
}
