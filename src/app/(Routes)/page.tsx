"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SignInButton } from "@/features/auth/components/AuthButtons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import {
  DollarSign,
  PieChart,
  Target,
  TrendingUp,
  Smartphone,
  BarChart,
  Zap,
  Users,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import HeroSection from "@/components/page/home/Hero";
import AuthorsWord from "@/components/page/home/AuthorWords";
import Features from "@/components/page/home/Features";
import FaqHome from "@/components/page/home/Faq";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <HeroSection />
      <AuthorsWord />
      <Features />
      <FaqHome />
    </main>
  );
}
