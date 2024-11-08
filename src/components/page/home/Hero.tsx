"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import { LuStar, LuHeart } from "react-icons/lu";
import { HeartIcon, StarIcon } from "lucide-react";
import { NumberTicker } from "@/components/number-ticker";
import { GithubApiRepoLink, GithubRepoLink, navLinks } from "../../../../const";

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  const [stats, setStats] = useState({
    stars: 0,
    lastUpdate: "",
  });

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (diffInSeconds < 3600)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

    const hours = Math.floor(diffInSeconds / 3600);
    if (diffInSeconds < 86400)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

    const days = Math.floor(diffInSeconds / 86400);
    if (diffInSeconds < 604800)
      return `${days} ${days === 1 ? "day" : "days"} ago`;

    const weeks = Math.floor(diffInSeconds / 604800);
    if (diffInSeconds < 2592000)
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

    const months = Math.floor(diffInSeconds / 2592000);
    if (diffInSeconds < 31536000)
      return `${months} ${months === 1 ? "month" : "months"} ago`;

    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const repoResponse = await fetch(GithubApiRepoLink);
        const repoData = await repoResponse.json();

        const lastUpdateDate = new Date(repoData.pushed_at);

        setStats({
          stars: repoData.stargazers_count,
          lastUpdate: getRelativeTime(lastUpdateDate),
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="flex items-center"
    >
      <div className="space-y-1">
        <p className="text-center text-xs text-muted-foreground">
          Last Update {stats.lastUpdate}
        </p>
        <div className={cn("z-10 flex -space-x-12 rtl:space-x-reverse")}>
          <Link href={GithubRepoLink} target="_blank" className="group">
            <Button className="h-10 w-[9.5rem] flex justify-start rounded-full border-2 border-white dark:border-gray-800 shadow">
              <HeartIcon className="size-4 mr-1" />
              Sponsor
            </Button>
          </Link>
          <Link
            href={GithubRepoLink}
            target="_blank"
            className="h-10 cursor-pointer flex w-auto items-center space-x-1 rounded-full bg-muted px-3 group border-2 border-white whitespace-pre shadow hover:shadow-lg"
          >
            <p className="font-medium text-primary  text-sm">
              Star Project on GitHub
            </p>
            <div className="flex items-center  rounded-full px-2 py-1 text-center font-medium text-sm ">
              <StarIcon className="size-4" />
              <NumberTicker className="ml-1" value={stats.stars} />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {["Take", "Control of", "Your Finances", "with Ease"].map(
          (text, index) => (
            <motion.span
              key={index}
              className="inline-block px-1 md:px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease,
              }}
            >
              {text}
            </motion.span>
          )
        )}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center leading-7 text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        Create forms with{" "}
        <Link
          href="https://ui.shadcn.com/"
          target="_blank"
          className="hover:underline"
        >
          Shadcn
        </Link>
        ,{" "}
        <Link
          href="https://react-hook-form.com/"
          target="_blank"
          className="hover:underline"
        >
          react-hook-form
        </Link>{" "}
        and{" "}
        <Link
          href="https://zod.dev/"
          target="_blank"
          className="hover:underline"
        >
          zod
        </Link>{" "}
        within minutes.
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <>
      <motion.div
        className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-6 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href={navLinks.root.category.link}
          className={cn(
            buttonVariants({ variant: "gooeyLeft" }),
            "w-full sm:w-auto text-background flex gap-2 rounded-full"
          )}
        >
          Go to Categories
        </Link>
      </motion.div>
    </>
  );
}

export default function HeroSection() {
  return (
    <section id="hero">
      <div className=" flex w-full flex-col items-center justify-start px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
      </div>
    </section>
  );
}
