"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import SignOutButton from "./SignOutButton";
import LogoDashboard from "./LogoDashboard";

interface NavLink {
  name: string;
  href: string;
  icon: ReactNode;
}

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-7 w-7 md:h-5 md:w-5" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-7 w-7 md:h-5 md:w-5" />,
  },
  {
    name: "Guest Profile",
    href: "/account/profile",
    icon: <UserIcon className="h-7 w-7 md:h-5 md:w-5" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`
    fixed md:sticky bottom-0 md:top-0 z-20
    h-[60px] md:h-screen 
    border-t-2 md:border-r  py-2
    border-primary-800 md:border-primary-900
    bg-gradient-to-b from-primary-950 via-black to-primary-950
    shadow-xl 
    transition-all duration-300 ease-in-out
    flex flex-col
    ${isOpen ? "w-[70px] px-2" : "w-[260px] px-4"}
  `}
    >
      <div className="flex flex-col h-full justify-between">
        <ul className="overflow-hidden max-md:flex items-center justify-between">
          <li className="mb-10 max-md:hidden flex items-center justify-between px-3">
            <div
              className={`transition-all duration-300 ${
                isOpen && "opacity-0 w-0 overflow-hidden"
              }`}
            >
              <LogoDashboard />
            </div>

            <button
              onClick={() => setIsOpen((cur) => !cur)}
              className="p-2 hover:bg-primary-900/60 cursor-pointer rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 transition-transform duration-300 
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>
          </li>

          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`
                flex items-center gap-4 px-4 py-3 rounded-md group
                transition-all duration-200
                ${
                  active
                    ? "text-accent-400 bg-primary-900/60"
                    : "text-primary-200 hover:text-accent-300 hover:bg-primary-900/40"
                }
              `}
                >
                  <span className="text-xl">{link.icon}</span>

                  <span
                    className={`
                  max-md:hidden text-nowrap transition-all duration-300
                  ${isOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
                `}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}

          <li className="md:hidden list-none">
            <SignOutButton isOpen={isOpen} />
          </li>
        </ul>
        <li className="hidden md:block list-none mb-4 px-3">
          <SignOutButton isOpen={isOpen} />
        </li>
      </div>
    </nav>
  );
}
