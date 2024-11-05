"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { LogIn, UserPlus, LogOut, LayoutDashboard } from "lucide-react"; // Importing icons
import { useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?:
  "link" | "default" | "ghost" | "destructive" | "outline" | "secondary" | "expandIcon" | "ringHover" | "shine" | "gooeyRight" | "gooeyLeft" | "linkHover1" | "linkHover2" | null | undefined;
  size?: "default"  | "sm" | "lg" | "icon";
  icon?: boolean; // Icon prop
  className?: string;
}

export function SignInButton({
  variant = "default",
  size = "default",
  icon = false,
  className,
}: ButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={"/sign-in"}>
        {icon && <LogIn className="mr-2 size-4" />}{" "}
        {/* Render the icon if 'icon' is true */}
        Sign In
      </Link>
    </Button>
  );
}

export function SignUpButton({
  variant = "default",
  size = "default",
  icon = false,
  className,
}: ButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={"/sign-up"}>
        {icon && <UserPlus className="mr-2 size-4" />}{" "}
        {/* Render the icon if 'icon' is true */}
        Sign Up
      </Link>
    </Button>
  );
}

export function SigningOutButton({
  variant = "default",
  size = "default",
  icon = false,
  className,
}: ButtonProps) {
  const { signOut } = useClerk();
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      onClick={() => signOut({ redirectUrl: "/" })}
      className={cn(className)}
    >
      <div>
        {icon && <LogOut className="mr-2 size-4" />}{" "}
        {/* Render the icon if 'icon' is true */}
        Sign Out
      </div>
    </Button>
  );
}

