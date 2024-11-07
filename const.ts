import { Building, Home, Layers3 } from "lucide-react";

//App Info
export const AppName = "Fintraz";
export const AppLogo = "/icon/logo-round.svg";
export const AppTitle = `${AppName} - Smart Finance Tracker for Budgeting & Expenses`;
export const AppDescriptionShort =
  "Track and manage your finances effortlessly with Fintraz, your all-in-one finance tracker.";
export const AppDescriptionLong =
  "Fintraz is a modern finance tracking app that simplifies managing expenses, budgets, and transactions. With an intuitive interface, it allows users to monitor and categorize spending, set savings goals, and make informed financial decisions. We prioritize your privacy by keeping data locally and offer smart tools to help you achieve a clearer financial picture, hassle-free.";
export const AppKeyword = [
  "finance tracker",
  "personal finance",
  "expense management",
  "budgeting app",
  "track expenses",
  "savings goals",
  "financial goals",
  "Fintraz app",
  "privacy-focused finance",
  "money manager",
  "expense tracking",
  "budget planner",
  "financial insights",
  "spending habits",
  "financial organization",
  "income tracking",
  "expense categorization",
  "savings planner",
  "smart budget",
  "financial planning",
  "expense control",
  "track spending",
  "simple finance tracker",
  "personal budgeting",
  "money tracker",
  "daily expense tracker",
  "budget calculator",
  "financial security",
  "secure finance app",
  "money management app",
  "cash flow tracker",
  "track transactions",
  "budget goals",
  "expense logs",
  "intuitive finance app",
  "manage expenses",
  "financial wellness",
  "financial app",
  "track income",
  "finance insights",
  "digital budgeting tool",
  "financial clarity",
  "expense overview",
  "financial health",
  "efficient budgeting",
  "financial tracking",
  "modern finance app",
  "Fintraz finance manager",
  "local data finance app",
  "financial success",
];

export const AppAuthors = [{ name: "Zahid", url: "https://nextjs.org" }];
export const AppCreator = "Zahid";
export const AppPublisher = "Zahid";

//Social Information
export const AppEmail = "zahiddevz@gmail.com";
export const AppPhone = "+91 9625162488";
export const AppAddress = "Delhi , India";
export const AppWhatsapp = `https://wa.me/${AppPhone}`;
export const AppInstagramUsername = "zahid.devz";
export const AppInstagram = `https://www.instagram.com/${AppInstagramUsername}`;
export const AppGithubUsername = "Zahid40";
export const AppGithub = `https://github.com/${AppGithubUsername}`;
export const AppFacebookUsername = "Zahid-Ansari";
export const AppFacebook = `https://www.facebook.com/people/${AppFacebookUsername}`;
export const AppLinkdinUsername = "zahid-ansari-53354926a";
export const AppLinkdin = `https://www.linkedin.com/in/${AppLinkdinUsername}`;
export const AppTwitterUsername = "its_zahid83";
export const AppTwitter = `https://x.com/${AppTwitterUsername}`;
export const AppDribbbleUsername = "zahid83";
export const AppDribbble = `https://dribbble.com/${AppDribbbleUsername}`;
export const AppFigmaUsername = "@zahid8";
export const AppFigma = `https://www.figma.com/${AppFigmaUsername}`;
export const AppBehanceUsername = "zahidanasari";
export const AppBehance = `https://www.behance.net/${AppBehanceUsername}`;
export const AppBuyMeACoffeeUsername = "zahid40";
export const AppBuyMeACoffee = `https://buymeacoffee.com/${AppBuyMeACoffeeUsername}`;

//Nav Data
export const navLinks = {
  title: "Home",
  link: "/",
  icon: Home,
  root: {
    about: {
      title: "About",
      link: "/about",
      icon : Building
    },
    category: {
      title: "Category",
      link: "/category",
      icon : Layers3
    },
    terms: {
      title: "Terms and Condition",
      link: "/terms",
    },
    privacyPolicy: {
      title: "Privacy Policy",
      link: "/privacy-policy",
    },
  },
};
export const NavLinks = [navLinks, navLinks.root.category , navLinks.root.about];

export const FooterLinks = {
  Legal: [navLinks.root.terms, navLinks.root.privacyPolicy],
  "Quick Links": [navLinks, navLinks.root.about, navLinks.root.category],
};
