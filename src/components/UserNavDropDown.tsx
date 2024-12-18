"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogIn,
  UserPlus,
  HelpCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Link } from "next-view-transitions";
import {
  SignInButton,
  SignUpButton,
} from "@/features/auth/components/AuthButtons";
import Image from "next/image";
import { userNavLinks } from "../../const";

export default function UserNavDropdown() {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <SignedOut>
              <AvatarImage
                src="https://avatar.iran.liara.run/public"
                alt="User avatar"
              />
            </SignedOut>
            <SignedIn>
              <AvatarImage
                src={user?.imageUrl}
                alt="User avatar"
                style={{ objectFit: "cover" }}
              />
            </SignedIn>
            {/* <AvatarImage src="https://placehold.co/32x32/white/green?text=U" alt="User avatar" /> */}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <SignedIn>
          <>
            <DropdownMenuLabel className="font-normal flex flex-col gap-2 justify-center items-center">
              <Image
                src={user?.imageUrl!}
                alt="User avatar"
                style={{ objectFit: "cover" }}
                width={50}
                height={50}
                className="rounded-full h-14 w-14 border-2 border-primary-600"
              />
              <div className="flex flex-col items-center space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.fullName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userNavLinks.map((e) => (
                <DropdownMenuItem asChild key={e.title}>
                  <Link href={e.link}>
                    <e.icon className="mr-2 h-4 w-4" />
                    <span>{e.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <SignOutButton>
                <div className=" flex gap-1 text-red-500 font-normal hover:font-semibold">
                  <p className="text-red-500 font-normal hover:font-semibold">
                    Log out
                  </p>
                </div>
              </SignOutButton>
            </DropdownMenuItem>
          </>
        </SignedIn>
        <SignedOut>
          <>
            <DropdownMenuItem>
              <SignInButton
                variant="ghost"
                icon
                className="w-full justify-start"
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignUpButton
                variant="ghost"
                icon
                className="w-full justify-start"
              />
            </DropdownMenuItem>
          </>
        </SignedOut>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
