"use client";
import { Link } from "next-view-transitions";
import React from "react";
import ThemeToggle from "./theme-toggle";
import { AppLogo, AppName, NavLinks, navLinks } from "../../const";
import { Button } from "./ui/button";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";

import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  SignInButton,
  SignUpButton,
} from "@/features/auth/components/AuthButtons";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavigation from "./BottomNavigation";
import UserNavDropdown from "./UserNavDropDown";

export function Logo() {
  return (
    <Link
      href={navLinks.link}
      className="flex justify-start items-center gap-2"
    >
      <Image src={AppLogo} height={40} width={40} alt={`${AppName}-logo`} />
      <span className="text-xl font-bold">{AppName}</span>
    </Link>
  );
}

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  const pathname = usePathname();
  return (
    <header className="md:sticky top-0 z-50">
      <nav className="container grid grid-cols-2 md:grid-cols-3 max-w-3xl items-center justify-between px-4 py-3 bg-background shadow-sm rounded-b-2xl border">
        <Logo />
        {!isMobile && (
          <div className="flex justify-center items-center">
            {NavLinks.map((e) => {
              const isActiveRoute = pathname === e.link;

              return (
                <Button asChild variant="linkHover2" key={e.title}>
                  <Link
                    className={cn(
                      isActiveRoute
                        ? "dark:text-primary-400 text-primary-600"
                        : "",
                      "px-1"
                    )}
                    href={e.link}
                  >
                    {e.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        )}

        <div className="flex gap-2 justify-end items-center">
          <ThemeToggle />
          {!isMobile && (
            <SignedIn>
              <UserNavDropdown />
            </SignedIn>
          )}
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignUpButton variant={"secondary"} />
            <SignInButton variant={"shine"} />
          </SignedOut>
        </div>
      </nav>
      {isMobile && <BottomNavigation />}
    </header>
  );
}
