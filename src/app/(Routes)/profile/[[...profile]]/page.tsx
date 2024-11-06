"use client"
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserProfilePage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <UserProfile
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
      path="/profile"
    />
  );
};

export default UserProfilePage;
