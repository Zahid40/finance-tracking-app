import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";
import UserNavDropdown from "./UserNavDropDown";
import { NavLinks } from "../../const";

export default function Navbar() {
  return (
    <header>
      <nav className="container flex max-w-3xl items-center justify-between p-4">
        <div>
          <Link className="text-xl font-semibold" href={"/"}>
            <p>
              Track<span className="text-green-500">Z</span>
            </p>
          </Link>
        </div>
        <ul className="flex gap-2">
          {NavLinks.map((e) => {
            return (
              <li key={e.name}>
                <Link href={e.link}>{e.name}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2 justify-center items-center">
          <ThemeToggle />
          <UserNavDropdown />
        </div>
      </nav>
    </header>
  );
}
