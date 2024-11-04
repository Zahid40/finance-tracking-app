"use client";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";
import UserNavDropdown from "./UserNavDropDown";
import { AppLogo, AppName, NavLinks, navLinks } from "../../const";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo() {
  return (
    <Link href={navLinks.link} className="flex justify-center items-center gap-2">
      <Image src={AppLogo} height={40} width={40} alt={`${AppName}-logo`} />
      <span className="text-xl font-bold">{AppName}</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 ">
      <nav className="container flex max-w-3xl items-center justify-between px-4 py-3 bg-background shadow-sm rounded-b-2xl border">
        <Logo/>
        <div >
          {NavLinks.map((e) => {
            const isActiveRoute = pathname === e.link;

            return (
              <Button asChild variant="linkHover2" key={e.name}>
                <Link
                  className={cn(
                    isActiveRoute
                      ? "dark:text-primary-400 text-primary-600"
                      : ""
                  , 'px-1')}
                  href={e.link}
                >
                  {e.name}
                </Link>
              </Button>
            );
          })}
        </div>

        <div className="flex gap-2 justify-center items-center">
          <ThemeToggle />
          <UserNavDropdown />
        </div>
      </nav>
    </header>
  );
}
