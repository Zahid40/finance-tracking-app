"use client"
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="">
      <SignIn
        afterSignOutUrl={"/"}
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
          elements: {
            formButtonPrimary:
              "bg-primary-600 hover:bg-primary-500 text-sm py-3 rounded-xl border-1 border-primary-500",
            rootBox: " ",
            cardBox: " border rounded-xl shadow-none flex justify-center",
            card: "border-0 rounded-none shadow-none p-clamp-sm",
            // footer:'hidden'
          },
          layout: {
            socialButtonsPlacement: "top",
            socialButtonsVariant: "blockButton",
            termsPageUrl: "/terms",
          },
        }}
      />
    </div>
  );
}
